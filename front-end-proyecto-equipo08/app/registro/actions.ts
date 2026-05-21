'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export async function registrarUsuario(formData: any) {
  console.log('🚀 Iniciando registro corregido...')
  const supabase = await createClient()
  const { correo, password, rol, datosPerfil } = formData

  const rolNormalizado = rol.trim().toLowerCase()

  let idEstudiante: number | null = null
  let idEncargado: number | null = null
  let authId: string | null = null

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: correo,
      password: password,
    })

    if (authError) {
      console.log('⚠️ El usuario ya existía en Auth. Recuperando ID existente...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: correo,
        password: password,
      })

      if (signInError) throw new Error(authError.message)
      authId = signInData.user?.id || null
    } else {
      authId = authData.user?.id || null
    }

    if (!authId) throw new Error("No se pudo obtener el ID de autenticación.")
    console.log('✅ Auth ID listo:', authId)

    const { data: usuarioExistente } = await supabase
      .from('usuarios')
      .select('id_usuario, id_estudiante, id_encargado')
      .eq('email', correo)
      .maybeSingle()

    if (usuarioExistente) {
      console.log('➡️ El perfil ya existía por completo en la tabla usuarios.')
      idEstudiante = usuarioExistente.id_estudiante
      idEncargado = usuarioExistente.id_encargado
    } else {

      if (rolNormalizado === 'estudiante') {
        const { data: cuentaExistente } = await supabase
          .from('estudiantes')
          .select('id_alumno')
          .eq('numerocuenta', Number(datosPerfil.numCuenta))
          .maybeSingle()

        if (cuentaExistente) {
          idEstudiante = cuentaExistente.id_alumno
        } else {
          const { data: estData, error: estError } = await supabase
            .from('estudiantes')
            .insert({
              nombre: datosPerfil.nombre,
              apellido_paterno: datosPerfil.apellidoPat,
              apellido_materno: datosPerfil.apellidoMat || null,
              fecha_nacimiento: datosPerfil.fechaNac,
              semestre: datosPerfil.semestre === 'Extensión de conocimientos' ? 9 : Number(datosPerfil.semestre),
              creditos: Number(datosPerfil.creditos),
              numerocuenta: Number(datosPerfil.numCuenta),
              email: correo
            })
            .select('id_alumno')
            .single()

          if (estError) throw new Error(`Error en tabla Estudiantes: ${estError.message}`)
          idEstudiante = estData.id_alumno
        }
      }

      else if (rolNormalizado === 'profesor') {
        console.log('🛒 Insertando en encargados para profesor...')
        const { data: encData, error: encError } = await supabase
          .from('encargados')
          .insert({
            tipo_encargado: 'profesor',
            email: correo,
            nombre: datosPerfil.profNombre
          })
          .select('id_encargado')
          .single()

        if (encError) throw new Error(`Error en encargados (Profesor): ${encError.message}`)
        idEncargado = encData.id_encargado

        console.log('👨‍🏫 Insertando en tabla profesor con id_encargado:', idEncargado)
        const { error: profError } = await supabase
          .from('profesor')
          .insert({
            id_encargado: idEncargado,
            materia: datosPerfil.materia
          })

        if (profError) throw new Error(`Error en tabla Profesor: ${profError.message}`)
      }

      else if (rolNormalizado === 'empresa') {
        console.log('🛒 Insertando en encargados para empresa...')
        const { data: encData, error: encError } = await supabase
          .from('encargados')
          .insert({
            tipo_encargado: 'empresa',
            email: correo,
            nombre: datosPerfil.empNombre
          })
          .select('id_encargado')
          .single()

        if (encError) throw new Error(`Error en encargados (Empresa): ${encError.message}`)
        idEncargado = encData.id_encargado

        console.log('🏢 Insertando en tabla empresa...')
        const { error: empError } = await supabase
          .from('empresa')
          .insert({
            id_encargado: idEncargado,
            rfc: datosPerfil.rfc,
            ubicacion: datosPerfil.ubicacion
          })

        if (empError) throw new Error(`Error en tabla Empresa: ${empError.message}`)
      }

      const { error: userTableError } = await supabase
        .from('usuarios')
        .insert({
          auth_id: authId,
          email: correo,
          rol: rolNormalizado,
          activo: true,
          id_estudiante: idEstudiante,
          id_encargado: idEncargado
        })

      if (userTableError) throw new Error(`Error en tabla usuarios: ${userTableError.message}`)
      console.log('👤 Perfil vinculado exitosamente.')
    }

  } catch (error: any) {
    console.log('❌ Error en el proceso:', error.message)
    return { success: false, message: error.message || 'Error en el servidor.' }
  }

  console.log('✈️ Redirigiendo...')
  if (rolNormalizado === 'estudiante') {
    redirect(`/Perfil/estudiante/${idEstudiante}`)
  } else if (rolNormalizado === 'profesor') {
    redirect(`/Perfil/profesor/${idEncargado}`)
  } else if (rolNormalizado === 'empresa') {
    redirect(`/Perfil/empresa/${idEncargado}`)
  } else {
    redirect('/')
  }
}