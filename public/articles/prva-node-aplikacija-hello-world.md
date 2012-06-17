Najbolji način da započnete učenje novog programskog jezika je da napravite najjednostavniji program i isprobate ga kako radi.  
U ovom članku ću vam pokazati kako da napišete vašu prvu `Node.js` aplikaciju: `Hello World!`.  
Po tradiciji ove aplikacije, kôd je i više nego jednostavan.

Kopirajte sledeći kôd u fajl sa nazivom `hello-world.js`:

```javascript
[raw=hello-world.js]
var http = require('http');

var server = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World!');
});

server.listen(8888);

console.log('Server pokrenut na http://localhost:8888');
```

Otvorite terminal i pokrenite server sa `node` komandom:

```bash
$ node hello-world
Server pokrenut na http://localhost:8888
```

Konačno otvorite vaš browser i posetite http://localhost:8888 adresu.  
Kao i očekivano videćete čuvenu `Hello World!` rečenicu.

Sledi objašnjenje šta radi naš kôd.
[cutHere]

```javascript
var http = require('http');
```
Ova linija znači da učitavamo `http` modul koji ćemo koristiti u našoj aplikaciji.

```javascript
var server = http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello World!');
});
```
Kreiramo novi web server koji će kao odgovor na svaki zahtev slati `200` status kôd, jedan header `Content-Type` i zavšavati se sa sadržajem `Hello World!`. Instancu kreiranog servera čuvamo u promenljivoj `server`.

```javascript
server.listen(8888);
```
Pokrećemo naš server na portu `8888`.

```javascript
console.log('Server pokrenut na http://localhost:8888');
```
Prikazujemo u terminalu da smo uspešno pokrenuli server.


I to bi bila naša prva `Node.js` aplikacija :-)  
U ovom članku nismo previše analizirali naš kôd kao npr `request` objekat i tome slično, jer će to biti objašnjeno u sledećim naprednijim tutorijalima.
Predlažem vam da malo eksperimentišete sa kôdom kao da na primer promenite header `Content-Type` u `text/html`i `res.end()` metodi prosledite malo HTML sadržaja.