import React from 'react';

const BackgroundCC: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes subtleFlow {
            0% { background-position: 0% 0%; }
            50% { background-position: 10% 5%; }
            100% { background-position: 0% 0%; }
          }
          .animate-sunset-mesh {
            background-color: #ffcf2a; 
            background-image: 
              radial-gradient(at 0% 0%, #ffcf2a 0px, transparent 40%),   
              radial-gradient(at 100% 0%, #ffcf2a 0px, transparent 60%);
            
            background-size: 110% 110%;
            animation: subtleFlow 20s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Capa 1: Fondo Animado */}
      <div className="fixed inset-0 w-full h-full -z-20 animate-sunset-mesh" />

      {/* Capa 2: Imagen de Palmeras SOBREEXPUESTAS */}
      <div  
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/bgpalmerasch.png')",
          backgroundPosition: 'bottom center', 
          backgroundRepeat: 'no-repeat',
          backgroundSize: '120% auto', 
          
          /* CAMBIOS PARA SOBREEXPONER: */
          /* 'screen' mezcla la luz de la imagen con el fondo, ideal para efectos brillantes */
          mixBlendMode: 'screen', 
          /* Subimos la opacidad para que se note la sobreexposición */
          opacity: 0.4,
          /* Reforzamos el brillo de la palmera específicamente */
          filter: 'brightness(1.2) contrast(1.1)'
        }}
      />
    </>
  );
}

export default BackgroundCC;