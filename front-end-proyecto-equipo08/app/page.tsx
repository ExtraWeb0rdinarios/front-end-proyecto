import Steps from "./Components/Steps/Steps";
import CardVacante from "./Components/CardVacante/CardVacante";
import Header from './Components/Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <CardVacante />
      <main>
        <Steps />
      </main>
    </>
  );
}