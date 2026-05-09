import React from 'react';
import styles from './CardVacante.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt,faClock, faUserTie} from '@fortawesome/free-solid-svg-icons'; 

const vacantes = [
  {
    id: 1,
    titulo: "Análisis de Datos y Machine Learning",
    descripcion: "Apoyo en proyectos de análisis de datos y desarrollo de modelos de machine learning para...",
    tipo: "Adjuntía con Profesor",
    tipoKey: "adjuntia",
    responsable: "Dra. María Elena Rodríguez",
    lugar: "FES Acatlán - Laboratorio de Cómputo",
    horas: "480 horas",
    modalidad: "Híbrida",
    vacantes: 2,
  },
  {
    id: 2,
    titulo: "Soporte Técnico y Administración de Sistemas",
    descripcion: "Mantenimiento de equipos de cómputo, administración de redes y soporte técnico a la...",
    tipo: "Adjuntía con Profesor",
    tipoKey: "adjuntia",
    responsable: "Ing. Roberto Sánchez",
    lugar: "FES Acatlán - Centro de Cómputo",
    horas: "480 horas",
    modalidad: "Presencial",
    vacantes: 4,
  },
  {
    id: 3,
    titulo: "Ciencia de Datos en Finanzas",
    descripcion: "Análisis de datos financieros, desarrollo de modelos predictivos y visualización de informaci...",
    tipo: "Empresa Externa",
    tipoKey: "empresa",
    responsable: "Banco Nacional de México",
    lugar: "Ciudad de México - Polanco",
    horas: "480 horas",
    modalidad: "Presencial",
    vacantes: 2,
  },
  {
    id: 4,
    titulo: "Desarrollo de Aplicaciones Móviles",
    descripcion: "Creación de aplicaciones móviles multiplataforma para proyectos de investigación y vinculación...",
    tipo: "Adjuntía con Profesor",
    tipoKey: "adjuntia",
    responsable: "Mtro. Luis Fernando Torres",
    lugar: "FES Acatlán - Edificio A3",
    horas: "480 horas",
    modalidad: "Híbrida",
    vacantes: 3,
  },
];

// Función para obtener el ícono según el tipo de responsable
const getResponsibleIcon = (tipo: string) => {
  if (tipo === "Adjuntía con Profesor") {
    return "fas fa-user-tie";
  } else if (tipo === "Empresa Externa") {
    return "fas fa-university";
  }
  return "fas fa-user";
};

// Función para obtener el ícono según el lugar
const getPlaceIcon = (lugar: string | string[]) => {
  if (lugar.includes("FES Acatlán")) {
    return "fas fa-desktop";
  }
  return "fas fa-map-marker-alt";
};

export default function CardVacante() {
  return (
    <section className={styles.vacantes} id="vacantes">
      <div className={styles.container}>
        <div className={styles.vacantesGrid}>
          {vacantes.map((vacante) => (
            <article 
              key={vacante.id}
              className={`${styles.vacanteCard} ${styles[vacante.tipoKey]}`}
            >
              <div className={styles.cardHeader}>
                <span className={styles.badge}>{vacante.tipo}</span>
                <span className={styles.vacantesCount}>{vacante.vacantes} vacantes</span>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.vacanteTitle}>{vacante.titulo}</h3>
                <p className={styles.vacanteDescription}>{vacante.descripcion}</p>
                
                <div className={styles.vacanteDetails}>
                  <div className={styles.detailItem}>
                    <i className={getResponsibleIcon(vacante.tipo)}></i> 
                    <span>{vacante.responsable}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <i className={getPlaceIcon(vacante.lugar)}></i> 
                    <span>{vacante.lugar}</span>
                  </div>
                  <div className={styles.detailItem}>
                      <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                    <span>{vacante.horas}</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <span className={styles.modalidadTag}>{vacante.modalidad}</span>
                <Link href="#" className={styles.detailsLink}>
                  Ver detalles <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}