var express = require('express')
var https = require('https')
var fs = require('fs')
// ssl
var key = fs.readFileSync('/etc/letsencrypt/live/bittwitter.rocks/privkey.pem');
var cert = fs.readFileSync('/etc/letsencrypt/live/bittwitter.rocks/fullchain.pem')

// graphql
const { root, client } = require('./resolvers.js')
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, graphql } = require('graphql');

var schemaString = fs.readFileSync('./bittwitter.graphql').toString()
var schema = buildSchema(schemaString);

//
app = express();
var bodyParser = require("body-parser")
app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true,
}));
app.use(express.static('/home/davidweisss/bittwitter/public/'))
app.get('/', (req, res)=>{res.sendFile('/home/davidweisss/bittwitter/public/App.html')})
//////////////////////////////////////////////
// http/https server
//////////////////////////////////////////////
var https_options = {
  key: key,
  cert: cert
};

var PORT = 443;
var HOST = '0.0.0.0';
server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);
