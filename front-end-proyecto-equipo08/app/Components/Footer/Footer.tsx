import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const NAV_LINKS = [
  { href: '/Vacantes',      label: 'Explorar Vacantes' },
  { href: '/Publicar',      label: 'Publicar Vacante' },
  { href: '/Postulaciones', label: 'Mis Postulaciones' },
];

const INFO_LINKS = [
  { href: '/Informacion', label: 'Información Oficial' },
  { href: '/FAQ',         label: 'Preguntas Frecuentes' },
  { href: '/Contacto',    label: 'Contacto' },
];

const CONTACT = {
  address: 'Edificio A2, Cubículo 201, FES Acatlán, UNAM',
  email:   'servicio.social.mac@pcpuma.acatlan.unam.mx',
  phone:   '55 1212 1212',
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* destello decorativo */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>

        {/* Marca */}
        <div className={styles.brand}>
          <h3 className={styles.brandTitle}>
            <span className={styles.fe}>ENLACE</span>
            <span className={styles.fm}>MAC</span>
          </h3>
          <p className={styles.institution}>FES Acatlán · UNAM</p>
          <p className={styles.tagline}>Conectando talento con oportunidad.</p>
          <p className={styles.description}>
            Plataforma institucional de servicio social para la carrera de
            Matemáticas Aplicadas y Computación.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className={styles.sectionTitle}>Navegación</h4>
          <ul className={styles.linkList}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Información */}
        <div>
          <h4 className={styles.sectionTitle}>Información</h4>
          <ul className={styles.linkList}>
            {INFO_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className={styles.sectionTitle}>Contacto</h4>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">📍</span>
            <p className={styles.contactText}>{CONTACT.address}</p>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">✉️</span>
            <p className={styles.contactText}>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactIcon} aria-hidden="true">📞</span>
            <p className={styles.contactText}>{CONTACT.phone}</p>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className={styles.bottom}>
        <p className={styles.copy}>
          © {currentYear} ENLACE MAC — FES Acatlán, UNAM. Todos los derechos reservados.
        </p>
        <p className={styles.badge}>UNAM · Dirección General de Servicios a la Comunidad</p>
      </div>
    </footer>
  );
}