export default function apiCall(req, res) {
  if (req.method === 'POST'){
    console.log('req body post', req.body);
    try {
        fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api", {
        headers: {
          "x-api-key": process.env.API_KEY,
        },
        body: req.body,
      })

      .then(res => res.json())
      .then(data => {
        res.json(data)
      })
    } catch (er) {
      console.error(er);
    }
  }
}