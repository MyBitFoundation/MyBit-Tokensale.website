const express = require('express')
const path = require('path')
const next = require('next')
const fetch = require('isomorphic-unfetch');

const dev = process.env.NODE_ENV !== 'production'
const Web3 = require('web3');

const web3 = new Web3();
web3.setProvider(new web3.providers.WebsocketProvider(`wss://enormously-singular-mustang.quiknode.io/f8ae3871-b3fb-4e7d-ba45-b6c9d220757f/snN_gx_F-oK6Ij27ihhzRw==/`));

let contributions = [];
let timestampStartTokenSale = 0;
let loaded = false;
let currentDay = 0;
let ethPrice = 0;
let gasPrice = 0;

const app = next({ dev })
const handle = app.getRequestHandler()

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')
const core = require('./fetchContributionsServer');

// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'cn'], // preload all langages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n))

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

        server.get('/api/contributions', (req, res) => {
          res.send({
            timestampStartTokenSale,
            contributions,
            loaded,
            currentDay,
            ethPrice,
          });
        });

        server.get('/api/gasprice', (req, res) => {
          res.send({
            gasPrice,
          })
        })

        // use next.js
        server.get('*', (req, res) => handle(req, res))

        server.listen(8080, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:8080')
        })
      })
  })


async function PullContributions(){
  try{
    timestampStartTokenSale = await core.getStartTimestamp(web3);
    currentDay = Math.floor(((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / 86400) + 1);
    contributions = await core.getAllContributionsPerDay(web3, currentDay);
    loaded = true;
  }catch(err){
    console.log(err);
  }
}

async function GetPrice(){
  try {
    const response = await fetch('https://api.coinmarketcap.com/v2/ticker/1027/');
    const jsonResponse = await response.json();
    const { price } = jsonResponse.data.quotes.USD;
    ethPrice = price;
  } catch (error) {
    console.log(error);
  }
}

async function GetGasPrice(){
  try {
    const response = await fetch('https://ethgasstation.info/json/ethgasAPI.json');
    const jsonResponse = await response.json();
    const { average } = jsonResponse;
    gasPrice = Number((average / 10).toFixed(2));
  } catch (error) {
      console.log(error);
  }
}

GetGasPrice();
GetPrice();
PullContributions();

setInterval(() => {
  GetGasPrice();
  GetPrice();
  PullContributions();
}, 60000);
