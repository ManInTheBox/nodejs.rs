U ovom članku ću vam objasniti kako da instalirate i pokrenete _Node.js_ jer će vam to biti neophodno za svaki budući tutorijal. Uz instalaciju `node`-a nedavno je uključen i [npm](http://npmjs.org/) - `node`-ov menadžer paketa.

Sam postupak instalacije je veoma jednostavan i neće vam oduzeti previše truda i vremena. Pratite sledeća uputstva:
[cutHere]

Pre svega, potrebno je da preuzmete najnoviju _stabilnu_ verziju `node`-a na sledećoj adresi: [http://nodejs.org/#download](http://nodejs.org/#download)

### Unix/Macintosh:

Nakon preuzimanje `node`-a naravno otpakujte arhivu i pozicionirajte se na direktorijum sa sadržajem iz arhive:

```bash
cd ./node-v0.8.0
```
Izvršite sledeće naredbe kako biste instalirali `node` (videti `README.md` fajl):

```bash
[raw=install.sh]
./configure
make
make install
```
I to je ceo postupak!  
Sam proces instalacije može potrajati nekoliko minuta, tako da - bez panike ;-)

Za pokretanje testova izvršite:

```bash
make test
```

Za `build`-ovanje dokumentacije:

```bash
make doc
```

Ukoliko imate problem sa instalacijom, molim vas da isti navedete u komentarima ispod. Dešava se (barem meni ranije) da nedostaju neke ključne biblioteke. Ukoliko ste na `Ubuntu`-u problem se uglavnom rešava u roku od jednog minuta sa `sudo apt-get install biblioteka`


### Windows:

Kao i obično na Windows-u je sve u par _next, next, next, finish_ :D  
Isti postupak primenite i za instalaciju `node`-a (dvoklik na instalacioni fajl i standardna rutina). Nakon toga pokrenite konzolu (`cmd.exe`) i `node` komanda će vam automatski biti dostupna.

Nakon instalacije (važi za sve operativne sisteme) pokrenite konzolu (shell) i otkucajte:

```bash
node -v
```

Ukoliko je sve ok trebali biste da vidite trenutnu verziju instaliranog `node`-a:

```
v0.8.0
```

Čestitamo!!!  
Sada imate instaliran `Node.js` i spremni ste da upoznate vaš novi omiljeni programski jezik :)