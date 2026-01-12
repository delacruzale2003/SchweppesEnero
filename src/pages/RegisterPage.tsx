import React, { useState } from "react";
import { useRegistration } from "../hooks/useRegistration";
import { Loader2, X } from 'lucide-react';
import BackgroundCC from "../components/BackgroundCC";

const RegisterPage: React.FC = () => {
    const [showTermsModal, setShowTermsModal] = useState(true);

    const {
        loading,
        compressing,
        preview,
        compressedFile,
        message,
        name,
        dni,
        phoneNumber,
        storeId,
        setName,
        setDni,
        setPhoneNumber,
        handleFileChange,
        handleSubmit,
    } = useRegistration();

    const handleCloseModal = () => {
        setShowTermsModal(false);
    };

    if (!storeId) {
        return (
            <div className="p-8 text-center text-red-700 bg-red-100 min-h-screen flex items-center justify-center font-mont-bold border-none">
                Error: ID de tienda no encontrado en la URL. Asegúrate de escanear el QR correctamente.
            </div>
        );
    }

    const isFormValid = name.trim() !== '' && phoneNumber.trim() !== '' && dni.trim() !== '' && compressedFile;
    const isDisabled = loading || compressing || !isFormValid || showTermsModal;

    return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden border-none outline-none bg-transparent">
        
        {/* 1. Fondo (Z-0) */}
        <BackgroundCC />

        {/* 2. Capa de Contenido (Se blurrea SOLO esto cuando loading es true) */}
        <div className={`relative z-10 w-full flex flex-col items-center p-4 pb-28 transition-all duration-500 border-none ${loading ? 'blur-md pointer-events-none' : 'blur-0'}`}>
            
            {/* Logo de la Campaña - Ajustado tamaño responsive y márgenes */}
            <img
                src="/logoschfull.png"
                alt=""
                className="w-48 sm:w-60 h-auto my-6 sm:my-5"
            />

            {/* Contenedor del Formulario - Padding ajustado */}
            <form
                id="registrationForm"
                onSubmit={handleSubmit}
                className="bg-transparent border border-black border-3 rounded-4xl p-5 sm:p-6 pt-1 w-full max-w-md space-y-2 shadow-2xl mb-2"
            >
                <h1 className="text-lg sm:text-xl text-start text-black font-mont-bold">
                    1. REGISTRATE PARA PARTICIPAR
                </h1>
                
                {/* Ajuste solicitado: line-height más pegado (leading-tight) y letra un poco más chica */}
                <h2 className="text-start font-mont-bold text-black text-base sm:text-lg mb-3 leading-none">
                    Llena tus datos y participa por fabulosos premios
                </h2>

                {message && (
                    <p className="text-center text-xs sm:text-sm font-medium mt-2 p-2 bg-red-100 text-red-700 rounded-lg">{message}</p>
                )}

                <div className="">
                    <label className="block text-black text-sm sm:text-base font-medium font-mont-extrabold mt-2">Nombre completo</label>
                    <input
                        type="text"
                        name="name"
                        required
                        disabled={loading}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={45}
                        className="bg-transparent border-3 border-black p-2.5 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors pl-5 shadow-inner disabled:opacity-50"
                    />
                </div>

                <div className="">
                    <label className="block text-black text-sm sm:text-base font-medium font-mont-extrabold mt-2">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        value={dni}
                        disabled={loading}
                        onChange={(e) => setDni(e.target.value)}
                        maxLength={11}
                        required
                        className="bg-transparent border-3 border-black p-2.5 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors pl-5 shadow-inner disabled:opacity-50"
                    />
                </div>

                <div className="">
                    <label className="block text-black text-sm sm:text-base font-medium font-mont-extrabold mt-2">Número de teléfono</label>
                    <input
                        type="tel"
                        name="phone_number"
                        required
                        disabled={loading}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={9}
                        className="bg-transparent border-3 border-black p-2.5 sm:p-3 w-full rounded-full text-black text-sm sm:text-base placeholder-black/70 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors pl-5 shadow-inner disabled:opacity-50"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-black text-sm sm:text-base font-medium font-mont-extrabold mt-2">Comprobante / Foto</label>
                    <div className="mt-2">
                        <input
                            type="file"
                            id="photo-upload"
                            name="photo_url"
                            accept="image/*"
                            required
                            disabled={loading}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="photo-upload"
                            className={`cursor-pointer inline-flex font-mont-bold tracking-wide items-center justify-center w-full py-2 px-4 rounded-full border-2 border-black text-black text-sm sm:text-base font-semibold uppercase transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'}`}
                        >
                            Seleccionar foto
                        </label>
                    </div>

                    {preview && (
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 border rounded-xl overflow-hidden mx-auto mt-4 shadow-md">
                            <img src={preview} alt="preview" className="object-cover w-full h-full" />
                            {compressing && (
                                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                                    <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8 text-black" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </form>

            {/* BARRA FIJA INFERIOR (También se blurrea) */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-20 flex justify-center">
                <button
                    type="submit"
                    form="registrationForm"
                    disabled={isDisabled}
                    className="bg-black font-mont-bold rounded-full text-xl sm:text-2xl text-white p-2 w-40 sm:w-48 max-w-md shadow-xl flex items-center justify-center disabled:opacity-0"
                >
                    ENVIAR
                </button>
            </div>
        </div>

        {/* 3. Overlay de Carga (FUERA del div con blur, Z-index superior) */}
        {loading && (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/40 border-none outline-none">
                <div className="bg-black/10 p-6 sm:p-8 rounded-3xl flex flex-col items-center border-none">
                    <Loader2 className="animate-spin w-12 h-12 sm:w-16 sm:h-16 text-black mb-4" />
                    <p className="font-mont-bold text-lg sm:text-xl tracking-widest text-black animate-pulse">PROCESANDO...</p>
                </div>
            </div>
        )}

        {/* 2. 💡 COMPONENTE MODAL DE TÉRMINOS Y CONDICIONES */}
        {showTermsModal && (
            <div className="fixed inset-0 bg-red-500/10 backdrop-blur-lg flex items-center justify-center z-50 p-4">

                {/* Contenido del Modal */}
                <div className="bg-transparent text-black rounded-4xl p-5 sm:p-6 pt-4 w-full max-w-sm max-h-[80vh] flex flex-col relative shadow-2xl border-3 border-black">

                    {/* Botón de Cerrar (X) en la esquina */}
                    <button
                        onClick={handleCloseModal}
                        className="absolute top-3 right-3 text-black hover:text-gray-800 transition-colors"
                        aria-label="Cerrar términos y condiciones"
                    >
                        <X size={24} />
                    </button>

                    {/* Contenido Desplazable */}
                    <div className="flex-grow overflow-y-auto text-black text-[10px] sm:text-xs space-y-3 pb-4 pr-1 leading-snug">

                        <p className="font-mont-regular">
                            <strong className="font-mont-bold">Promoción válida del 05 de Enero al 05 de Febrero del 2026.</strong>
                            Mecanica:Participan personas naturales mayores de 18 años, con residencia legal y domicilio en el territorio nacional del Perú, que realicen la compra de <strong>Coca-Cola</strong> en las tiendas seleccionadas.
                            para participar de la promoción <strong>SCHWEPPES VERANO 2026 , deberás escanear el código QR ubicado en las
                            tiendas autorizadas, llenar los datos en el landing page, subir
                            la foto de tu boucher de compra de producto y podrás entrar
                            al sorteo por diferentes premios. El horario para ingresar a la
                            landing page sera de acuerdo a los horarios de activación en
                            cada tienda seleccionada .</strong>
                            <br /> <br />
                            <strong>Los premios son toallas , gorras , mugs ,  y
                            destapadores.
                            </strong>
                            <br />
                            Modalidad de entrega de premios: Los premios se entregarán
                            en al área de activación de la marca en la tienda a implementar , deberá mostrarse la pantalla de premio y el boucher de
                            compra al personal de activación para registrar y entregar el
                            premio .
                        </p>

                    </div>

                    {/* Botón de Continuar */}
                    <button
                        onClick={handleCloseModal}
                        className="bg-white font-mont-bold rounded-full text-base sm:text-lg text-black p-2 font-semibold hover:bg-black hover:text-white transition-colors shadow-lg"
                    >
                        CONTINUAR
                    </button>

                </div>
            </div>
        )}
    </div>
);
};

export default RegisterPage;