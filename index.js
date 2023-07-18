// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
  const date = Date.now()
  
  const resDate = new Date(date)

  const dateFormat = `${resDate.toUTCString()}`

  res.json({unix: date, utc: dateFormat})
})

app.get("/api/:date", (req, res) => {
  const reqDate = req.params.date
  let isNumber = !0;
  
  for(let character of reqDate) {
    if(parseInt(character) === NaN) {
      isNumber = !1
      break
    }
  }

  const date = isNumber ? parseInt(reqDate) : reqDate

  const resDate = new Date(date)

  const dateFormat = `${resDate.toUTCString()}`

  res.json(date ? {unix: date, utc: dateFormat} : {error: 'Invalid Date'})
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
