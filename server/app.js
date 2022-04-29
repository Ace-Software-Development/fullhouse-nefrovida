const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// Para enviar archivos HTML como respuesta desde express
const path = require('path');
const cookieParser = require('cookie-parser');
const parseServer = require('parse-server').ParseServer;


// Middlewares
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
// Para enviar estilos CSS de manera estática cuando un documento lo requiera
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

var databaseUri = process.env.DATABASE_URI;
if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.')
}

var api = new parseServer({
    databaseURI: databaseUri,
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL: process.env.SERVER_URL,
    appName: process.env.APP_NAME,
});

app.use('/parse', api);

//////////////////////
const parseDashboard = require('parse-dashboard');
const dashboard = new parseDashboard({
    "apps": [{
        "serverURL": process.env.SERVER_URL,
        "appId": process.env.APP_ID,
        "masterKey": process.env.MASTER_KEY,
        "appName": process.env.NAME
    }],
    "users": [{
        "user": "user",
        "pass": "pass"
    }]
}, { allowInsecureHTTP: false })
app.use('/dashboard', dashboard);
/////////////////////

// const parseDashboard = require('./parse/dashboard');
// app.use(parseDashboard.url, parseDashboard.dashboard);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Cross-Origin-Resource-Policy', 'same-site');
    res.header("Access-Control-Allow-Credentials", "true ");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    res.header('Cross-Origin-Embedder-Policy', 'credentialless');
    //res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline' *");
    res.header("Content-Security-Policy", "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");

    next();
});

app.use('/home', require('./routes/home'));

app.use('/paciente', require('./routes/pacienteRouter'))

app.get('*', function(request, response){
    response.status(404)
    html = "";
    html += '<html><head><meta charset="UTF-8"><title>Error</title></head>';
    html += "<body><h1>Dicha ruta no existe por favor prueba con otra.</h1><a href='http://localhost:6535/home'>Home</a><br><a href='http://localhost:6535/dashboard'>Parse Dashboard</a></body></html>";
    response.status(404);
    response.send(html);
})


// Start the server
// var httpServer = http.createServer(app);
const PORT = process.env.PORT;
console.log("Server running in port: ", PORT);
app.set("port", PORT);
// httpServer.listen(PORT);
app.listen(PORT);

module.exports = app;