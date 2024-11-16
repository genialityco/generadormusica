// IntroScreen.js
"use client";
import Image from "next/image";

export default function IntroScreen({ onStart }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/FONDO_EXPERIENCIA.mp4"
        autoPlay
        loop
        muted
      ></video>

      {/* Contenido */}
      <div className="fixed top-0 z-10 flex flex-col items-center justify-between  p-8 rounded-lg w-full text-white text-center">
        {/* Logo superior */}
        <div className="mb-4">
          <Image
            src="/images/LOGO_04.png"
            alt="Top Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Texto principal */}
        <div className="flex flex-col items-center text-center mb-8">
          <p className="text-5xl font-bold">EXPRESA</p>
          <p className="text-5xl">ESO QUE</p>
          <p className="text-5xl font-bold">SIENTES</p>
          <p className="text-5xl">EN UNA</p>
          <p className="text-5xl font-bold">CANCIÓN</p>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 flex flex-col items-center justify-between  p-8 rounded-lg w-full text-white text-center">
        {/* Botón */}
        <button
          className="bg-white text-orange-600 font-bold py-2 px-10 text-4xl rounded-full shadow-lg hover:bg-gray-100"
          onClick={onStart}
        >
          INICIAR
        </button>

        {/* Logo inferior */}
        <div className="mt-3">
          <Image
            src="/images/LOGOS-GEN_ASOBARES.png"
            alt="Bottom Logo"
            width={300}
            height={60}
          />
        </div>
      </div>
    </div>
  );
}
