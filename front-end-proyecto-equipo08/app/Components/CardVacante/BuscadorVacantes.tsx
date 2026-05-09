'use client';

import { useState } from 'react';
import styles from './BuscadorVacantes.module.css';
import cardStyles from './CardVacante.module.css';
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

const filtros = [
  { label: "🗂️ Todas", value: "Todas" },
  { label: "👨‍🏫 Adjuntía con Profesor", value: "Adjuntía con Profesor" },
  { label: "🏢 Empresa Externa", value: "Empresa Externa" },
  { label: "💻 Híbrida", value: "Híbrida" },
  { label: "📍 Presencial", value: "Presencial" },
];

export default function BuscadorVacantes() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  const vacantesFiltradas = vacantes.filter((v) => {
    const coincideBusqueda =
      v.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.lugar.toLowerCase().includes(busqueda.toLowerCase());

    const coincideFiltro =
      filtroActivo === 'Todas' ||
      v.tipo === filtroActivo ||
      v.modalidad === filtroActivo;

    return coincideBusqueda && coincideFiltro;
  });

  return (
    <section className={cardStyles.vacantes} id="vacantes">
      <div className={styles.wrapper}>

        {/* Barra de búsqueda y filtros */}
        <div className={styles.buscadorBar}>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar vacante por nombre, lugar..."
              className={styles.input}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className={styles.filtros}>
            {filtros.map((f) => (
              <button
                key={f.value}
                className={`${styles.filtroBtn} ${filtroActivo === f.value ? styles.filtroBtnActivo : ''}`}
                onClick={() => setFiltroActivo(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        <p className={styles.resultados}>
          {vacantesFiltradas.length} vacante{vacantesFiltradas.length !== 1 ? 's' : ''} encontrada{vacantesFiltradas.length !== 1 ? 's' : ''}
        </p>

        {/* Grid de vacantes */}
        <div className={cardStyles.vacantesGrid}>
          {vacantesFiltradas.length === 0 ? (
            <p style={{ color: '#6b7280', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              No se encontraron vacantes con ese criterio.
            </p>
          ) : (
            vacantesFiltradas.map((v) => (
              <article
                key={v.id}
                className={`${cardStyles.vacanteCard} ${cardStyles[v.tipoKey]}`}
              >
                <div className={cardStyles.cardHeader}>
                  <span className={cardStyles.badge}>{v.tipo}</span>
                  <span className={cardStyles.vacantesCount}>{v.vacantes} vacantes</span>
                </div>
                <div className={cardStyles.cardContent}>
                  <h3 className={cardStyles.vacanteTitle}>{v.titulo}</h3>
                  <p className={cardStyles.vacanteDescription}>{v.descripcion}</p>
                  <div className={cardStyles.vacanteDetails}>
                    <div className={cardStyles.detailItem}>
                      <FontAwesomeIcon icon={faUserTie}></FontAwesomeIcon>
                      <span>{v.responsable}</span>
                    </div>
                    <div className={cardStyles.detailItem}>
                      <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                      <span>{v.lugar}</span>
                    </div>
                    <div className={cardStyles.detailItem}>
                        <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                      <span>{v.horas}</span>
                    </div>
                  </div>
                </div>
                <div className={cardStyles.cardFooter}>
                  <span className={cardStyles.modalidadTag}>{v.modalidad}</span>
                  <Link href="#" className={cardStyles.detailsLink}>
                    Ver detalles <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}