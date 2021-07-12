export default async function apiCall(req, res) {
  if (req.method === 'GET'){
    try {
      await fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api",
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