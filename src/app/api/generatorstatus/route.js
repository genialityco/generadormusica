export async function GET(request) {
  const { searchParams } = new URL(request.url); // Get the URL of the request
  const clip_id = searchParams.get("clip_id"); // Access the genre parameter
  const prompt =
    searchParams.get("prompt");
  
  const response = await fetch("https://api.aimlapi.com/v2/generate/audio/suno-ai/clip?status=streaming&clip_id="+clip_id, {
    method: "GET",
    headers: {
      Authorization: "Bearer 2b854ca0bcdc4b0eba0aa3f8b70f2a99",
      "Content-Type": "application/json",
    }
  });

  // Get the data from the response
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

// // pages/api/hello.js
// export default async function handler(req, res) {
//     const { genre, promt } = req.query;
//     res.status(200).json({ message: 'Hello from API'+ 'genre:'+genre+"promt: "+promt });

//     // const { clip_ids } = await fetch('https://api.aimlapi.com/v2/generate/audio/suno-ai/clip', {
//     //     method: 'POST',
//     //     headers: {
//     //       Authorization: 'Bearer my_key',
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({
//     //       prompt,
//     //       tags: 'pop rock electric',
//     //       title: 'Highway Cats',
//     //     }),
//     //   }).then((res) => res.json());

//   }
