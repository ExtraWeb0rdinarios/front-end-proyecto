'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/',               label: 'Inicio' },
    { href: '/Vacantes',       label: 'Vacantes' },
    { href: '/Postulaciones',  label: 'Mis postulaciones' },
    { href: '/Publicar',       label: 'Publicar' },
    { href: '/FAQ',            label: 'FAQ' },
    { href: '/Contacto',       label: 'Contacto' },
  ];

  return (
    <header className={styles.header}>

      {/* Nombre de la plataforma */}
      <div className={styles.left}>
        <h1 className={styles.brandRow}>
          <span className={styles.textEnlace}>ENLACE</span>
          <span className={styles.textMac}>MAC</span>
        </h1>
        <p className={styles.brandSub}>Servicio social · FES Acatlán</p>
      </div>

      {/* Navegación central */}
      <nav className={styles.center}>
        {navLinks.map(({ href, label }) => (
          <Link
          key={href}
          href={href}
          className={`${styles.navBtn} ${pathname === href ? styles.active : ''}`}
         >
      {label}
    </Link>
  ))}
</nav>

      {/* Botón de sesión */}
      <div className={styles.right}>
        <Link href='/Login' passHref legacyBehavior>
          <a className={styles.login}>Iniciar sesión</a>
        </Link>
      </div>

    </header>
  );
}