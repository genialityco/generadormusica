"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function MusicForm({ prompt, genre }) {
  const [clipId, setClipId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(undefined);
  const [isGenerating, setIsGenerating] = useState(false);

  // Genera la canción automáticamente al montar el componente
  useEffect(() => {
    const generar = async () => {
      const params = new URLSearchParams();
      params.append("prompt", prompt);
      params.append("genre", genre);

      setAnalyzing(true);

      const baseURL = "/api/generator";
      const urlWithParams = `${baseURL}?${params.toString()}`;

      const res = await fetch(urlWithParams);
      const datos = await res.json();

      if (datos?.data.clip_ids) {
        setClipId(datos.data.clip_ids[0]);
      } else {
        setAnalyzing(false);
        setError("Error al generar la canción");
      }
    };

    generar();
  }, [prompt, genre]);

  useEffect(() => {
    if (clipId !== null && clipId !== undefined) {
      setIsGenerating(true);
      setAnalyzing(false);
      fetchData();
    }
  }, [clipId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/generatorstatus?clip_id=${clipId}`);
      const result = await response.json();

      if (audioUrl === null) {
        setAudioUrl(result);
      }

      if (!result || result.status !== "complete") {
        setTimeout(fetchData, 2000);
      } else {
        setIsGenerating(false);
      }
    } catch (err) {
      console.error("Error en fetchData:", err);
      setError("Error al obtener el estado de la generación");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-between justify-center min-h-screen bg-gray-100 p-8">
      {/* Logo */}
      <Image
        src="/images/LOGO_02.png"
        alt="Geniality Logo"
        width={200}
        height={40}
        className="mb-8"
      />

      {/* Mensaje de éxito */}
      <h1 className="text-2xl font-bold text-center text-orange-600">
        HAZ CREADO <span className="text-black">UNA CANCIÓN</span>
      </h1>

      {/* Mensaje de análisis o error */}
      {analyzing && (
        <p className="text-center text-gray-600 mb-4">Analizando canción...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {/* Reproductor de audio y animación de onda */}
      <div className="flex flex-col items-center mt-8">
        {!analyzing && audioUrl && (
          <div className="flex flex-col items-center">
            {/* Animación de ondas de audio, activada solo cuando el audio se está reproduciendo */}
            <div className="flex space-x-1 mb-4">
              <div
                className={`w-1 h-10 bg-orange-600 animate-pulse`}
                style={{ animationDuration: "0.6s" }}
              ></div>
              <div
                className={`w-1 h-10 bg-orange-600 animate-pulse`}
                style={{ animationDuration: "0.8s" }}
              ></div>
              <div
                className={`w-1 h-10 bg-orange-600 animate-pulse`}
                style={{ animationDuration: "0.5s" }}
              ></div>
              <div
                className={`w-1 h-10 bg-orange-600 animate-pulse`}
                style={{ animationDuration: "0.7s" }}
              ></div>
              <div
                className={`w-1 h-10 bg-orange-600 animate-pulse`}
                style={{ animationDuration: "0.6s" }}
              ></div>
            </div>
            {/* Reproductor de audio */}
            {audioUrl.audio_url && (
              <audio src={audioUrl?.audio_url} controls autoPlay />
            )}

            {/* Mensaje de generación en curso */}
            {isGenerating && (
              <p className="text-center text-gray-600 mt-2">
                Seguimos generando tu canción...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Botón de descarga */}
      {audioUrl && !isGenerating && (
        <a
          href={audioUrl}
          download
          className="mt-8 bg-orange-600 text-white font-bold py-2 px-8 rounded-full shadow-lg hover:bg-orange-700"
        >
          DESCARGAR
        </a>
      )}

      {/* Logo inferior */}
      <div className="mt-8">
        <Image
          src="/images/LOGO_04.png"
          alt="Geniality Logo"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
