import Steps from "./Components/Steps/Steps";
import BuscadorVacantes from "./Components/CardVacante/BuscadorVacantes";
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Carousel from "./Components/Carousel/Carousel";
import VacantesDestacadas from "./Components/CardVacante/VacantesDestacadas"



export default function Home() {
  return (
    <>
      <Carousel/>
      <Hero />
      <main>
        <Steps />
      </main>
      <VacantesDestacadas/>
    </>
  );
}