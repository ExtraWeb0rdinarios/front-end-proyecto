'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function postularse(id_vacante: number) {
  const supabase = await createClient()

  // 1. Obtener sesión activa — no necesitas pasar el id manualmente
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/Login') 
  const {data: usuario} = await supabase
    .from('usuarios')
    .select('id_estudiante,rol')
    .eq('auth_id',user.id)
    .single()

    if(usuario?.rol!=='estudiante'){
      console.log('Error solo los estudiantes se pueden postular a vancantes')
      return
    }

  const { data: yaPostulado } = await supabase
    .from ('postulaciones')
    .select('id_postulacion')
    .eq('id_alumno',usuario.id_estudiante)
    .eq('id_vacante',id_vacante)
    .single()

  if (yaPostulado) {
    console.log('Ya estás postulado a esta vacante')
    return
  }

  const { error } = await supabase
  .from ('postulaciones')
  .insert({
    id_alumno : usuario.id_estudiante,
    id_vacante : id_vacante,
    fecha_postulacion : new Date().toISOString().split('T')[0],
    estado_postulacion: 'Pendiente'
  })

  if (error) {
    console.log('Error al postularse:', error.message)
    return
  }


  redirect('/Postulaciones/')
}