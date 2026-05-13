import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'


interface Props {
  params: Promise<{ id: string }>
}


export default async function Perfil_Estudiante({params}: Props){
    const { id } = await params
    const supabase = await createClient();

    const{data:estudiante , error } = await supabase
        .from('estudiantes')
        .select('*')
        .eq('id_alumno', id)
        .single()

    console.log('id alumno: ', id)
    if (error || !estudiante) notFound()


    return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">
        {estudiante.nombre} {estudiante.apellido_paterno} {estudiante.apellido_materno}
      </h1>
      <div className="mt-4 space-y-2 text-gray-700">
        <p><span className="font-medium">Número de cuenta:</span> {estudiante.numerocuenta}</p>
        <p><span className="font-medium">Email:</span> {estudiante.email}</p>
        <p><span className="font-medium">Semestre:</span> {estudiante.semestre}</p>
        <p><span className="font-medium">Créditos:</span> {estudiante.creditos}</p>
      </div>
    </div>
  );

}