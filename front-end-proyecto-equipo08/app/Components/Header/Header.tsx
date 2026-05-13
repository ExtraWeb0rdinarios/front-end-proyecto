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

      {/*parte de ENLACE MAC*/}
      <div className={styles.left}>
        <h1 className={styles.brandRow}>
          <span className={styles.textEnlace}>ENLACE</span>
          <span className={styles.textMac}>MAC</span>
        </h1>
        <p className={styles.brandSub}>Servicio social · FES Acatlán</p>
      </div>

      {/*botoncitos de enmedio*/}
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

      {/*botom iniciar sesion*/}
      <div className={styles.right}>
        <Link href='/Login' className={styles.login}>
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
}