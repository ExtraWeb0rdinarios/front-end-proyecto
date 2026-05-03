import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
  
      {/* Aquí va el nombre de la página */}
      <div className={styles.left}>
        <h1>
          <span className={styles.textEnlace}>ENLACE</span>
          <span className={styles.textMac}>MAC</span>
        </h1>
        <p>Servicio social - FES Acatlán</p>
      </div>

      {/*cada botom*/}
      <nav className={styles.center}>
        <button>Inicio</button>
        <button>Vacantes</button>
        <button>Postulaciones</button>
        <button>Publicar</button>
        <button>Asesorías</button>
        <button>Info Oficial</button>
        <button>FAQ</button>
        <button>Contacto</button>
      </nav>

      {/*este es el botom de inciar sesion*/}
      <div className={styles.right}>
        <button className={styles.login}>Iniciar Sesión</button>
      </div>

    </header>
  );
}