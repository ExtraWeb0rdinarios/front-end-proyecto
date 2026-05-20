import Image from "next/image";
import Link from "next/link"
import styles from "./Hero.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faEnvelope, faUserAstronaut, faChevronDown } from '@fortawesome/free-solid-svg-icons'; 
import Vacantes from "@/app/Vacantes/page";

export default function Hero() { 
  return (
    <section className={`section ${styles.hero}`} id="home">
      <div className={`container ${styles.hero__container}`}>
        <div className={styles.hero__content}>
          <span className={styles.hero__greeting}>
            ¡Hola! Usuario 👋 
          </span>
          
          <h2 className={styles.hero__title}>
            Bienvenido a Enlace MAC
          </h2>
          

          <p className={styles.hero__description}>
            Cansado de no encontrar una opción para realizar tu servicio social que se ajuste a tus horarios, necesidades o gustos?, pues no esperes más porque en enlace MAC nos preocupamos por ti, asi que encontraras vacantes de servicio social de manera efectiva y en un mismo lugar, tendrás varias opciones para que elijas la que se acomode más a tus necesidades
          </p>
          

          <div className={styles.hero__buttons}>
            <Link href='/Vacantes'>
                <button className={styles.btn_primary}>
                <FontAwesomeIcon icon={faRocket} /> Ver Vacantes
                </button>
            </Link>
            <Link href='/Contacto'>
                <button className={styles.btn_secondary}>
                <FontAwesomeIcon icon={faEnvelope} /> Contactar
                </button>
            </Link>
            
          </div>
        </div>
        
        <div className={`${styles.hero__image} ${styles['hero__image--desktop']}`}>
          <div className={`${styles.hero__decoration} ${styles['hero__decoration--1']}`}></div>
          <div className={`${styles.hero__decoration} ${styles['hero__decoration--2']}`}></div>
          <div className={`${styles.hero__decoration} ${styles['hero__decoration--3']}`}></div>
        </div>
      </div>
    </section>
  )
}