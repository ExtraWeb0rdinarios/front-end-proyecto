'use client';

import Link from 'next/link';
import styles from './not-found.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const frases = [
  "\"El éxito es la suma de pequeños esfuerzos repetidos día tras día.\" — R. Collier",
  "404 rutas exploradas. 0 páginas encontradas. ∞ vacantes esperándote 🚀",
  "Oops... esta página también busca su servicio social 😅",
  "Tu servicio social es el primer paso de tu historia profesional. ¡No te rindas!",
  "Cada gran profesionista alguna vez estuvo perdido. Tú ya vas por buen camino. 💪",
  "\"El camino al éxito y el camino al fracaso son casi exactamente el mismo.\" — Colin R. Davis",
  "No encontramos la página, pero sí encontramos tu futuro. 🎯",
  "Encuentra tu servicio social ideal en un solo lugar. Filtra por horario, modalidad e intereses y postúlate en minutos.",
  "Sabemos que encontrar el servicio social perfecto no es fácil. En Enlace MAC lo hacemos simple. 💙",
  "Tu servicio social, a tu manera. Explora vacantes que se adaptan a ti, no al revés. ✨",
  "Enlace MAC conecta a estudiantes de la FES Acatlán con las mejores oportunidades de servicio social.",
];

export default function NotFound() {
  const [contador, setContador] = useState(30);
  const [frase, setFrase] = useState('');
  const router = useRouter();

  useEffect(() => {
    const randomFrase = frases[Math.floor(Math.random() * frases.length)];
    setFrase(randomFrase);
  }, []);

  useEffect(() => {
    if (contador === 0) {
      router.push('/');
      return;
    }
    const timer = setTimeout(() => setContador(contador - 1), 1000);
    return () => clearTimeout(timer);
  }, [contador, router]);

  return (
    <main className={styles.wrapper}>

      {/* Número 404 animado */}
      <div className={styles.errorCode}>
        <span className={styles.cuatro}>4</span>
        <span className={styles.cero}>0</span>
        <span className={styles.cuatro2}>4</span>
      </div>

      {/* Icono */}
      <div className={styles.iconWrap}>
        🗂️
      </div>

      {/* Mensaje */}
      <h1 className={styles.titulo}>
        ¡Vacante no encontrada!
      </h1>
      <p className={styles.subtitulo}>
        Parece que esta página se fue a hacer su servicio social y no regresó.
        <br />
        No te preocupes, aún hay muchas oportunidades esperándote.
      </p>

      {/* Contador regresivo */}
      <p className={styles.contador}>
        Redirigiendo al inicio en <span className={styles.contadorNumero}>{contador}</span> segundos...
      </p>

      {/* Botones */}
      <div className={styles.botones}>
        <Link href="/" className={styles.btnPrimario}>
          🏠 Regresar al inicio
        </Link>
        <Link href="/Vacantes" className={styles.btnSecundario}>
          🔍 Ver vacantes
        </Link>
      </div>

      {/* Frase aleatoria */}
      <div className={styles.fraseWrap}>
        <p className={styles.frase}>{frase}</p>
      </div>

     

      {/* Ola decorativa */}
      <div className={styles.ola}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#1e3a5f"
            fillOpacity="0.08"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      {/* Decoración de fondo */}
      <div className={styles.circulo1} />
      <div className={styles.circulo2} />
      <div className={styles.circulo3} />

    </main>
  );
}