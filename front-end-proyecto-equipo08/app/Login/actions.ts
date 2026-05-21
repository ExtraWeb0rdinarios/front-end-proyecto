'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase/server'

export async function login(formData: FormData) {
  console.log('🚀 Login ejecutado')
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    console.log('❌ Error auth:', error.message)
    redirect('/Login?error=Credenciales incorrectas')
  }

  console.log('✅ Auth ok, user id:', data.user.id)

  const { data: usuario, error: e2 } = await supabase
    .from('usuarios')
    .select('rol, id_estudiante, id_encargado')
    .eq('auth_id', data.user.id)
    .single()

  console.log('👤 Usuario en tabla:', usuario)
  console.log('Error tabla:', e2?.message)

switch (usuario?.rol) {
  case 'estudiante': redirect(`/Perfil/estudiante/${usuario.id_estudiante}`)
  case 'profesor':   redirect('/Perfil/profesor')
  case 'empresa':    redirect('/Perfil/empresa')
  default:           redirect('/')
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/Login')
}