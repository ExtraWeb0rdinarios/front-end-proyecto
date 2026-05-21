/*export default function Postulaciones(){
    return(<>Aqui van a ver muchas muchas postulaciones yo creo</>)
}*/
//AQUI ENLAZAMOS CON VACANTES, UNA VEZ Q SE RELACIONE CON LA BASE DE DATOS
import { createClient } from '@/lib/supabase/server';
import styles from './Postulaciones.module.css';
import Link from 'next/link';

interface Postulacion {
  id_postulacion: number;
  fecha_postulacion: string;
  estado_postulacion: string;
  vacantes:{
    id_vacante: number
    nombre: string
    horas: number
    tipo_horario: string
    id_modalidad: number
    ubicacion: string
  } | null
}
// AQUÍ SE OBTENDRÁN LAS POSTULACIONES DESDE SUPABASE (fetch a Supabase)---------------------------------------------------------------------------------
// algo asi: const { data } = await supabase
//   .from('postulaciones')
//   .select('*')
//   .eq('usuario_id', session.user.id)
// ─────────────────────────────────────────────

//iconos
type EstadoPostulacion = 'Pendiente' | 'Aceptada' | 'Rechazada' | 'En proceso'

const ESTADO_META: Record<EstadoPostulacion, { clase: string; icono: string }> = {
  Pendiente:    { clase: styles.badgeEnviada,   icono: '📤' },
  'En proceso': { clase: styles.badgeProceso,   icono: '⚙️' },
  Aceptada:     { clase: styles.badgeAceptada,  icono: '✅' },
  Rechazada:    { clase: styles.badgeRechazada, icono: '❌' },
}

function Badge({ estado }: { estado: EstadoPostulacion }) {
  const { clase, icono } = ESTADO_META[estado];
  return (
    <span className={`${styles.badge} ${clase}`}>
      <span className={styles.badgeIcon}>{icono}</span>
      {estado}
    </span>
  );
}
//card postulacion
function CardPostulacion({ post }: { post: Postulacion }) {
  function handleVerVacante() {
    // AQUÍ IRÁ LA REDIRECCIÓN A LA VACANTE
    // Ejemplo: router.push(`/Vacantes/${post.id}`)
    console.log('Redirigir a vacante:', post.id_postulacion);
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitulo}>{post.vacantes?.nombre}</h3>
          <p className={styles.cardInstitucion}>
            <span className={styles.iconSmall}>🏛️</span>
            {post.vacantes?.ubicacion}
          </p>
        </div>
        
      </div>

      <div className={styles.cardMeta}>
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>📅</span>
          Postulado el {post.fecha_postulacion}
        </span>
        <span className={styles.metaDivider} aria-hidden="true" />
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>🗂️</span>
          {post.vacantes?.id_modalidad}
        </span>
        <span className={styles.metaDivider} aria-hidden="true" />
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>⏱️</span>
          {post.vacantes?.horas}
        </span>
      </div>

      {/* AQUÍ SE AGREGARÁN LOS COMENTARIOS DE LA INSTITUCIÓN DESDE SUPABASE */}
      {/* Ejemplo: post.comentario && <p className={styles.comentario}>{post.comentario}</p> */}

      <div className={styles.cardFooter}>
        {/* AQUÍ IRÁ LA REDIRECCIÓN A LA VACANTE */}
        <Link href={`/Vacantes/${post.vacantes?.id_vacante}`} className={styles.btnVerVacante} >
          Ver vacante
          <span className={styles.btnArrow}>→</span>
        </Link>
      </div>
    </article>
  );
}

//principal
export default async function MisPostulaciones() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const {data: usuario} = await supabase 
    .from('usuarios')
    .select('id_estudiante')
    .eq('auth_id',user?.id)
    .single()

  const {data: postulacion} = await supabase
  .from('postulaciones')
  .select(`
    id_postulacion,
    fecha_postulacion,
    estado_postulacion,
    vacantes!fk_postulacion_vacante(
      id_vacante,
      nombre,
      horas,
      id_modalidad,
      tipo_horario,
      ubicacion
    )
  `)
  .eq('id_alumno', usuario?.id_estudiante)
  

  const postulaciones = (postulacion ?? []) as unknown as Postulacion[];

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mis Postulaciones</h1>
          <p className={styles.pageSubtitle}>
            Seguimiento de tus solicitudes de servicio social
          </p>
        </div>
        <span className={styles.countBadge}>
          {postulaciones.length} postulacion{postulaciones.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {postulaciones.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📭</span>
          <p className={styles.emptyTitle}>Aún no tienes postulaciones</p>
          <p className={styles.emptySub}>
            Explora las vacantes disponibles y postúlate a las que te interesen.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {postulaciones.map((post) => (
            <CardPostulacion key={post.id_postulacion} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
