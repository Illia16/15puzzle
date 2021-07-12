export default function apiCall(req, res) {
  if (req.method === 'GET'){
    try {
      fetch("***********",
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_GAME15_API_KEY,
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