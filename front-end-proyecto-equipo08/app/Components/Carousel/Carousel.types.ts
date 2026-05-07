// types/carousel.types.ts
export interface SlideLayer {
  id: string;
  type: 'image' | 'text' | 'shape' | 'button';
  content: string;
  position: { x: number; y: number }; //   al slide
  size?: { width: number; height: number };
  
  // Animaciones estilo Revolution Slider
  animationIn: {
    type: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoom' | 'rotate';
    duration: number;    // en ms
    delay: number;       // en ms (stagger)
    fromY?: number;      // para slide vertical
    fromX?: number;      // para slide horizontal
    fromScale?: number;  // para zoom
    easing?: string;
  };
  
  // Movimiento continuo (loop infinito)
  continuousMotion?: {
    type: 'float' | 'pulse' | 'rotate' | 'shake';
    range: number;       // cuánto se mueve
    duration: number;    // duración del ciclo (ms)
    axis?: 'x' | 'y' | 'both';
  };
  
  zIndex?: number;
  className?: string;
}

export interface SlideData {
  id: number;
  layers: SlideLayer[];
  backgroundColor?: string;
  backgroundImage?: string;
}