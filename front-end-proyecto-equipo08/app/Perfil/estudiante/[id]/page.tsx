import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import styles from './perfil.module.css'
import {
  faUser,
  faIdCard,
  faEnvelope,
  faGraduationCap,
  faStar,
  faBookOpen,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  params: Promise<{ id: string }>
}

/** Genera las iniciales del nombre completo para el avatar */
function getInitials(nombre: string, apPaterno: string, apMaterno?: string): string {
  const parts = [nombre, apPaterno, apMaterno].filter(Boolean)
  return parts
    .slice(0, 2)
    .map((p) => p![0].toUpperCase())
    .join('')
}

/** Porcentaje de créditos (máx 400 para MAC en UNAM) */
function creditPct(creditos: number, max = 400): number {
  return Math.min(Math.round((creditos / max) * 100), 100)
}

export default async function Perfil_Estudiante({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: estudiante, error } = await supabase
    .from('estudiantes')
    .select('*')
    .eq('id_alumno', id)
    .single()

  if (error || !estudiante) notFound()

  const initials = getInitials(
    estudiante.nombre,
    estudiante.apellido_paterno,
    estudiante.apellido_materno,
  )
  const pct = creditPct(estudiante.creditos ?? 0)

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>

        {/* ── Hero card ── */}
        <div className={styles.heroCard}>
          <div className={styles.avatar} aria-hidden="true">
            {initials}
          </div>

          <div className={styles.heroInfo}>
            <h1 className={styles.nombre}>
              {estudiante.nombre}{' '}
              {estudiante.apellido_paterno}{' '}
              {estudiante.apellido_materno}
            </h1>
            <span className={styles.badge}>
              <FontAwesomeIcon icon={faGraduationCap} className={styles.badgeIcon} />
              Estudiante MAC · FES Acatlán
            </span>
          </div>
        </div>

        {/* ── Datos personales + académicos ── */}
        <div className={styles.grid}>

          {/* Identificación */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>
              <FontAwesomeIcon icon={faIdCard} className={styles.cardTitleIcon} />
              Identificación
            </p>

            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>
                <FontAwesomeIcon icon={faUser} className={styles.dataLabelIcon} />
                No. de cuenta
              </span>
              <span className={styles.dataValue}>{estudiante.numerocuenta}</span>
            </div>

            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.dataLabelIcon} />
                Correo
              </span>
              <span className={styles.dataValue}>{estudiante.email}</span>
            </div>
          </div>

          {/* Progreso académico */}
          <div className={styles.card}>
            <p className={styles.cardTitle}>
              <FontAwesomeIcon icon={faBookOpen} className={styles.cardTitleIcon} />
              Progreso académico
            </p>

            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>
                <FontAwesomeIcon icon={faGraduationCap} className={styles.dataLabelIcon} />
                Semestre
              </span>
              <span className={styles.dataValue}>{estudiante.semestre}°</span>
            </div>

            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>
                <FontAwesomeIcon icon={faStar} className={styles.dataLabelIcon} />
                Créditos
              </span>
              <span className={styles.dataValue}>{estudiante.creditos} / 100</span>
            </div>

            {/* Barra de progreso */}
           <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${pct}%` }} // <-- Corregido con comillas invertidas
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div> {/* <-- Corregido: cambiamos "/>" por "</div>" */}
            </div>
          </div>
            </div>
        </div>

        {/* ── Stat cards ── */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div className={styles.statNumber}>{estudiante.semestre}°</div>
            <div className={styles.statLabel}>Semestre actual</div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconGold}`}>
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className={styles.statNumber}>{pct}%</div>
            <div className={styles.statLabel}>Créditos completados</div>
          </div>
        </div>

      </div>
    </main>
  )
}