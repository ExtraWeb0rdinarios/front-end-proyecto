'use client';
import { useRef, useState } from 'react';
import styles from './Contacto.module.css';

interface FormContacto {
  nombre: string;
  correo: string;
  cuenta: string;
  asunto: string;
  mensaje: string;
}
type FormErrors = Partial<Record<keyof FormContacto, string>>;


const ASUNTOS = [
  'Duda sobre servicio social',
  'Problema con mi postulación',
  'Información sobre vacantes',
  'Solicitud de asesoría',
  'Reporte de error en la plataforma',
  'Otro',
];

const CONTACTO_INFO = {
  direccion: 'Coordinación de Matemáticas Aplicadas y Computación\nEdificio A2, Cubículo 201\nFES Acatlán, UNAM\nAv. Alcanfores y San Juan Totoltepec s/n\nSanta Cruz Acatlán, Naucalpan de Juárez\nEstado de México, C.P. 53150',
  email: 'servicio.social.mac@pcpuma.acatlan.unam.mx',
  telefono: '55 1212 1212',
  horario: 'Lunes a Viernes: 9:00 – 16:00 hrs \n Sábados y Domingos: Cerrado',
};

//q se muetre la ubicacion d la fes PRECISA
const MAPS_EMBED =
    //'https://www.google.com/maps/place/FES+Acatl%C3%A1n.+Entrada+Principal+peatonal./@19.4850399,-99.2500931,16.6z/data=!4m10!1m2!2m1!1sfes+acatlan!3m6!1s0x85d203f8edba1d87:0x620ff68fef19bda5!8m2!3d19.4820973!4d-99.2446694!15sCgtmZXMgYWNhdGxhbpIBCnVuaXZlcnNpdHngAQA!16s%2Fg%2F11y1cjrwpx?hl=es-ES&entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D'
  //'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.123!2d-99.253!3d19.481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2003c8e000001%3A0x1234!2sFES%20Acatl%C3%A1n!5e0!3m2!1ses!2smx!4v1700000000000';
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4948.772749985037!2d-99.25009305160322!3d19.485039913182895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d203f8edba1d87%3A0x620ff68fef19bda5!2sFES%20Acatl%C3%A1n.%20Entrada%20Principal%20peatonal.!5e0!3m2!1ses!2sus!4v1778458466687!5m2!1ses!2sus'
  const MAPS_URL = 'https://maps.app.goo.gl/FESAcatlan';

//comienza validacion p
function validar(data: FormContacto): FormErrors {
  const e: FormErrors = {};

  //nombre
  const palabras = data.nombre.trim().split(/\s+/);
  if (!data.nombre.trim()) {
    e.nombre = 'El nombre completo es obligatorio.';
  } else if (palabras.length < 2) {
    e.nombre = 'Ingresa al menos nombre y apellido.';
  }
  //correp
  if (!data.correo.trim()) {
    e.correo = 'El correo electrónico es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    e.correo = 'Ingresa un correo válido.';
  }

  //# de cuenta
  if (!data.cuenta.trim()) {
    e.cuenta = 'El número de cuenta es obligatorio.';
  } else if (!/^\d{9}$/.test(data.cuenta)) {
    e.cuenta = 'El número de cuenta debe tener exactamente 9 dígitos.';
  }
  //opcion de asunto
  if (!data.asunto) e.asunto = 'Selecciona un asunto.';

  if (!data.mensaje.trim()) {
    e.mensaje = 'El mensaje no puede estar vacío.';
  } else if (data.mensaje.trim().length < 10) {
    e.mensaje = 'El mensaje es demasiado corto.';
  }

  return e;
}

function Campo({
  id, label, error, required = false, children,
}: {
  id: string; label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`${styles.campo} ${error ? styles.campoError : ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label}{required && <span className={styles.req}> *</span>}
      </label>
      {children}
      {error && <p className={styles.errorMsg} role="alert">{error}</p>}
    </div>
  );
}
//compo
export default function Contacto() {
  const [form, setForm]         = useState<FormContacto>({ nombre: '', correo: '', cuenta: '', asunto: '', mensaje: '' });
  const [errores, setErrores]   = useState<FormErrors>({});
  const [enviado, setEnviado]   = useState(false);
  const [enviando, setEnviando] = useState(false);
  const refs = useRef<Partial<Record<keyof FormContacto, HTMLElement | null>>>({});

  function set(campo: keyof FormContacto, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  //# de cunta (9())
  function handleCuenta(val: string) {
    const solo = val.replace(/\D/g, '').slice(0, 9);
    set('cuenta', solo);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevosErrores = validar(form);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      const primerCampo = Object.keys(nuevosErrores)[0] as keyof FormContacto;
      refs.current[primerCampo]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (refs.current[primerCampo] as HTMLElement | null)?.focus();
      return;
    }

    setEnviando(true);

    //conexion a SUPABASE----------------------------------------------------------------------------------------------------------------------------------------------------
    await new Promise((r) => setTimeout(r, 900));
    setEnviando(false);
    setEnviado(true);
  }

  return (
    <main className={styles.page}>

      {/*mensjae*/}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contacto</h1>
        <p className={styles.pageSubtitle}>Estamos aquí para ayudarte con cualquier duda o consulta</p>
      </div>

      <div className={styles.layout}>

        {/*lado izq*/}
        <aside className={styles.infoCol}>

          {/*ubi*/}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>📍</div>
            <div>
              <h3 className={styles.infoCardTitle}>Ubicación</h3>
              <p className={styles.infoCardText} style={{ whiteSpace: 'pre-line' }}>
                {CONTACTO_INFO.direccion}
              </p>
            </div>
          </div>

          {/*mail*/}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>✉️</div>
            <div>
              <h3 className={styles.infoCardTitle}>Correo electrónico</h3>
              <a href={`mailto:${CONTACTO_INFO.email}`} className={styles.infoCardLink}>
                {CONTACTO_INFO.email}
              </a>
            </div>
          </div>

          {/*telefono*/}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>📞</div>
            <div>
              <h3 className={styles.infoCardTitle}>Teléfono</h3>
              <p className={styles.infoCardText}>{CONTACTO_INFO.telefono}</p>
            </div>
          </div>

          {/*horaroi*/}
          <div className={styles.infoCard}>
            <div className={styles.infoCardIcon}>🕐</div>
            <div>
              <h3 className={styles.infoCardTitle}>Horario de atención</h3>
              <p className={styles.infoCardText} style={{ whiteSpace: 'pre-line' }}>
                {CONTACTO_INFO.horario}
              </p>
            </div>
          </div>

          {/*recuadro mapa*/}
          <div className={styles.mapWrapper}>
              <iframe
                title="Ubicación FES Acatlán"
                src={MAPS_EMBED}
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
          </div>
        </aside>

        {/*lado der*/}
        <section className={styles.formCol}>
          {enviado ? (
            <div className={styles.successCard}>
              <span className={styles.successIcon}>✅</span>
              <h3 className={styles.successTitle}>¡Mensaje enviado!</h3>
              <p className={styles.successMsg}>El mensaje fue enviado con éxito. Nos pondremos en contacto contigo pronto.</p>
              <button className={styles.btnPrimary} onClick={() => { setEnviado(false); setForm({ nombre: '', correo: '', cuenta: '', asunto: '', mensaje: '' }); }}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.formTitle}>Envíanos un mensaje</h2>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>

                <Campo id="nombre" label="Nombre completo" required error={errores.nombre}>
                  <input
                    id="nombre"
                    className={styles.input}
                    placeholder="Tu nombre y apellido"
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                    ref={(el) => { refs.current.nombre = el; }}
                  />
                </Campo>

                <Campo id="correo" label="Correo electrónico" required error={errores.correo}>
                  <input
                    id="correo"
                    type="email"
                    className={styles.input}
                    placeholder="tu@correo.com"
                    value={form.correo}
                    onChange={(e) => set('correo', e.target.value)}
                    ref={(el) => { refs.current.correo = el; }}
                  />
                </Campo>

                <Campo id="cuenta" label="Número de cuenta" required error={errores.cuenta}>
                  <div className={styles.cuentaWrapper}>
                    <input
                      id="cuenta"
                      inputMode="numeric"
                      className={styles.input}
                      placeholder="123456789"
                      value={form.cuenta}
                      onChange={(e) => handleCuenta(e.target.value)}
                      maxLength={9}
                      ref={(el) => { refs.current.cuenta = el; }}
                    />
                    <span className={`${styles.cuentaCounter} ${form.cuenta.length === 9 ? styles.cuentaOk : ''}`}>
                      {form.cuenta.length}/9
                    </span>
                  </div>
                </Campo>

                <Campo id="asunto" label="Asunto" required error={errores.asunto}>
                  <select
                    id="asunto"
                    className={styles.select}
                    value={form.asunto}
                    onChange={(e) => set('asunto', e.target.value)}
                    ref={(el) => { refs.current.asunto = el; }}
                  >
                    <option value="">Selecciona un asunto</option>
                    {ASUNTOS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Campo>

                <Campo id="mensaje" label="Mensaje" required error={errores.mensaje}>
                  <textarea
                    id="mensaje"
                    className={styles.textarea}
                    placeholder="Describe tu consulta o comentario"
                    rows={5}
                    maxLength={500}
                    value={form.mensaje}
                    onChange={(e) => set('mensaje', e.target.value)}
                    ref={(el) => { refs.current.mensaje = el; }}
                  />
                  <p className={styles.charCount}>{form.mensaje.length} / 500 caracteres</p>
                </Campo>

                <button type="submit" className={styles.btnPrimary} disabled={enviando}>
                  {enviando ? (
                    <><span className={styles.spinner} /> Enviando…</>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}