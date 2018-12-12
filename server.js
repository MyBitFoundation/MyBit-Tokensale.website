const express = require('express')
const path = require('path')
const next = require('next')
const fetch = require('isomorphic-unfetch');

const dev = process.env.NODE_ENV !== 'production'
const Web3 = require('web3');
const ipRegex = require('ip-regex');
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/0e98ea17ef2947a6916df1c4e78fecd1'));

let contributions = [];
let timestampStartTokenSale = 0;
let loaded = false;
let currentDay = undefined;
let ethPrice = 0;
let gasPrice = 0;
let started = false;
let currentPeriodTotal = undefined;
let exchangeRate = undefined;

const app = next({ dev })
const handle = app.getRequestHandler()

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')
const core = require('./fetchContributionsServer');
let ips = {};

const resetLocalDb = function() {
  ips = {};
}

//resets every 24 hours
setInterval(resetLocalDb, 86400000);

const geoBlocker = function (req, res, next) {
  const isDashBoard = req.originalUrl.indexOf('/dashboard') !== -1 && req.originalUrl.indexOf('?allowed=false') === -1;

  if(!isDashBoard || ips[req.ip] === true){
    next();
  } else if(isDashBoard && ips[req.ip] === false) {
    app.render(req, res, '/dashboard', {
      allowed: false,
    })
  } else if(isDashBoard) {
      const details = geoip.lookup(req.ip);
      if(details && details.region && details.country === 'US'){
        ips[req.ip] = false
        app.render(req, res, '/dashboard', {
          allowed: false,
        })
      } else {
        ips[req.ip] = true;
        next();
      }
  } else {
    next();
  }
}


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

        server.enable('trust proxy')

        //server.use(geoBlocker)

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n))
        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

        server.get('/api/contributions', (req, res) => {
          if(!loaded){
            res.send({
              loaded: false,
            });
          }
          else {
            res.send({
              timestampStartTokenSale,
              contributions,
              loaded,
              currentDay,
              ethPrice,
              currentPeriodTotal,
              exchangeRate,
            });
          }
        });

        server.get('/api/home', (req, res) => {
          if(!loaded){
            res.send({
              loaded: false,
            });
          } else {
            res.send({
              timestampStartTokenSale,
              currentPeriodTotal,
              loaded,
              currentDayServer: currentDay,
              ethPrice,
              exchangeRate,
            });
          }
        });

        server.get('/api/gasprice', (req, res) => {
          res.send({
            gasPrice,
          })
        })

        // use next.js
        server.get('*', (req, res) => {
          handle(req, res)
        });

        server.listen(8080, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:8080')
        })
      })
  })


async function PullContributions(){
  try{
    timestampStartTokenSale = await core.getStartTimestamp(web3);
    started = timestampStartTokenSale <= Math.floor(Date.now() / 1000);
    if(started){
      currentDay = Math.floor(((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / 86400) + 1);

    } else {
      setTimeout(PullContributions, (timestampStartTokenSale * 1000 - Date.now()) + 5000);
    }
    contributions = await core.getAllContributionsPerDay(web3, currentDay, timestampStartTokenSale * 1000);

    currentPeriodTotal = contributions[currentDay ? currentDay - 1 : 0].total_eth;
    const percentageOwed = currentPeriodTotal > 0 ? (100 / (currentPeriodTotal + 1)) / 100 : 1;
    exchangeRate = 100000 * percentageOwed;

    loaded = contributions ? true : false;
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

//updates every 30 seconds
setInterval(() => {
  PullContributions();
}, 30000);

//updates every 10 mins
setInterval(() => {
  GetGasPrice();
  GetPrice();
}, 600000)
