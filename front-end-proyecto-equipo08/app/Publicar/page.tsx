'use client';
import { useRef, useState } from 'react';
import styles from './Publicar.module.css';
import { createClient } from '@/lib/supabase/client';

interface FormData {
  titulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  requisitos: string;
  duracion: string;
  modalidad: string;
  tipoServicio: string;
  ubicacion: string;
  correo: string;
  nombreEncargado: string;
  salario: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const MODALIDADES = [
  { id: 1, nombre: 'Presencial' },
  { id: 2, nombre: 'Remoto' },
  { id: 3, nombre: 'Híbrido' },
  { id: 4, nombre: 'Flexible' },
];

const TIPOS_SERVICIO = [
  { id: 1, nombre: 'Prácticas' },
  { id: 2, nombre: 'Servicio Social' },
  { id: 3, nombre: 'Medio Tiempo' },
  { id: 4, nombre: 'Proyecto' },
];

const SUGERENCIAS = [
  { emoji: '📋', label: 'Responsabilidades', texto: 'Apoyar en el desarrollo de..., dar seguimiento a..., elaborar reportes...' },
  { emoji: '🛠️', label: 'Herramientas', texto: 'Python, Excel, SQL, Git, Figma, Office 365...' },
  { emoji: '🎯', label: 'Habilidades', texto: 'Trabajo en equipo, comunicación efectiva, autodidacta...' },
  { emoji: '🕐', label: 'Horario', texto: 'Lunes a viernes 9:00–14:00 hrs, flexible o remoto...' },
  { emoji: '🎁', label: 'Beneficios', texto: 'Carta de recomendación, constancia, capacitación...' },
];

const VACANTE_INICIAL: FormData = {
  titulo: '',
  descripcionCorta: '',
  descripcionCompleta: '',
  requisitos: '',
  duracion: '',
  modalidad: '',
  tipoServicio: '',
  ubicacion: '',
  correo: '',
  nombreEncargado: '',
  salario: false,
};

function validar(data: FormData): FormErrors {
  const errores: FormErrors = {};
  if (!data.titulo.trim()) errores.titulo = 'El título de la vacante es obligatorio.';
  if (!data.descripcionCorta.trim()) errores.descripcionCorta = 'Agrega una descripción corta.';
  if (!data.descripcionCompleta.trim()) errores.descripcionCompleta = 'La descripción completa es obligatoria.';
  if (!data.requisitos.trim()) errores.requisitos = 'Lista al menos un requisito.';
  if (!data.modalidad) errores.modalidad = 'Selecciona la modalidad.';
  if (!data.tipoServicio) errores.tipoServicio = 'Selecciona el tipo de servicio.';
  if (!data.ubicacion.trim()) errores.ubicacion = 'Indica la ubicación.';
  if (!data.nombreEncargado.trim()) errores.nombreEncargado = 'El nombre del encargado es obligatorio.';
  if (!data.correo.trim()) {
    errores.correo = 'El correo de contacto es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errores.correo = 'Ingresa un correo válido.';
  }
  return errores;
}

function Campo({
  id, label, error, required = false, children,
}: {
  id: string; label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`${styles.campo} ${error ? styles.campoError : ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label} {required && <span className={styles.req}>*</span>}
      </label>
      {children}
      {error && <p className={styles.errorMsg} role="alert">{error}</p>}
    </div>
  );
}

export default function Registro() {
  const [form, setForm] = useState<FormData>(VACANTE_INICIAL);
  const [errores, setErrores] = useState<FormErrors>({});
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  const refs = useRef<Partial<Record<keyof FormData, HTMLElement | null>>>({});

  function set(campo: keyof FormData, valor: string | boolean) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  function insertarSugerencia(texto: string) {
    set('descripcionCompleta', form.descripcionCompleta
      ? `${form.descripcionCompleta}\n${texto}`
      : texto
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevosErrores = validar(form);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      const primerCampo = Object.keys(nuevosErrores)[0] as keyof FormData;
      refs.current[primerCampo]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setEnviando(true);
    setErrorServidor('');

    try {
     const supabase = createClient();
// @ts-ignore
supabase.schema = null;

      // Buscar si el encargado ya existe
      let idEncargado: number;
      const { data: encargadoExistente } = await supabase
        .from('encargados')
        .select('id_encargado')
        .eq('email', form.correo)
        .single();

      if (encargadoExistente) {
        idEncargado = encargadoExistente.id_encargado;
      } else {
        // Crear nuevo encargado
        const { data: nuevoEncargado, error: errorEncargado } = await supabase
          .from('encargados')
          .insert({
            nombre: form.nombreEncargado,
            email: form.correo,
            tipo_encargado: 'Profesor',
          })
          .select('id_encargado')
          .single();

        if (errorEncargado) throw new Error(errorEncargado.message);
        idEncargado = nuevoEncargado.id_encargado;
      }

      const { error: errorVacante } = await supabase
  .from('vacantes')
  .insert([{
    nombre: form.titulo,
    descripcion: form.descripcionCompleta,
    requisitos: form.requisitos,
    ubicacion: form.ubicacion,
    id_modalidad: Number(form.modalidad),
    id_tipovacante: Number(form.tipoServicio),
    id_encargado: idEncargado,
    salario: form.salario,
    estado: false,
    fecha_publicacion: new Date().toISOString().split('T')[0],
    horas: 480,
    tipo_horario: 'Matutino',
  }])
  .select();

      if (errorVacante) throw new Error(errorVacante.message);

      setEnviado(true);

    } catch (error) {
      setErrorServidor('Ocurrió un error al publicar la vacante. Intenta de nuevo.');
      console.error(error);
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>¡Vacante enviada!</h2>
          <p className={styles.successMsg}>
            Gracias. Tu vacante fue enviada y será revisada por nuestro equipo antes de publicarse.
          </p>
          <button className={styles.btnPrimary} onClick={() => { setEnviado(false); setForm(VACANTE_INICIAL); }}>
            Publicar otra vacante
          </button>
        </div>
      </div>
    );
  }

  const descLen = form.descripcionCompleta.length;
  const reqLen = form.requisitos.length;
  const MAX = 800;

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Publicar Vacante</h1>
        <p className={styles.pageSubtitle}>Registra una nueva oportunidad de servicio social</p>
      </div>

      <div className={styles.infoBanner}>
        <span className={styles.infoIcon}>ℹ️</span>
        <div>
          <strong>Proceso de validación</strong>
          <p>Todas las vacantes publicadas pasan por un proceso de revisión por parte de la coordinación.</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        <Campo id="titulo" label="Título de la vacante" required error={errores.titulo}>
          <input
            id="titulo"
            className={styles.input}
            placeholder="Ej: Desarrollo de Sistema de Gestión Académica"
            value={form.titulo}
            onChange={(e) => set('titulo', e.target.value)}
            ref={(el) => { refs.current.titulo = el; }}
          />
        </Campo>

        <Campo id="descripcionCorta" label="Descripción corta" required error={errores.descripcionCorta}>
          <input
            id="descripcionCorta"
            className={styles.input}
            placeholder="Breve resumen de la vacante (1–2 oraciones)"
            value={form.descripcionCorta}
            onChange={(e) => set('descripcionCorta', e.target.value)}
            ref={(el) => { refs.current.descripcionCorta = el; }}
          />
        </Campo>

        <Campo id="descripcionCompleta" label="Descripción completa" required error={errores.descripcionCompleta}>
          <div className={styles.sugerencias}>
            <p className={styles.sugerenciasLabel}>Sugerencias para completar:</p>
            <div className={styles.sugerenciasRow}>
              {SUGERENCIAS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={styles.chip}
                  onClick={() => insertarSugerencia(`${s.label}: ${s.texto}`)}
                  title={s.texto}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            id="descripcionCompleta"
            className={`${styles.textarea} ${descLen > MAX ? styles.textareaOver : ''}`}
            placeholder="Descripción detallada de las actividades y responsabilidades"
            rows={6}
            value={form.descripcionCompleta}
            onChange={(e) => set('descripcionCompleta', e.target.value)}
            ref={(el) => { refs.current.descripcionCompleta = el; }}
          />
          <p className={`${styles.charCount} ${descLen > MAX ? styles.charOver : ''}`}>
            {descLen} / {MAX} caracteres
          </p>
        </Campo>

        <Campo id="requisitos" label="Requisitos" required error={errores.requisitos}>
          <textarea
            id="requisitos"
            className={`${styles.textarea} ${reqLen > MAX ? styles.textareaOver : ''}`}
            placeholder="Lista los requisitos separados por comas o por línea."
            rows={4}
            value={form.requisitos}
            onChange={(e) => set('requisitos', e.target.value)}
            ref={(el) => { refs.current.requisitos = el; }}
          />
          <p className={`${styles.charCount} ${reqLen > MAX ? styles.charOver : ''}`}>
            {reqLen} / {MAX} caracteres
          </p>
        </Campo>

        <div className={styles.row2}>
          <Campo id="modalidad" label="Modalidad" required error={errores.modalidad}>
            <select
              id="modalidad"
              className={styles.select}
              value={form.modalidad}
              onChange={(e) => set('modalidad', e.target.value)}
              ref={(el) => { refs.current.modalidad = el; }}
            >
              <option value="">Selecciona modalidad</option>
              {MODALIDADES.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
              ))}
            </select>
          </Campo>

          <Campo id="tipoServicio" label="Tipo de servicio" required error={errores.tipoServicio}>
            <select
              id="tipoServicio"
              className={styles.select}
              value={form.tipoServicio}
              onChange={(e) => set('tipoServicio', e.target.value)}
              ref={(el) => { refs.current.tipoServicio = el; }}
            >
              <option value="">Selecciona un tipo</option>
              {TIPOS_SERVICIO.map((t) => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </Campo>
        </div>

        <Campo id="ubicacion" label="Ubicación" required error={errores.ubicacion}>
          <input
            id="ubicacion"
            className={styles.input}
            placeholder="Ej: Ciudad Universitaria, CDMX"
            value={form.ubicacion}
            onChange={(e) => set('ubicacion', e.target.value)}
            ref={(el) => { refs.current.ubicacion = el; }}
          />
        </Campo>

        <Campo id="nombreEncargado" label="Nombre del encargado" required error={errores.nombreEncargado}>
          <input
            id="nombreEncargado"
            className={styles.input}
            placeholder="Ej: Dr. Juan Pérez"
            value={form.nombreEncargado}
            onChange={(e) => set('nombreEncargado', e.target.value)}
            ref={(el) => { refs.current.nombreEncargado = el; }}
          />
        </Campo>

        <Campo id="correo" label="Correo de contacto" required error={errores.correo}>
          <input
            id="correo"
            type="email"
            className={styles.input}
            placeholder="correo@institucion.unam.mx"
            value={form.correo}
            onChange={(e) => set('correo', e.target.value)}
            ref={(el) => { refs.current.correo = el; }}
          />
        </Campo>

        <Campo id="salario" label="Apoyo económico" error={errores.salario}>
  <div className={styles.checkboxGroup}>
    <label className={styles.checkboxOption}>
      <input
        type="radio"
        name="salario"
        checked={form.salario === true}
        onChange={() => set('salario', true)}
        className={styles.checkbox}
      />
      <span className={styles.checkboxLabel}>💰 Sí, ofrece apoyo económico</span>
    </label>
    <label className={styles.checkboxOption}>
      <input
        type="radio"
        name="salario"
        checked={form.salario === false}
        onChange={() => set('salario', false)}
        className={styles.checkbox}
      />
      <span className={styles.checkboxLabel}>❌ No se ofrece apoyo económico</span>
    </label>
  </div>
</Campo>

        {errorServidor && (
          <p className={styles.errorServidor}>⚠️ {errorServidor}</p>
        )}

        <p className={styles.nota}>
          📌 La vacante será procesada para verificación por nuestro equipo antes de publicarse.
        </p>

        <button type="submit" className={styles.btnPrimary} disabled={enviando}>
          {enviando ? (
            <><span className={styles.spinner} /> Enviando…</>
          ) : (
            <>Publicar Vacante <span>→</span></>
          )}
        </button>
      </form>
    </main>
  );
}