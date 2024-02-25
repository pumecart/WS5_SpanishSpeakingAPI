require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile (path.join(__dirname, './static/index.html'));
})

app.get('/auth', (req, res) =>{
  res.redirect(
    'https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}'
  );
})

app.get('/oauth-callback', ({ query: { code } }, res) => {
  const body= {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_server: process.env.GITHUB_SECRET,
      code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((res) => _res.data.access_token)
    .then((token) => {
      console.log('My token: ', token);
      res.redirect(`/?token=${token}`);
    })
    .catch((err)=> res.status(500).json({ err:err.message }))
});

// app.listen(8080);