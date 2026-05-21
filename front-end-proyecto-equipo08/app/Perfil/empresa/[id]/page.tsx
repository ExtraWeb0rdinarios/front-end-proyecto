import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Perfil_Empresa({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: empresa, error } = await supabase
    .from('empresa')
    .select('*, encargados(nombre, email, tipo_encargado)')
    .eq('id_encargado', id)
    .single()

  if (error || !empresa) notFound()

  const encargado = empresa.encargados as {
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
        <p><span className="font-medium">RFC:</span> {empresa.rfc ?? 'No especificado'}</p>
        <p><span className="font-medium">Ubicación:</span> {empresa.ubicacion ?? 'No especificada'}</p>
      </div>
    </div>
  )
}