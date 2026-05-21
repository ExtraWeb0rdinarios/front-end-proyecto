import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Perfil_Profesor({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profesor, error } = await supabase
    .from('profesor')
    .select('*, encargados(nombre, email, tipo_encargado)')
    .eq('id_encargado', id)
    .single()

  console.log('profesor data:', JSON.stringify(profesor))
  console.log('error:', JSON.stringify(error))
  if (error || !profesor) notFound()

  const encargado = profesor.encargados as {
    nombre: string
    email: string
    tipo_encargado: string
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{encargado.nombre}</h1>
      <div className="mt-4 space-y-2 text-gray-700">
        <p><span className="font-medium">Tipo:</span> {encargado.tipo_encargado}</p>
        <p><span className="font-medium">Email:</span> {encargado.email}</p>
        <p><span className="font-medium">Materia:</span> {profesor.materia ?? 'No especificada'}</p>
      </div>
    </div>
  )
}