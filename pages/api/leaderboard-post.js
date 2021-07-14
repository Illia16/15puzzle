var axios = require('axios');
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;

export default async function apiCall(req, res) {
  if (req.method === 'POST'){
    try {
      const { data } = await axios.post('https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api', req.body)
      res.send(data);
    } catch (er) {
      res.status(er.statusCode).end(JSON.stringify(er))
    }
  }
}