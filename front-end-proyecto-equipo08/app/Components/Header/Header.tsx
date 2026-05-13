'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/',               label: 'Inicio' },
    { href: '/Vacantes',       label: 'Vacantes' },
    { href: '/Postulaciones',  label: 'Mis postulaciones' },
    { href: '/Publicar',       label: 'Publicar' },
    { href: '/FAQ',            label: 'FAQ' },
    { href: '/Contacto',       label: 'Contacto' },
  ];

  /*cierra el menu al cambiar de ruta*/
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /*bloquea el scroll del body cuando el menu esta abierto*/
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

      {/*lo del centro*/}
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

      {/*botom al movil*/}
      <div className={styles.right}>
        <Link href='/Login' className={styles.login}>
          Iniciar sesión
        </Link>
      </div>

      {/*breakppint*/}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*breakpoint en el movil*/}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileNavBtn} ${pathname === href ? styles.mobileActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileBottom}>
          <Link href='/Login' className={styles.mobileLogin} onClick={() => setMenuOpen(false)}>
            Iniciar sesión
          </Link>
        </div>
      </div>

    </header>
  );
}