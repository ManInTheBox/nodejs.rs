Kad sam počeo da razvijam Gambit.com izabrao sam socket.io pošto je to bila najpopularnija i možda i najbolja cross-browser WebSockets realtime biblioteka koja je podržavala sve što nam je bilo potrebno.
[cutHere]
Od samog početka smo imali mnogo problema sa socket.io od [memory](https://www.freeprintable.com/images/ram-leak.png) [leak](https://github.com/LearnBoost/socket.io/issues/1303#issuecomment-33107520)-a do raznoraznih bagova koje uopste nismo uspevali da reprodukujemo. Nova verzija socket.io-a je već godinu dana u razvoju i čisto sumljam da će se uopšte završiti, a stara nije updejtovana isto toliko tako da socket.io je odavno mrtav. 

Tragajući za alternativama naišao sam na [primus](https://github.com/primus/primus). 

Primus je abstrakcija urađena nad najpopularnijim realtime modulima, tako da ako vas jedna biblioteka zeza, možete da je zamenite sa drugom pomoću jedne linije koda. 

Biblioteke koje trenutno primus podržava:

* [Engine.io](https://github.com/LearnBoost/engine.io)
engine.io je low level transport funkcionalnost za socket.io. Podrzava vise vrsta transporta za pravljenje realtime konekcije

* [WebSockets - ws](https://github.com/einaros/ws)
čista WebSocket implementacija koja koristi ```ws``` WebScoket module koji je jedan od najbrzis ako ne i najbrzi WebSocket server implementacija pisanih u Node.js-u. Posto je ovo 
cista WebSocket implementacija nisu podrzani svi pretraživači

* [BrowserChannel](https://github.com/josephg/node-browserchannel)
tehnologija originalno razvijena za prvobitnu realtime komunikaciju u GMail-u. Ne koristi WebSockets i pravljena je da podrzava komunikaciju na istom domenu

* [SockJS](https://github.com/sockjs/sockjs-node)
Realtime sever koji podrzava cross domain konekcije, koristeći više vrsta transporta

* [Socket.io](http://socket.io)
jedan od prvih implementacija real time servera pisanih u Node.js-u i najviše korišćen modul. Koristi više transporta

Koji transport izabrati ? Mi smo se za sad odlučili za SockJS, pošto smo odmah eliminisali BrowserChannel i Socket.io pošto su to stare implementacija koje sa sobom nose dosta bugova. Čista WebSockets implementacija isto nije bila opcija pošto moramo da podržavamo i browsere koji ne podržavaju čistu WebSockets implementaciju. Tako da je bilo između SockJS i Engine.io i čitajuči iskustva drugih ljudi izabrao sam SockJS, sa idejom ako ne radi sve kako treba lako ću da pređem na engine.io

Sam prelaz sa socket.io-a na primus je bio bezbolan i lak, trebalo mi je nekoliko sati sve da prepišem i ispodešavam.

Prvo što sam uradio je instaliranje same primus biblioteke

```
npm install primus --save
```

Pošto primus ne dolazi automatski sa realtime bibliotekom bilo je potrebno i nju instalirati.

```
npm install sockjs --save
```

da bi primus funkcionisao potrebno mu je proslediti ```http/https```  server, u našem slučaju mi koristimo express.js pa je to izgledalo nešto ovako

```javascript
var express = require('express')
var app = express(); 
var server = require('http').createServer(app)

var Primus = require('primus')
var primus = new Primus(server, { 
      transformer: 'sockjs'
  });

server.listen(port);
```

Socket.io podržava automatski  stvari kao što su događaji, sobe i automatsko skaliranje, dok primus ne dolazi automatski sa tim mogućnostima. Srećom primus je napravljen sa divnim plugin interfejsom i već postoji veliki broj pluginova razvijenih od strane zajednice

Za podršku pravljenja soba i podršku događaja izabravo sam [primus-rooms](https://github.com/cayasso/primus-rooms) i [primus-emmiter](https://github.com/cayasso/primus-emitter)

```
npm install primus-rooms primus-emmiter --save
```

```javascript
var PrimusEmitter = require('primus-emitter');
var PrimusRooms = require('primus-rooms');
primus.use('rooms', PrimusRooms);
primus.use('emitter', PrimusEmitter);
```

ovo nam donosi mogućnost soba i događaja, primer kako to sve otprilike funkcioniše

```javascript
primus.on('connection', function(spark) {
    // pozvace dogadjaj vesti na klientu
    spark.send('vesti', 'Nova vest');
   
   // slusamo na korisikov dogadjaj i vracamo mu poruku
    spark.on('dohvatiPoruku', function(data) {
			dohvatiPoruku(id, function(poruka) {
                     spark.send('poruka', poruka);
             });
     });
    // na join ubacujemo korisnika u sobu
     spark.on('join',  function(room) {
            spark.join(room);
     });
     // na leave izbacujemo korisnika iz sobe
     spark.on('leave', function(room) {
        spark.leave(room);
      });
       // broadcastujemo da je korisnik usao u sobu
       primus.room('chat').except(spark.id).send('chat', 'novi korisnik..');
});

// saljemo update svima koji su u sobi vesti
primus.room('vesti').send('vesti', data);
```

Socket.io automatski podrzava skaliranje na vise server/procesa dovoljno je samo da mu prosledimo redis

```javascript
io.set('store', new RedisStore({
  redisPub : pub
, redisSub : sub
, redisClient : client
}));
```

Mi smo tu funkcionalnost smo postigli sa primus pluginom [primus-cluster](https://github.com/neoziro/primus-cluster) koji podržava već napomenute primus-emmiter i primus-rooms

```
npm install primus-cluster --save
```

```javascript
var redis = require('redis');
var createClient = function() {
	return redis.createClient(6379, 'localhost');
};
var PrimusCluster = require('primus-cluster');
var Primus = require('primus')
var primus = new Primus(server, { 
      transformer: 'sockjs',
      cluster: createClient
  });
primus.use('cluster', PrimusCluster);
```

Što se tiče autorizacije klienta, mi smo za socket.io delili redis session store i autorizaciju radili preko toga. U primusu to isto lepo radi plugin [primus-express-session](https://github.com/zeMirco/primus-express-session) 

```
npm install primus-express-session --save
```

```javascript
var ExpressStore = require('express-redis-store');
var PrimusExpressSession = require('primus-express-session');

var primus = new Primus(server, {
            transformer: 'sockjs',
            session: {
                secret: 'isti secret koji je u express-u naveden',
                store: ExpressStore
           }
});
   
 primus.use('session', PrimusExpressSession);  
```
  
  U produkciji je primus već više od 2 nedelje i za sad se pokazao kao odlična zamena za socket.io 

Ako imate neka pitanja slobodno pitajte u komentarima