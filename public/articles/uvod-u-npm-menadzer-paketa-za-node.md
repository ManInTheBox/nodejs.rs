Node.js se generalno sastoji od dve ključne grupe biblioteka:

 1. Built-in (node-core) - one koje dolaze uz samu instalaciju node-a (razvija ih node.js tim)
 2. Userland - one koje razvija node.js zajednica (bilo koji pojedinac ili grupa)

Razvojni tim node-a je odlučio da u sam `core` uključi samo one biblioteke koje su neophodne za veoma nizak (low-level) pristup hardveru i izradu osnovnih aplikacija/servera, a da sve ostalo prepusti zajednici (userland).  

**_Šta sad ovo znači???_**
[cutHere]

Kada instalirate `node` primetićete da i nema baš mnogo biblioteka (modula/fajlova). Zapravo sam `core` je veoma mali i kompletna [dokumentacija](http://nodejs.org/api/) se može pročitati za jedno popodne (ne morate to još uvek da radite, jer vam verovatno mnogo toga neće biti jasno :D ).  
Kao što sam gore naveo, osnovni node `core` će vam omogućiti npr pristup hardveru i kreiranje servera ali dalje od toga neće ići:

```javascript
[raw=server.js]
var http = require('http');
http.createServer(function (request, response) {
  response.end('Ovaj web server je kreirao Node.js');
}).listen(8888);

```

Postavlja se pitanje:  
_Šta sada da radim? Instaliarao sam node ali nisam dobio ni biblioteke za obradu slike, ni drajvere za bazu podataka, ni gomilu drugih stvari koje sam očekivao da ću dobiti..._

**Zajednica (userland) kao spas!!!**

Već ste shvatili da se uz instalaciju node-a ne dobija od igle do lokomotive i da će vam trebati još nešto sa strane...
Rešenje je i više nego jednostavno:  
Node.js zajednica svakodnevno objavljuje nove pakete (module) za node programe. U ovom trenutku ukupno ih ima: **12916!**  

nastavice se...