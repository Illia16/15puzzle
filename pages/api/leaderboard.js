export default async function apiCall(req, res) {
  if (req.method === 'GET'){
    try {
      await fetch(process.env.API_URL,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          }
        }
      )
      .then(res => res.json())
      .then(data => {
        res.json(data)
      })
    } catch (er) {
      console.error(er);
    }
  } 
}