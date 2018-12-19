require('dotenv').config()
const express = require('express')
const path = require('path')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const ipRegex = require('ip-regex');
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

const app = next({ dev })
const handle = app.getRequestHandler()

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./i18n')
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

        server.use(geoBlocker)

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n))
        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

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
