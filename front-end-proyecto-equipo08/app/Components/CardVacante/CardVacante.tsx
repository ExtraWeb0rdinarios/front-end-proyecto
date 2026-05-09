import React from 'react';
import styles from './CardVacante.module.css';
import Link from 'next/link';

 
let CardVacantes: String = 'Vanesa Sebastian Cervantes'

export default function CardVacante () {
    return (
        <section className={styles.vacantes} id="vacantes">
            <div className={styles.container}>
                <div className={styles.vacantesGrid}>
                    {/* Vacante 1: Análisis de Datos y ML */}
                    <article className={`${styles.vacanteCard} ${styles.adjuntia}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badge}>Adjuntía con Profesor</span>
                            <span className={styles.vacantesCount}>2 vacantes</span>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.vacanteTitle}>Análisis de Datos y Machine Learning</h3>
                            <p className={styles.vacanteDescription}>
                                Apoyo en proyectos de análisis de datos y desarrollo de modelos de machine learning para...
                            </p>
                            <div className={styles.vacanteDetails}>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-user-tie"></i> <span>Dra. María Elena Rodríguez</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-desktop"></i> <span>FES Acatlán - Laboratorio de Cómputo</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-clock"></i> <span>480 horas</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.modalidadTag}>Híbrida</span>
                            <Link href="#" className={styles.detailsLink}>
                                Ver detalles <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </article>

                    {/* Vacante 2: Soporte Técnico */}
                    <article className={`${styles.vacanteCard} ${styles.adjuntia}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badge}>Adjuntía con Profesor</span>
                            <span className={styles.vacantesCount}>4 vacantes</span>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.vacanteTitle}>Soporte Técnico y Administración de Sistemas</h3>
                            <p className={styles.vacanteDescription}>
                                Mantenimiento de equipos de cómputo, administración de redes y soporte técnico a la...
                            </p>
                            <div className={styles.vacanteDetails}>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-user-cog"></i> <span>Ing. Roberto Sánchez</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-server"></i> <span>FES Acatlán - Centro de Cómputo</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-clock"></i> <span>480 horas</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.modalidadTag}>Presencial</span>
                            <Link href="#" className={styles.detailsLink}>
                                Ver detalles <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </article>

                    {/* Vacante 3: Ciencia de Datos Finanzas */}
                    <article className={`${styles.vacanteCard} ${styles.empresa}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badge}>Empresa Externa</span>
                            <span className={styles.vacantesCount}>2 vacantes</span>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.vacanteTitle}>Ciencia de Datos en Finanzas</h3>
                            <p className={styles.vacanteDescription}>
                                Análisis de datos financieros, desarrollo de modelos predictivos y visualización de informaci...
                            </p>
                            <div className={styles.vacanteDetails}>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-university"></i> <span>Banco Nacional de México</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-map-marker-alt"></i> <span>Ciudad de México - Polanco</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-clock"></i> <span>480 horas</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.modalidadTag}>Presencial</span>
                            <Link href="#" className={styles.detailsLink}>
                                Ver detalles <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </article>

                    {/* Vacante 4: Aplicaciones Móviles */}
                    <article className={`${styles.vacanteCard} ${styles.adjuntia}`}>
                        <div className={styles.cardHeader}>
                            <span className={styles.badge}>Adjuntía con Profesor</span>
                            <span className={styles.vacantesCount}>3 vacantes</span>
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.vacanteTitle}>Desarrollo de Aplicaciones Móviles</h3>
                            <p className={styles.vacanteDescription}>
                                Creación de aplicaciones móviles multiplataforma para proyectos de investigación y vinculación...
                            </p>
                            <div className={styles.vacanteDetails}>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-user-graduate"></i> <span>Mtro. Luis Fernando Torres</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-building"></i> <span>FES Acatlán - Edificio A3</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <i className="fas fa-clock"></i> <span>480 horas</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.modalidadTag}>Híbrida</span>
                            <Link href="#" className={styles.detailsLink}>
                                Ver detalles <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}