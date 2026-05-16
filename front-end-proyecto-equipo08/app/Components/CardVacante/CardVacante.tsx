'use client';

import { useState, useEffect } from 'react';
import styles from './BuscadorVacantes.module.css';
import cardStyles from './CardVacante.module.css';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClock, faLocationDot, faFileAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

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

const filtros = [
  { label: "Todas", value: "Todas" },
  { label: "Adjuntía con Profesor", value: "1" },
  { label: "Empresa Externa", value: "2" },
  { label: "💻 Híbrida", value: "hibrida" },
  { label: "📍 Presencial", value: "presencial" },
  { label: "🌐 En línea", value: "enlinea" },
];

export default function BuscadorVacantes() {
  const [vacantes, setVacantes] = useState<VacanteProps[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchVacantes = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('vacantes')
        .select('*')
        .eq('estado', true);

      if (error) {
        console.error('Error al traer vacantes:', error);
      } else {
        setVacantes(data || []);
      }
      setCargando(false);
    };

    fetchVacantes();
  }, []);

  const vacantesFiltradas = vacantes.filter((v) => {
    const coincideBusqueda =
      v.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.descripcion?.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.ubicacion?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideFiltro =
      filtroActivo === 'Todas' ||
      v.id_tipovacante.toString() === filtroActivo ||
      (filtroActivo === 'hibrida' && v.id_modalidad === 2) ||
      (filtroActivo === 'presencial' && v.id_modalidad === 1) ||
      (filtroActivo === 'enlinea' && v.id_modalidad === 3);

    return coincideBusqueda && coincideFiltro;
  });

  const getModalidadEstilo = (id_modalidad: number) => {
    if (id_modalidad === 1) return { background: '#dbeafe', color: '#1d4ed8' };
    if (id_modalidad === 2) return { background: '#fef3c7', color: '#92400e' };
    return { background: '#dcfce7', color: '#15803d' };
  };

  const getModalidadTexto = (id_modalidad: number) => {
    if (id_modalidad === 1) return '📍 Presencial';
    if (id_modalidad === 2) return '💻 Híbrida';
    return '🌐 En línea';
  };

  return (
    <section className={cardStyles.vacantes} id="vacantes">
      <div className={styles.wrapper}>

        {/* Barra de búsqueda y filtros */}
        <div className={styles.buscadorBar}>
          <div className={styles.inputWrap}>
            <span className={styles.inputIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar vacante por nombre, lugar o descripción..."
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
          {cargando ? 'Cargando vacantes...' : `${vacantesFiltradas.length} vacante${vacantesFiltradas.length !== 1 ? 's' : ''} encontrada${vacantesFiltradas.length !== 1 ? 's' : ''}`}
        </p>

        {/* Grid de vacantes */}
        <div className={cardStyles.vacantesGrid}>
          {cargando ? (
            <p style={{ color: '#6b7280', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              ⏳ Cargando vacantes...
            </p>
          ) : vacantesFiltradas.length === 0 ? (
            <p style={{ color: '#6b7280', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>
              No se encontraron vacantes con ese criterio.
            </p>
          ) : (
            vacantesFiltradas.map((v) => (
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
                    {v.requisitos && (
                      <div className={cardStyles.detailItem}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>{v.requisitos}</span>
                      </div>
                    )}
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
            ))
          )}
        </div>
      </div>
    </section>
  );
}