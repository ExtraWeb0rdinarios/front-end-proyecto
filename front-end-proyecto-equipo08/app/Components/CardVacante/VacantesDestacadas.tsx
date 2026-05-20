'use client';

import { useState, useEffect } from 'react';
import cardStyles from './CardVacante.module.css';
import styles from './VacantesDestacadas.module.css';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faLocationDot, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

interface VacanteProps {
  id_vacante: number;
  nombre: string;
  fecha_publicacion: Date;
  estado: boolean;
  id_tipovacante: number;
  horas: number;
  id_modalidad: number;
  tipo_horario: string;
  id_encargado: number;
  descripcion: string;
  ubicacion: string;
  requisitos: string;
  salario: boolean;
}

export default function VacantesDestacadas() {
  const [vacantes, setVacantes] = useState<VacanteProps[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchVacantes = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vacantes')
        .select('*')
        .eq('estado', true)
        .order('fecha_publicacion', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Error al traer vacantes destacadas:', error);
      } else {
        setVacantes(data || []);
      }
      setCargando(false);
    };

    fetchVacantes();
  }, []);

  const getModalidadEstilo = (id_modalidad: number) => {
    if (id_modalidad === 1) return { background: '#dcfce7', color: '#15803d' };
    if (id_modalidad === 2) return { background: '#fef3c7', color: '#92400e' };
    return { background: '#dbeafe', color: '#1d4ed8' };
  };

  const getModalidadTexto = (id_modalidad: number) => {
    if (id_modalidad === 1) return '📍 Presencial';
    if (id_modalidad === 2) return '💻 Híbrida';
    return '🌐 En línea';
  };

  return (
    <section className={styles.seccion}>
      <div className={styles.encabezado}>
        <span className={styles.eyebrow}>🆕 Recién agregadas</span>
        <h2 className={styles.titulo}>Vacantes más recientes</h2>
        <p className={styles.subtitulo}>
          Las últimas oportunidades de servicio social disponibles
        </p>
      </div>

      {cargando ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
          ⏳ Cargando vacantes...
        </p>
      ) : (
        <div className={cardStyles.vacantesGrid}>
          {vacantes.map((v) => (
            <article
              key={v.id_vacante}
              className={`${cardStyles.vacanteCard} ${v.id_tipovacante === 1 ? cardStyles.adjuntia : cardStyles.empresa}`}
            >
              <div className={cardStyles.cardHeader}>
                <span className={cardStyles.badge}>
                  {v.id_tipovacante === 1 ? 'Adjuntía con Profesor' : 'Empresa Externa'}
                </span>
                {v.salario && (
                  <span className={styles.salarioBadge}>
                    <FontAwesomeIcon icon={faMoneyBill} /> Con apoyo económico
                  </span>
                )}
              </div>
              <div className={cardStyles.cardContent}>
                <h3 className={cardStyles.vacanteTitle}>{v.nombre}</h3>
                <p className={cardStyles.vacanteDescription}>{v.descripcion}</p>
                <div className={cardStyles.vacanteDetails}>
                  {v.ubicacion && (
                    <div className={cardStyles.detailItem}>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{v.ubicacion}</span>
                    </div>
                  )}
                  <div className={cardStyles.detailItem}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{v.horas} horas</span>
                  </div>
                </div>
              </div>
              <div className={cardStyles.cardFooter}>
                <span
                  className={cardStyles.modalidadTag}
                  style={getModalidadEstilo(v.id_modalidad)}
                >
                  {getModalidadTexto(v.id_modalidad)}
                </span>
                <Link href={`/Vacantes/${v.id_vacante}`} className={cardStyles.detailsLink}>
                  Ver detalles <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className={styles.verMas}>
        <Link href="/Vacantes" className={styles.btnVerMas}>
          Ver todas las vacantes →
        </Link>
      </div>
    </section>
  );
}