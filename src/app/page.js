"use client"; // Add this line
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("Colombia 4.0 a generar innovación, con inteligencia artificial e inteligencia colombiana");
  const [message, setMessage] = useState("mensaje prueba asdf asdf asd f");
  const [genre, setGenre] = useState("rock");
  const [clip_id, setClip_id] = useState("d097ce99-9d9b-475f-b221-2e99b66b2521");
  const [result, setResult] = useState({});


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //{"clip_ids":["d097ce99-9d9b-475f-b221-2e99b66b2521","34fa91f9-dc5a-435b-9396-b6aefaa6eb68"]
  const generar = async () => {
    const params = new URLSearchParams();
    params.append('prompt', prompt);
    params.append('genre', genre);
   

    const baseURL = '/api/generator';
    const urlWithParams = `${baseURL}?${params.toString()}`;

    const res = await fetch(urlWithParams);
    const datos = await res.json();
    console.log("datax",datos,datos.data.clip_ids[0]);
    setClip_id(datos.data.clip_ids[0])
    setMessage(JSON.stringify(datos));
    fetchData();
  };

  const handleChange = (event) => {
    setGenre(event.target.value); // Update state with the selected value
};


  const fetchData = async () => {
      try {
        console.log('fetching data')
        setLoading(true);
          const response = await fetch('/api/generatorstatus?clip_id='+clip_id); // Replace with your API endpoint
          // if (!response.ok) {
          //     throw new Error('Network response was not ok');
          // }
          const result = await response.json();
          setData(result);
          
          // Check if the condition is met (adjust the condition as necessary)
          if (!result && result.status != "complete") {
           
              // If not complete, wait and fetch again
              setTimeout(fetchData, 2000); // Fetch again after 2 seconds
          } else {
              setLoading(false); // Data is complete, stop loading
              setData(result)
          }
      } catch (err) {
          setError(err.message);
          setLoading(false);
      }
  };



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <label>prompt </label>
        <textarea style={{border:"1px solid gray"}} value={prompt} id="prompt" onChange={e => setPrompt(e.target.value)}>Una canción para el corazón</textarea>

       


        <label>Select Music Genre:</label>
        <select value={genre} id="genre" name="genre" onChange={handleChange}>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="hiphop">Hip-Hop</option>
          <option value="jazz">Jazz</option>
          <option value="classical">Classical</option>
          <option value="electronic">Electronic</option>
          <option value="reggae">Reggae</option>
          <option value="country">Country</option>
          <option value="blues">Blues</option>
          <option value="metal">Metal</option>
          <option value="folk">Folk</option>
          <option value="rnb">R&B</option>
          <option value="latin">Latin</option>
          <option value="soul">Soul</option>
          <option value="punk">Punk</option>
          <option value="disco">Disco</option>
          <option value="funk">Funk</option>
        </select>


        {(loading) && <p>Generando...</p>}
        {(error) && <p>Error: {error}</p>}

        {data && <div>
          <p>{data?.audio_url}</p>
          {data?.audio_url && <audio  src={data?.audio_url} controls autoPlay/> }
            <h1>Data Fetched</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>}


        <label>Mensaje del servidor (para debug)</label>
        <textarea rows={4} cols={40}  value={message} readOnly />
          
   
        <button style={{ height: "50px", width: "200px", border: "1px solid blue" }} onClick={generar}> Generar </button>

        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>


      </main>

    </div>
  );
}
