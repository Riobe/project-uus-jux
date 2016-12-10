'use strict';

const express = require('express'),
      app = express();

const bodyParser = require('body-parser');

let port = process.env.PORT || 3000,
    fs = require('fs');
    //html = fs.readFileSync('index.html');

var log = function(entry) {
    console.log(new Date().toISOString() + ' - ' + entry + '\n');
    //fs.appendFileSync('/tmp/project-uus-jux.log', new Date().toISOString() + ' - ' + entry + '\n');
};

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*app.get('/', (req, res) => {
    res.writeHead(200);
    res.write(html);
    res.end();
});*/

app.get('/', (req, res) => {
  res.render('index', { title: 'Uus Jux', message: 'Project Uus Jux home.' })
});

app.post('/', (req, res) => {
    log('Received message: ' + req.body);
    res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    res.end();
});

app.post('/scheduled', (req, res) => {
    log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
    res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    res.end();
});

app.listen(port, () => {
    console.log('Server running at port ' + port + '/');
});

