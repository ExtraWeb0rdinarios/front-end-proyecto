'use client'
import { useState, useEffect } from 'react';
import { registrarUsuario } from './actions';
import styles from './Registro.module.css';

/* ── tipos ── */
type Rol = 'Estudiante' | 'Profesor' | 'Empresa' | '';
type Step = 'base' | 'perfil';

const SEMESTRES = ['1','2','3','4','5','6','7','8','Extensión de conocimientos'];

/* ── helpers de validación ── */
const soloLetras  = (v: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v.trim());
const rfcValido   = (v: string) => /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/i.test(v.trim());
const correoValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const edadValida  = (fecha: string) => {
  if (!fecha) return false;
  const hoy  = new Date();
  const nac  = new Date(fecha);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const mes = hoy.getMonth() - nac.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) {
    edad--;
  }
  return edad >= 16;
};

/* ── componentes pequeños reutilizables integrados arriba para Turbopack ── */
function Stepper({ step }: { step: 1 | 2 }) {
  return (
    <div className={styles.stepper}>
      <div className={`${styles.stepDot} ${styles.stepDotActive}`}>1</div>
      <div className={`${styles.stepLine} ${step === 2 ? styles.stepLineActive : ''}`}/>
      <div className={`${step === 2 ? `${styles.stepDot} ${styles.stepDotActive}` : styles.stepDot}`}>2</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}

/* ── COMPONENTE PRINCIPAL DEFINITIVO ── */
export default function RegisterPage() {
  const [step,     setStep]     = useState<Step>('base');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  /* paso 1 */
  const [correo,    setCorreo]    = useState('');
  const [password,  setPassword]  = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [rol,       setRol]       = useState<Rol>('');
  
  const [passFeedback, setPassFeedback] = useState({ text: '', color: '' });
  const [matchFeedback, setMatchFeedback] = useState({ text: '', color: '' });

  /* paso 2 — estudiante */
  const [nombre,      setNombre]      = useState('');
  const [apellidoPat, setApellidoPat] = useState('');
  const [apellidoMat, setApellidoMat] = useState('');
  const [fechaNac,    setFechaNac]    = useState('');
  const [semestre,    setSemestre]    = useState('');
  const [creditos,    setCreditos]    = useState('');
  const [numCuenta,   setNumCuenta]   = useState('');

  /* paso 2 — profesor */
  const [profNombre, setProfNombre] = useState('');
  const [materia,    setMateria]    = useState('');

  /* paso 2 — empresa */
  const [empNombre,  setEmpNombre]  = useState('');
  const [rfc,          setRfc]          = useState('');
  const [ubicacion,    setUbicacion]    = useState('');

  /* Evaluar nivel de seguridad de contraseña */
  useEffect(() => {
    if (!password) {
      setPassFeedback({ text: '', color: '' });
      return;
    }
    if (password.length < 6) {
      setPassFeedback({ text: 'Insegura (mínimo 6 caracteres)', color: '#dc2626' });
    } else if (password.length < 10) {
      setPassFeedback({ text: 'Aceptable y segura', color: '#d97706' });
    } else {
      setPassFeedback({ text: 'Muy segura 💪', color: '#16a34a' });
    }
  }, [password]);

  /* Evaluar si coinciden las contraseñas */
  useEffect(() => {
    if (!confirmar) {
      setMatchFeedback({ text: '', color: '' });
      return;
    }
    if (password === confirmar) {
      setMatchFeedback({ text: 'Las contraseñas coinciden ✓', color: '#16a34a' });
    } else {
      setMatchFeedback({ text: 'Las contraseñas no coinciden', color: '#dc2626' });
    }
  }, [password, confirmar]);

  /* ── validar y avanzar paso 1 ── */
  function handleNext() {
    setError('');
    if (!correoValido(correo))   return setError('Ingresa un correo electrónico válido.');
    if (password.length < 6)     return setError('La contraseña debe tener al menos 6 caracteres.');
    if (password !== confirmar)  return setError('Las contraseñas no coinciden.');
    if (!rol)                    return setError('Selecciona un rol para continuar.');
    setStep('perfil');
  }

  /* ── submit final ── */
  async function handleSubmit() {
    if (loading) return; 
    setError('');

    /* validar según rol */
    if (rol === 'Estudiante') {
      if (!soloLetras(nombre))      return setError('El nombre solo puede contener letras.');
      if (!soloLetras(apellidoPat)) return setError('El apellido paterno solo puede contener letras.');
      if (apellidoMat && !soloLetras(apellidoMat)) return setError('El apellido materno solo puede contener letras.');
      if (!edadValida(fechaNac))    return setError('Debes ser mayor de 16 años para registrarte.');
      if (!semestre)                return setError('Selecciona tu semestre actual.');
      
      const cred = Number(creditos);
      if (isNaN(cred) || cred < 0 || cred > 500) return setError('Los créditos deben estar entre 0 y 500.');
      
      const cuentaLimpia = numCuenta.trim();
      if (!/^\d{9}$/.test(cuentaLimpia)) {
        return setError('El número de cuenta debe tener exactamente 9 dígitos.');
      }
    }

    if (rol === 'Profesor') {
      if (!profNombre.trim()) return setError('Ingresa tu nombre completo.');
      if (!materia.trim())    return setError('Ingresa la materia que impartes.');
    }

    if (rol === 'Empresa') {
      if (!empNombre.trim())          return setError('Ingresa el nombre de la empresa.');
      if (!rfcValido(rfc))            return setError('El RFC no tiene un formato válido (ej. TSO120101AB1).');
      if (!ubicacion.trim())          return setError('Ingresa la ubicación de la empresa.');
    }

    setLoading(true);

    const paqueteDatos = {
      correo,
      password,
      rol,
      datosPerfil: {
        nombre,
        apellidoPat,
        apellidoMat,
        fechaNac,
        semestre,
        creditos,
        numCuenta,
        profNombre,
        materia,
        empNombre,
        rfc,
        ubicacion
      }
    };

    try {
      const resultado = await registrarUsuario(paqueteDatos);
      if (resultado && !resultado.success) {
        if (resultado.message?.includes('duplicate key value') || resultado.message?.includes('already registered')) {
          setError('Este correo electrónico o número de cuenta ya se encuentra registrado. Intenta iniciar sesión.');
        } else {
          setError(resultado.message || 'Ocurrió un error inesperado al procesar el registro.');
        }
        setLoading(false);
      }
    } catch (e) {
      console.log("Redireccionando...");
    }
  }

  /* ══════════════════════════════
      PASO 1 — DATOS BASE
     ══════════════════════════════ */
  if (step === 'base') {
    return (
      <main className={styles.page}>
        <Stepper step={1} />
        <div className={styles.card}>
          <h2 className={styles.stepTitle}>Crear cuenta</h2>
          <p className={styles.stepSub}>Paso 1 de 2 — Datos de acceso</p>

          <Field label="Correo electrónico">
            <input className={styles.input} type="email" placeholder="tucorreo@ejemplo.com"
              value={correo} onChange={e => setCorreo(e.target.value)} autoComplete="email"/>
          </Field>

          <Field label="Contraseña">
            <input className={styles.input} type="password" placeholder="Mínimo 6 caracteres"
              value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password"/>
            {passFeedback.text && (
              <span className={styles.feedbackText} style={{ color: passFeedback.color }}>
                {passFeedback.text}
              </span>
            )}
          </Field>

          <Field label="Confirmar contraseña">
            <input className={styles.input} type="password" placeholder="Repite tu contraseña"
              value={confirmar} onChange={e => setConfirmar(e.target.value)} autoComplete="new-password"/>
            {matchFeedback.text && (
              <span className={styles.feedbackText} style={{ color: matchFeedback.color }}>
                {matchFeedback.text}
              </span>
            )}
          </Field>

          <Field label="¿Quién eres?">
            <div className={styles.rolRow}>
              {(['Estudiante','Profesor','Empresa'] as Rol[]).map(r => (
                <button key={r} type="button"
                  className={`${styles.rolBtn} ${rol === r ? styles.rolBtnActive : ''}`}
                  onClick={() => setRol(r)}>{r}
                </button>
              ))}
            </div>
          </Field>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.btnPrimaryFull} onClick={handleNext}>
            Continuar →
          </button>

          <p className={styles.loginLink}>
            ¿Ya tienes cuenta? <a href="/Login">Inicia sesión</a>
          </p>
        </div>
      </main>
    );
  }

  /* ══════════════════════════════
      PASO 2 — PERFIL SEGÚN ROL
     ══════════════════════════════ */
  return (
    <main className={styles.page}>
      <Stepper step={2} />
      <div className={styles.card}>

        {rol === 'Estudiante' && <>
          <h2 className={styles.stepTitle}>Datos del estudiante</h2>
          <p className={styles.stepSub}>Paso 2 de 2 — Perfil académico</p>

          <Field label="Nombre(s)">
            <input className={styles.input} type="text" placeholder="Ej. María"
              value={nombre} onChange={e => setNombre(e.target.value)} maxLength={100}/>
          </Field>

          <div className={styles.fieldRow}>
            <Field label="Apellido paterno">
              <input className={styles.input} type="text" placeholder="Ej. García"
                value={apellidoPat} onChange={e => setApellidoPat(e.target.value)} maxLength={100}/>
            </Field>
            <Field label="Apellido materno">
              <input className={styles.input} type="text" placeholder="Ej. López"
                value={apellidoMat} onChange={e => setApellidoMat(e.target.value)} maxLength={100}/>
            </Field>
          </div>

          <div className={styles.fieldRow}>
            <Field label="Fecha de nacimiento">
              <input className={styles.input} type="date"
                value={fechaNac} onChange={e => setFechaNac(e.target.value)}/>
            </Field>
            <Field label="Semestre">
              <select className={styles.input} value={semestre} onChange={e => setSemestre(e.target.value)}>
                <option value="">Selecciona</option>
                {SEMESTRES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Número de cuenta (9 dígitos)">
            <input className={styles.input} type="text" placeholder="Ej. 317123456"
              value={numCuenta} onChange={e => setNumCuenta(e.target.value)} maxLength={9}/>
          </Field>

          <Field label="Créditos (0–500)">
            <input className={styles.input} type="number" min={0} max={500} placeholder="Ej. 240"
              value={creditos} onChange={e => setCreditos(e.target.value)}/>
          </Field>
        </>}

        {rol === 'Profesor' && <>
          <h2 className={styles.stepTitle}>Datos del profesor</h2>
          <p className={styles.stepSub}>Paso 2 de 2 — Perfil académico</p>

          <Field label="Nombre completo">
            <input className={styles.input} type="text" placeholder="Ej. Roberto Sánchez Pérez"
              value={profNombre} onChange={e => setProfNombre(e.target.value)} maxLength={100}/>
          </Field>

          <Field label="Correo institucional">
            <input className={`${styles.input} ${styles.inputDisabled}`} type="email" value={correo} disabled/>
          </Field>

          <Field label="Materia que imparte">
            <input className={styles.input} type="text" placeholder="Ej. Cálculo Diferencial"
              value={materia} onChange={e => setMateria(e.target.value)} maxLength={100}/>
          </Field>
        </>}

        {rol === 'Empresa' && <>
          <h2 className={styles.stepTitle}>Datos de la empresa</h2>
          <p className={styles.stepSub}>Paso 2 de 2 — Información organizacional</p>

          <Field label="Nombre de la empresa">
            <input className={styles.input} type="text" placeholder="Ej. TechSolutions SA de CV"
              value={empNombre} onChange={e => setEmpNombre(e.target.value)} maxLength={150}/>
          </Field>

          <Field label="Correo de registro">
            <input className={`${styles.input} ${styles.inputDisabled}`} type="email" value={correo} disabled/>
          </Field>

          <div className={styles.fieldRow}>
            <Field label="RFC">
              <input className={styles.input} type="text" placeholder="Ej. TSO120101AB1"
                value={rfc} onChange={e => setRfc(e.target.value)} maxLength={13}/>
            </Field>
            <Field label="Ubicación">
              <input className={styles.input} type="text" placeholder="Ej. CDMX, Naucalpan…"
                value={ubicacion} onChange={e => setUbicacion(e.target.value)} maxLength={200}/>
            </Field>
          </div>
        </>}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.btnRow}>
          <button className={styles.btnSecondary} onClick={() => { setStep('base'); setError(''); }} disabled={loading}>
            ← Atrás
          </button>
          <button className={styles.btnPrimary} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creando cuenta…' : 'Registrarme ahora'}
          </button>
        </div>
      </div>
    </main>
  );
}