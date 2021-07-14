var axios = require('axios');
axios.defaults.headers.common['x-api-key'] = process.env.API_KEY;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default async function apiCall(req, res) {
  // res.setHeader('Content-type','application/json')

  if (req.method === 'POST'){
    console.log('req body post', req.body);
    try {
      const { data } = await axios.post('https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api', req.body)
      res.send(data);
    //     fetch("https://xo3o941k2f.execute-api.us-east-2.amazonaws.com/production/game15-api", {
    //     headers: {
    //       "x-api-key": process.env.API_KEY,
    //     },
    //     body: req.body,
    //   })

    //   .then(res => res.json())
    //   .then(data => {
    //     res.json(data)
    //   })
    } catch (er) {
      res.status(er.statusCode).end(JSON.stringify(er))
    }
  }
}