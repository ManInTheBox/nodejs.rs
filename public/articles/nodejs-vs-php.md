Da bismo naučili Node.js i znali kad je najbolje da ga koristimo potrebno je da saznamo sve prednosti i mane platforme. Pošto je PHP jedan od najpopularnijih serverskih jezika mi ćemo Node.js da poredimo sa njim. Ovo poređenje je kao da poredimo babe i žabe ali potrebno je da shvatite za šta je dobro koristiti Node.js, a za šta PHP. Za služenje web stranica pisanih u PHP je potreban webserver u najčešćem slučaju to je Apache. Dok Node.js već u sebi ima ugrađen web server. Tako da ćemo da poredimo PHP + Apache sa Node.js-om.
[cutHere]

### Prednosti PHP-a nad Node.js-om

PHP je dosta čitljiviji zato što je u Node.js-u lako doći do dubokog ugnježdavanja i to može mnogo da utiče na čitljivost koda. Ovo bi trebalo da se promeni uvođenjem nove reči `yield` u novoj verziji Node.js-a

```javascript
uradiNesto(val, function(greska, rezultat) {
    if ( greska ) {
        obradiGresku(greska);
        return ;
    }
    uradiNestoDrugo(rezultat, function() {
        uradiNestoTrece(function(rezultati) {
            objaviRezultate(rezultati);
        });
    });
});
```

U PHP-u postoji već dosta odličnih gotovih full stack framework-a i dovoljno je izabrati jedan koji nudi skoro sve opcije za vašu aplikaciju, dok u Node.js-u uglavnom se koriste gotove biblioteke i korisnik mora sam da odabere koji će template engine da koristi, koji ORM za bazu, kako da organizuje aplikaciju.. Tako da novije korisnike taj izbor lako može da zbuni i odbije.

Odlični gotovi CMS-ovi kao što su WordPress, Joomla, Drupal...

Hosting PHP aplikacija je mnogo lakši i lako je hostovati php aplikaciju na nekom jeftinom shared hostingu.

### Prednosti Node.js-a nad PHP-om

Jedna od najbitnijih razlika i ujedno i prednost Node.js-a nad PHP+Apache je da Node.js teži neblokirajućem i asinhronom načinu programiranja i u isto vreme može da obavlja više stvari odjednom, dok PHP+Apache funkcioniše putem zahteva i odgovora.

Node dominira nad PHPom što se tiče aplikacija koje zahtevaju rad u realnom vremenu (igrice, kolaborativni programi, aplikacije koje se non stop updejtuju, chat...). Zbog same asinhrone prirode JavaScripta i već gotovih postojećih biblioteka ([socket.io](http://socket.io/)) veoma je lako napraviti aplikaciju koja radi u realnom vremenu.

Node je samo JavaScript na serveru tako da to može da ima koristi kao što su:

* deljenje koda izmedju klienta i servera
* developeri koji već znaju klientski deo i JavaScript lako mogu da se preorijentišu dovoljno je samo da nauče API
* isti developer može lako da menja serverski i klijentski deo koda

Odličan modularni sistem i uz pomoć njega lako se implementiraju već gotovi moduli. ```npm``` već dolazi preinstaliran sa Node.js-om tako da predstavlja standardni upravljač paketima za Node.js aplikacije. Svi paketi se nalaze na sajtu https://npmjs.org i broj paketa svakim danom raste. Za PHP isto postoje upravljači paketima jedan od najpoznatijih je composer, ali oni toliko nisu populari i njih koriste samo napredniji korisnici.

Node.js aplikacije mogu da budu pokrenute duže vreme, dok PHP aplikacije nisu namenjene da budu pokrenute duže vreme nego odrade to što je potrebno i ugase se. Čak je i u samom jeziku napravljeno da se na određeni period ili do neke količine memorije samostalno ugasi. Zato je Node.js idealan za daemon aplikacije koje sede u pozadini i čekaju nešto da se desi.

### Odgovori na neke standardne situacije

* Pravite multiplayer igricu ? - Koristite Node.js
* Da li ste početnik ili želite samo da komšiji napravite sajt ? - Koristite PHP
* Želite da pokrećete paralelno više koda u isto vreme ? - Koristite Node.js
* Želite da ažurirate korisnikove informacije u realnom vremenu? - Koristite Node.js
* Pravite neku aplikaciju koju će klient da hostuje na deljenom hostingu ? - Koristite PHP
* Da li su vam performanse bitne ? - Koristite Node.js
* Pravite sajt za serviranje sadržaja ? - Koristite PHP

### Da li Node.js vredi učiti ?

Naravno da mislim tako pošto ga i sam koristim. Ako ne posedujete već znanje nekog serverskog jezika bolje je prvo da kreneš sa PHP-om da savladate neke osnove. Smatram da je PHP sjajan jezik za beživotne aplikacije koje funkcionisu putem zahteva -> odgovora. Ako želiš da pišeš aplikacije koje rade u realnom vremenu i updetuju se na svaku promenu pre bih se kladio na Node.js, pošto je to u PHP-u napraviti mnogo bolno i naporno, dok Node.js to čini dečijom igrom.

Node.js svakako nije savršen ali ništa vas ne košta da probate i sami odlučite da li je to platforma za Vas.