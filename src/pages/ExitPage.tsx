import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import BackgroundCC from '../components/BackgroundCC';

interface ExitState {
    prizeName: string;
    photoUrl: string;
}

const normalizePrizeName = (name: string | null): string | null => {
    if (!name || name === "¡Gracias por participar! Contacta a la tienda para más detalles.") {
        return null;
    }
    const safeName = name.toLowerCase().replace(/\s+/g, '_');
    return `/${safeName}.png`;
};

const ExitPage = () => {
    const location = useLocation();
    const state = location.state as ExitState | null;

    const [prizeName, setPrizeName] = useState<string | null>(null);
    const [prizeImageUrl, setPrizeImageUrl] = useState<string | null>(null);

    useEffect(() => {
        let finalPrizeName = null;
        let storedDataAvailable = false;

        if (state && state.prizeName) {
            finalPrizeName = state.prizeName;
            storedDataAvailable = true;
            localStorage.setItem("prizeName", state.prizeName);
            if (state.photoUrl) {
                localStorage.setItem("photoUrl", state.photoUrl); 
            } else {
                 localStorage.removeItem("photoUrl");
            }
        } else {
            const storedPrize = localStorage.getItem("prizeName");
            if (storedPrize) {
                finalPrizeName = storedPrize;
                storedDataAvailable = true;
            }
        }
        
        if (finalPrizeName && storedDataAvailable) {
            setPrizeName(finalPrizeName);
            setPrizeImageUrl(normalizePrizeName(finalPrizeName));
        } else {
            setPrizeName("¡Gracias por participar! Contacta a la tienda para más detalles.");
            setPrizeImageUrl(null);
        }
    }, [state]);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden  p-4 overscroll-y-none">
            
            {/* BACKGROUND IMAGE - backgroundcc */}
            <BackgroundCC />

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-4">
                
                {/* Logo Superior con Responsive Width */}
                <img
                    src="/spritelogo.png"
                    alt="Logo"
                    className="w-48 sm:w-60 h-auto mb-2" 
                />

                <div className="space-y-1">
                    <h1 className="text-4xl sm:text-5xl text-white font-semibold leading-tight">
                        <span className="block uppercase tracking-tighter font-mont-bold-italic">Felicidades</span>
                        <span className="block text-3xl sm:text-4xl opacity-90 font-mont-medium">HAS GANADO</span>
                    </h1>
                </div>

                {/* Bloque del Premio */}
                <div className="w-full px-2 py-2 flex flex-col items-center justify-center">
                    
                    {/* Contenedor de Imagen con altura máxima adaptable */}
                    <div className="w-full flex justify-center items-center min-h-[180px] sm:min-h-[224px]">
                        {prizeImageUrl ? (
                            <img 
                                src={prizeImageUrl} 
                                alt={`Premio: ${prizeName}`} 
                                className="max-h-48 sm:max-h-64 object-contain drop-shadow-2xl animate-bounce-slow" 
                            />
                        ) : (
                            <div className='flex items-center justify-center text-white/80 font-bold italic animate-pulse'>
                                Cargando premio...
                            </div>
                        )}
                    </div>

                    <p className="text-2xl sm:text-3xl font-mont-bold text-white mt-2 px-4 leading-tight w-80">
                        {prizeName} 
                    </p>
                    
                </div>
            </div>
        </div>
    );
};

export default ExitPage;