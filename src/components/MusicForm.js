"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {QRCodeSVG} from 'qrcode.react';

var conito = 0;
export default function MusicForm({ prompt, genre }) {
  const [clipId, setClipId] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [analyzing, setAnalyzing] = useState(undefined);
  const [isGenerating, setIsGenerating] = useState(undefined);

  // Genera la canción automáticamente al montar el componente
  // con las variables genero y promt musical
  useEffect(() => {

        //solo ejecutamos si tenemos el prompt y el genero
        if (!prompt || !genre) return

    const generar = async () => {
      
      
      
      const params = new URLSearchParams();


      params.append("prompt", prompt);
      params.append("genre", genre);

  
      setAnalyzing(true);

      const baseURL = "/api/generator";
      const urlWithParams = `${baseURL}?${params.toString()}`;

      const res = await fetch(urlWithParams);
      const datos = await res.json();

      setAnalyzing(false);

      //Algún error con el API ABORTAR la generación
      if (datos?.data?.statusCode && datos?.data?.message) {
        setError("Error en la generación: " + datos?.data?.message);
        return;
      }

      if (datos?.data.clip_ids) {
        setClipId(datos.data.clip_ids[0]);
      }
    };
    generar();
  }, [prompt, genre]);

  //Cuando ya tenemos un clipId iniciamos el monitoreo
  useEffect(() => {
    if (!(clipId !== null && clipId !== undefined && !isGenerating)) return;

    const startUpdateGeneratorStatus = async () => {
      setIsGenerating(true);
      console.log(" porque se llama este fetch tantas veces??", clipId);
      const generatorStatus = await fetchGeneratorStatus();
    };
    startUpdateGeneratorStatus();
  }, [clipId]);

  //teniendo la primera respuesta del servidor monitoreamos la generación hasta que se haya completado
  useEffect(() => {
    if (audioUrl === null || audioUrl === undefined) return;

    console.log(" llamando audioURL state change", audioUrl?.status, audioUrl);

    //Algún error con el API ABORTAR la generación
    if (audioUrl?.statusCode && audioUrl?.message) {
      setError("Error en la generación: " + audioUrl?.message);
      setIsGenerating(false);
      return;
    }

    if (audioUrl.status !== "complete") {
      setTimeout(fetchGeneratorStatus, 3000);
      return;
    }
    //Completamos la generación
    setIsGenerating(false);
  }, [audioUrl]);

  const fetchGeneratorStatus = async () => {
    try {
      const response = await fetch(`/api/generatorstatus?clip_id=${clipId}`);
      const result = await response.json();
      setAudioUrl(result);
    } catch (err) {
      console.error("Error en fetchData:", err);
      setError("Error al obtener el estado de la generación");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-between justify-center min-h-screen bg-gray-100 p-8">
      {/* Logo */}
      <Image src="/images/LOGO_02.png" alt="Geniality Logo" width={200} height={40} className="mb-8" />

      {/* Mensaje de éxito */}
      <h1 className="text-2xl font-bold text-center text-orange-600">
        HAZ CREADO <span className="text-black">UNA CANCIÓN</span>
      </h1>

      {/* Mensaje de análisis o error */}
      {analyzing && <h2 className="text-center text-gray-600 mb-4">Analizando canción...</h2>}
      {isGenerating && (
        <>
          <h2 className="text-center text-gray-600 mb-4">Generando la canción...</h2>
          {/* Animación de ondas de audio, activada solo cuando el audio se está reproduciendo */}
          <div className="flex space-x-1 mb-4">
            <div className={`w-1 h-10 bg-orange-600 animate-pulse`} style={{ animationDuration: "0.6s" }}></div>
            <div className={`w-1 h-10 bg-orange-600 animate-pulse`} style={{ animationDuration: "0.8s" }}></div>
            <div className={`w-1 h-10 bg-orange-600 animate-pulse`} style={{ animationDuration: "0.5s" }}></div>
            <div className={`w-1 h-10 bg-orange-600 animate-pulse`} style={{ animationDuration: "0.7s" }}></div>
            <div className={`w-1 h-10 bg-orange-600 animate-pulse`} style={{ animationDuration: "0.6s" }}></div>
          </div>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {/* Reproductor de audio y animación de onda */}
      <div className="flex flex-col items-center mt-8">
        {audioUrl?.audio_url && (
          <div className="flex flex-col items-center">
            {/* Reproductor de audio */}
            <p>{audioUrl?.status}</p>
            {audioUrl?.audio_url && (audioUrl?.status == "streaming" || audioUrl?.status == "complete") &&  <audio src={audioUrl?.audio_url} controls autoPlay />}

            {/* Mensaje de generación en curso */}
            {audioUrl?.status == "streaming" && (
              <p className="text-center text-gray-600 mt-2">
                {" "}
                Puedes escuchar el Preview de la canción, mientras se termina la generación.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Botón de descarga */}
      {audioUrl && !isGenerating && (
        <div className="text-center">
          <h2> GENERACIÓN COMPLETA YA LA PUEDES DESCARGAR</h2>
          <br />

          <a
            href={audioUrl?.audio_url}
            download
            className="space-y-1 mt-8 bg-orange-600 text-white font-bold py-2 px-8 rounded-full shadow-lg hover:bg-orange-700"
          >
              
            DESCARGAR
          </a>

          <QRCodeSVG style={{margin:"20px auto"}} value={audioUrl?.audio_url} />
        </div>
      )}

      {/* Logo inferior */}
      <div className="mt-8">
        <Image src="/images/LOGO_04.png" alt="Geniality Logo" width={50} height={50} />
      </div>
    </div>
  );
}
