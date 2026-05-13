
import { createClient } from '@/lib/supabase/client';

interface VacanteProps{
id_vacante: number;
nombre: string;
fecha_publi: Date;
estado: boolean;
id_tipovacante: number;
horas: number;
id_modalidad: number;
tipo_horario: number;
id_encargado: number;
descripcion: string
}


const supabase = createClient();

const getVac = async (id: number): Promise<VacanteProps | null> => {
    
 try {
    const { data, error } = await supabase
      .from('vacantes')  
      .select('*')
      .eq('id_vacante', id)
      .single()  
      
    if (error) {
      throw new Error(error.message)
    }
    
    if (!data) {
      console.log(`❌ No se encontró la vacante con id ${id}`)
      return null
    }
    
    console.log("✅ Vacante recuperada:")
    console.log(`   - Título: ${data.nombre}`)
    console.log(`   - Descripción: ${data.descripcion.substring(0, 50)}...`)
    
    return data
    
  } catch (error) {
    console.error("❌ Fallo en getVac:", error)
    return null
  }
}


const runFetch= async () => {
await getVac(1);

}


export default async function Vacante(){
const vacante = await getVac(1)

return(<>Vacante {vacante?.id_vacante}
    {vacante?.nombre}</>);


}