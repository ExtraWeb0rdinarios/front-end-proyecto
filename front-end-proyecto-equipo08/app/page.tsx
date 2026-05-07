import Steps from "./Components/Steps/Steps";
import CardVacante from "./Components/CardVacante/CardVacante";
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Carousel from "./Components/Carousel/Carousel";

export default function Home() {
  return (
    <>
      <Carousel/>
      <Hero />
      <CardVacante />
      <main>
        <Steps />
      </main>
    </>
  );
}