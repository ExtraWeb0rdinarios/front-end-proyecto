import { createClient } from '@supabase/supabase-js';


interface VacanteProps{
ID_vacante: number;
Nombre: string;
Fecha_publi: Date;
Estado: boolean;
ID_tipovacante: number;
Horas: number;
ID_modalidad: number;
Tipo_horario: number;
ID_encargado: number
}

async function getVac(id: string): Promise<VacanteProps> {
    
const SUPABASE_URL: string = "https://edowcwplnnnjpybtfcll.supabase.co";
const SUPABASE_KEY: string = "sb_publishable_JPTg658IAqNhWoEjwJTOXA_8GomTesc";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);



  const response = await fetch(
    `https://edowcwplnnnjpybtfcll.supabase.co/rest/v1/vacantes?id_vacante=eq.${id}`
  );

  if (!response.ok) {
    // Lanza un error -> Next.js mostrara error.tsx / not-found.tsx
    throw new Error(`No se pudo cargar el usuario ${id}`);
  }

  const data: VacanteProps = await response.json();
  return data;
}


export default function Vacante(){

}