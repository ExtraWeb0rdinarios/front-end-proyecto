import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import styles from './page.module.css';

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

const getVac = async (id: number): Promise<VacanteProps | null> => {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from('vacantes')
      .select('*')
      .eq('id_vacante', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error('❌ Fallo en getVac:', error);
    return null;
  }
};

const getModalidadTexto = (id: number) => {
  if (id === 1) return '📍 Presencial';
  if (id === 2) return '💻 Híbrida';
  return '🌐 En línea';
};

const getModalidadEstilo = (id: number) => {
  if (id === 1) return { background: '#dcfce7', color: '#15803d' };
  if (id === 2) return { background: '#fef3c7', color: '#92400e' };
  return { background: '#dbeafe', color: '#1d4ed8' };
};

export default async function Vacante({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vacante = await getVac(Number(id));

  if (!vacante) {
    return (
      <main style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>Vacante no encontrada</h1>
        <Link href="/Vacantes">← Regresar a vacantes</Link>
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>

      {/* Botón regresar */}
      <Link href="/Vacantes" className={styles.btnRegresar}>
        ← Regresar a vacantes
      </Link>

      {/* Header de la vacante */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.tipoBadge}>
            {vacante.id_tipovacante === 1 ? 'Adjuntía con Profesor' : 'Empresa Externa'}
          </span>
          {vacante.salario && (
            <span className={styles.salarioBadge}>
              💰 Con apoyo económico
            </span>
          )}
        </div>
        <h1 className={styles.titulo}>{vacante.nombre}</h1>
        <span
          className={styles.modalidadTag}
          style={getModalidadEstilo(vacante.id_modalidad)}
        >
          {getModalidadTexto(vacante.id_modalidad)}
        </span>
      </div>

      {/* Contenido */}
      <div className={styles.contenido}>

        {/* Descripción */}
        <div className={styles.seccion}>
          <h2 className={styles.seccionTitulo}>📋 Descripción</h2>
          <p className={styles.seccionTexto}>{vacante.descripcion}</p>
        </div>

        {/* Detalles */}
        <div className={styles.detallesGrid}>
          <div className={styles.detalleCard}>
            <span className={styles.detalleIcono}>⏰</span>
            <span className={styles.detalleLabel}>Horas requeridas</span>
            <span className={styles.detalleValor}>{vacante.horas} horas</span>
          </div>
          <div className={styles.detalleCard}>
            <span className={styles.detalleIcono}>🕐</span>
            <span className={styles.detalleLabel}>Horario</span>
            <span className={styles.detalleValor}>{vacante.tipo_horario}</span>
          </div>
          {vacante.ubicacion && (
            <div className={styles.detalleCard}>
              <span className={styles.detalleIcono}>📍</span>
              <span className={styles.detalleLabel}>Ubicación</span>
              <span className={styles.detalleValor}>{vacante.ubicacion}</span>
            </div>
          )}
          <div className={styles.detalleCard}>
            <span className={styles.detalleIcono}>📅</span>
            <span className={styles.detalleLabel}>Fecha de publicación</span>
            <span className={styles.detalleValor}>
              {new Date(vacante.fecha_publicacion).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Requisitos */}
        {vacante.requisitos && (
          <div className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>✅ Requisitos</h2>
            <p className={styles.seccionTexto}>{vacante.requisitos}</p>
          </div>
        )}

        {/* Botón postularse */}
        <div className={styles.accion}>
          <Link href="/Postulaciones" className={styles.btnPostular}>
            📩 Postularme a esta vacante
          </Link>
        </div>

      </div>
    </main>
  );
}