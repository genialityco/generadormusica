"use client";
import { useState } from "react";
import Image from "next/image";

export default function IdeaInput({ onSubmit }) {
  const [inputIdeas, setInputIdeas] = useState("");

  const handleInputChange = (event) => {
    setInputIdeas(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputIdeas);
  };

  return (
    <div
      className="flex flex-col w-full items-center justify-between min-h-screen bg-cover bg-center p-5"
      style={{
        backgroundImage: "url('/images/FONDO_APP-MUSICA_02.png')",
      }}
    >
      {/* Título */}
      <div className="text-center mt-8">
        <p className="text-3xl font-bold text-orange-600">
          ESCRIBE <span className="text-black font-light">ALGUNAS</span>
        </p>
        <p className="text-3xl font-bold text-orange-600">
          IDEAS <span className="text-black font-light">COMO</span> BASE
        </p>
        <p className="text-3xl font-bold text-orange-600">
          <span className="text-black font-light">DE LA</span> CANCIÓN
        </p>
      </div>

      <div className="flex flex-col items-center w-full">
        {/* Campo de texto */}
        <textarea
          placeholder="ESCRIBE AQUÍ TUS IDEAS..."
          value={inputIdeas}
          onChange={handleInputChange}
          className="w-full max-w-md h-32 p-4 border rounded-3xl shadow-md text-gray-700 bg-white focus:outline-none focus:border-orange-600"
        ></textarea>

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="bg-orange-600 text-white font-bold py-3 px-8 text-3xl rounded-full shadow-lg hover:bg-orange-700 mt-8"
        >
          SIGUIENTE
        </button>

        {/* Logos */}
        <div className="flex items-center justify-between w-full max-w-xs mt-8 mb-4">
          <div>
            <Image
              src="/images/LOGO_03.png"
              alt="GenLab Logo"
              width={80}
              height={20}
            />
          </div>
          <div>
            <Image
              src="/images/LOGO_04.png"
              alt="Geniality Logo"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
