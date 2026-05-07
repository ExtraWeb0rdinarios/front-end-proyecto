'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import Styles from './Carousel.module.css'

interface Slide {
  id: number;
  imagen: string;
  link?: string;
  linktext?: string;
}

const slides: Slide[] = [
  { 
    id: 1, 
    imagen: "/imagenes/ibm.jpg",
    link: "https://careers.ibm.com/en_US/careers/JobDetail?jobId=108234", 
    linktext: "Empieza tu primer intership ahora! en conjunto con IBM"
  },
  { 
    id: 2, 
    imagen: "/imagenes/cedetec_01.jpg", 
    linktext: "¡El CEDETEC podria ser tu proxima gran historia!, ¡informate sobre su Servicio Social ahora!",
    link: "https://cedetec.acatlan.unam.mx/DSC/colabora"
  },
  { 
    id: 3, 
    imagen: "/imagenes/gokutablos.jpeg", 
    link: "https://www.youtube.com/watch?v=Inbg9Pcu7u8", 
    linktext: "ver esencia"
  },
  { 
    id: 4, 
    imagen: "/imagenes/fede.jpg",
    link: "#",
    linktext: "Conoce más"
  },
];

export default function Carousel() {
  return (
    <div className="w-full  max-w-full mx-full px-2 py-5 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        }}
        className={`${Styles.swiper} [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-button-next]:bg-black/50 [&_.swiper-button-prev]:bg-black/50 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:p-4 [&_.swiper-button-prev]:p-4 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-button-next]:hover:bg-black/70 [&_.swiper-button-prev]:hover:bg-black/70`}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a
              href={slide.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <div className="relative h-96 rounded-xl shadow-lg overflow-hidden group">
                {slide.imagen && (
                  <Image 
                    src={slide.imagen}
                    alt={slide.linktext || "Imagen sobre la vacante"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: '20% 25%' }}
                    priority={slide.id === 1}
                  />
                )}
                
                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                
                {/* Contenido */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 px-6 text-center">
                  {(slide.linktext || slide.link) && (
                    <button className="transform transition-all duration-300 hover:scale-105 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 border border-white/30">
                      {slide.linktext || "Ver más"} →
                    </button>
                  )}
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}