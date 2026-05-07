import styles from "./Steps.module.css";

const pasos = [
  {
    numero: "01",
    titulo: "Explora Vacantes",
    descripcion:
      "Busca y filtra oportunidades que se ajusten a tu perfil, intereses y disponibilidad horaria.",
    icono: "🔍",
    iconoBg: "#fef3c7",
    iconoColor: "#d97706",
    badgeBg: "#facc15",
    badgeColor: "#78350f",
    imagen:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70",
  },
  {
    numero: "02",
    titulo: "Postúlate",
    descripcion:
      "Envía tu solicitud a las vacantes de tu interés y da seguimiento en tiempo real a tu postulación.",
    icono: "📩",
    iconoBg: "#dbeafe",
    iconoColor: "#2563eb",
    badgeBg: "#facc15",
    badgeColor: "#78350f",
    imagen:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=70",
  },
  {
    numero: "03",
    titulo: "Realiza tu Servicio",
    descripcion:
      "Cumple con las horas y actividades establecidas en el programa de servicio social seleccionado.",
    icono: "✍️",
    iconoBg: "#ccfbf1",
    iconoColor: "#0f766e",
    badgeBg: "#60a5fa",
    badgeColor: "#1e3a5f",
    imagen:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70",
  },
  {
    numero: "04",
    titulo: "Obtén tu Liberación",
    descripcion:
      "Completa la documentación final y recibe tu carta de liberación oficial de servicio social.",
    icono: "🥳",
    iconoBg: "#ede9fe",
    iconoColor: "#7c3aed",
    badgeBg: "#a78bfa",
    badgeColor: "#3b0764",
    
    imagen: 
    '/imagenes/nochains.png', 
  },
];
 {/* "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=400&q=70"*/}
export default function Steps() {
  return (
    <section className={styles.steps}>
      <div className={styles.eyebrow}>📌 Paso a paso</div>
      <h2 className={styles.title}>Proceso de Servicio Social</h2>
      <p className={styles.subtitle}>
        Sigue estos pasos para completar tu servicio social de manera exitosa
      </p>

      <div className={styles.cards}>
        {pasos.map((paso, index) => (
          <div
            key={paso.numero}
            className={styles.card}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Imagen con badge y ícono */}
            <div className={styles.imgWrap}>
              {paso.imagen ? (
                <img
  src={paso.imagen}
  alt={`Imagen del paso ${paso.numero}: ${paso.titulo}`}
  className={styles.img}
/>
              ) : (
                <div className={styles.imgPlaceholder}>
                  <span className={styles.iconoGrande}>{paso.icono}</span>
                </div>
              )}
              <span
                className={styles.badge}
                style={{ background: paso.badgeBg, color: paso.badgeColor }}
              >
                {paso.numero}
              </span>
              <div
                className={styles.iconoBadge}
                style={{ background: paso.iconoBg, color: paso.iconoColor }}
              >
                {paso.icono}
              </div>
            </div>

            {/* Cuerpo */}
            <div className={styles.body}>
              <p className={styles.pasoTitulo}>{paso.titulo}</p>
              <p className={styles.pasoDesc}>{paso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}