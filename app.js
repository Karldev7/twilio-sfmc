'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');
var url=require('url');

require('request').debug = true;

console.log('H02');

var app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.raw({type: 'application/jwt'}));
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

console.log('INFLOW START ------------------------------------------------------------------------------');

app.use((req, res, next) => {
  //console.log('%s', req);
  console.log('PORT: '+req.PORT);
  next();
 });

 console.log('INFLOW END ------------------------------------------------------------------------------');

 // HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );

// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );

//app.post('/journeybuilder/execute/', console.log('HERE99') );


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

  app.use((req, res, next) => {
    var pathname=url.parse(req.url).pathname;
    console.log('Pathname: '+pathname);
  /*
    switch(pathname){
        case '/routes/activity.js':
            res.end('activity');
        break;
        case '/public/js/customActivity.js':
            res.end('customActivity');
        break;
        case '/journeybuilder/save/':
            res.end('/journeybuilder/save/');
        break;
        default:
            res.end('default');
        break;
    }
*/    
      next();
   });
});

