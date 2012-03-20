

Ovo je najjednostavniji **server** u *Node.js*
    

    var http = require('http');

    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Hello World!');
      res.end();
    }).listen(8888);
