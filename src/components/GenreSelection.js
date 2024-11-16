"use client";
import { useState } from "react";
import Image from "next/image";

export default function GenreSelection({ onSubmit }) {
  const genres = [
    { value: "salsa", label: "Salsa" },
    { value: "rock", label: "Rock" },
    { value: "pop", label: "Pop" },
    { value: "hiphop", label: "Hip-Hop" },
    { value: "jazz", label: "Jazz" },
    { value: "classical", label: "Classical" },
    { value: "electronic", label: "Electronic" },
    { value: "reggae", label: "Reggae" },
    { value: "country", label: "Country" },
    { value: "blues", label: "Blues" },
    { value: "metal", label: "Metal" },
    { value: "folk", label: "Folk" },
    { value: "rnb", label: "R&B" },
    { value: "latin", label: "Latin" },
    { value: "soul", label: "Soul" },
    { value: "punk", label: "Punk" },
    { value: "disco", label: "Disco" },
    { value: "funk", label: "Funk" },
  ];

  const genresPerPage = 6;
  const [selectedGenre, setSelectedGenre] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = Math.ceil(genres.length / genresPerPage);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSubmit = () => {
    if (selectedGenre) {
      onSubmit(selectedGenre);
    }
  };

  const handleNextPage = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePreviousPage = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  // Dividir los géneros en páginas de 6
  const currentGenres = genres.slice(
    pageIndex * genresPerPage,
    pageIndex * genresPerPage + genresPerPage
  );

  return (
    <div
      className="flex flex-col w-full items-center justify-between min-h-screen bg-cover bg-center p-2"
      style={{
        backgroundImage: "url('/images/FONDO_APP-MUSICA_02.png')",
      }}
    >
      {/* Título */}
      <div className="text-center mt-12">
        <p className="text-4xl font-bold text-orange-600 font-light">
          <span className="text-black">SELECCIONA</span>
        </p>
        <p className="text-4xl font-bold text-orange-600">UN GÉNERO</p>
      </div>

      <div className="flex flex-col items-center justify-between w-full">
        {/* Carrusel de Géneros con Flechas */}
        <div className="relative max-w-md w-full mb-5">
          {/* Flecha Izquierda */}
          <button
            onClick={handlePreviousPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full"
          >
            ◀
          </button>

          {/* Botones de Género */}
          <div className="grid grid-cols-2 px-10 gap-4">
            {currentGenres.map((genre) => (
              <button
                key={genre.value}
                onClick={() => handleGenreClick(genre.value)}
                className={`py-2 px-4 rounded-full font-bold shadow-md ${
                  selectedGenre === genre.value
                    ? "bg-orange-600 text-white"
                    : "bg-sky-800 text-white"
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>

          {/* Flecha Derecha */}
          <button
            onClick={handleNextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 rounded-full"
          >
            ▶
          </button>
        </div>

        {/* Botón "Siguiente" */}
        <button
          onClick={handleSubmit}
          className="bg-orange-600 text-white font-bold text-4xl py-3 px-8 rounded-full shadow-lg"
        >
          SIGUIENTE
        </button>

        {/* Logos */}
        <div className="flex items-center justify-between w-full mt-5">
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
