"use client";
import { useState } from "react";
import IntroScreen from "../components/IntroScreen";
import MusicForm from "../components/MusicForm";
import IdeaInput from "../components/IdeaInput";
import GenreSelection from "../components/GenreSelection";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showIdeaInput, setShowIdeaInput] = useState(false);
  const [showGenreSelection, setShowGenreSelection] = useState(false);
  const [ideas, setIdeas] = useState("");
  const [genre, setGenre] = useState("");

  // Función para reiniciar el flujo a la pantalla de introducción
  const handleReset = () => {
    setShowForm(false);
    setShowIdeaInput(false);
    setShowGenreSelection(false);
  };

  // Muestra la pantalla de entrada de ideas después de la introducción
  const handleStart = () => {
    setShowIdeaInput(true);
  };

  // Guarda las ideas y avanza a la selección de género
  const handleIdeasSubmit = (inputIdeas) => {
    setIdeas(inputIdeas);
    setShowIdeaInput(false);
    setShowGenreSelection(true);
  };

  // Guarda el género seleccionado y avanza al formulario de música
  const handleGenreSubmit = (selectedGenre) => {
    setGenre(selectedGenre);
    setShowGenreSelection(false);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Pantalla inicial */}
      {!showForm && !showIdeaInput && !showGenreSelection && (
        <IntroScreen onStart={handleStart} />
      )}

      {/* Entrada de ideas */}
      {showIdeaInput && <IdeaInput onSubmit={handleIdeasSubmit} />}

      {/* Selección de género */}
      {showGenreSelection && <GenreSelection onSubmit={handleGenreSubmit} />}

      {/* Formulario de música */}
      {showForm && <MusicForm prompt={ideas} genre={genre} />}

      {/* Botón flotante para volver al IntroScreen */}
      <button
        onClick={handleReset}
        className="fixed top-0 left-0 bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-opacity duration-300 opacity-0"
      >
        Volver al Intro
      </button>
    </div>
  );
}
