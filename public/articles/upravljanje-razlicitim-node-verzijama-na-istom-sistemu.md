U ovom članku ću vam u nekoliko rečenica objasniti kako možete da imate više `node` verzija instaliranih na istom sistemu.

Sigurno ćete doći u situaciju da radite na više projekata/modula i neki od njih će zahtevati različite verzije `node`-a.
Trenutno najpopularnije biblioteke za upravljanje sa instaliranim node verzijama su: [n][] i [nvm][] .

[n]: https://npmjs.org/package/n
[nvm]: https://github.com/creationix/nvm

[cutHere]

U ovom članku ćemo koristiti [n][] node modul a svakako vam preporučujem da posetite stranicu projekta [nvm][] i isprobate i njega takođe.

Instalacija se vrši uz pomoć `npm`-a:

```bash
$ [sudo] npm install -g n
```

Upotreba komande `n` je više nego jednostavna i ja ću navesti samo neke zanimljive kao npr:

```bash
$ sudo n stable # instalira najnoviju stabilnu verziju node-a

     install : 0.10.18
       mkdir : /usr/local/n/versions/0.10.18
       fetch : http://nodejs.org/dist/v0.10.18/node-v0.10.18-linux-x86.tar.gz
/usr/local/bin/node
   installed : v0.10.18
```

```bash
$ sudo n latest # instalira poslednju objavljenu node verziju

     install : 0.11.7
       mkdir : /usr/local/n/versions/0.11.7
       fetch : http://nodejs.org/dist/v0.11.7/node-v0.11.7-linux-x86.tar.gz
/usr/local/bin/node
   installed : v0.11.7
```

```bash
$ sudo n rm 0.11.7 # ukloniti zeljenu verziju sa sistema
```

Za trenutno aktivnu verziju `node`-a proverite:

```bash
$ node -v
v0.10.8
```

Za aktiviranje neke druge node verzije instalirane na sistemu:

```bash
$ n 0.11.7 # instalira i/ili aktivira verziju 0.11.7
```

Za svu dodatnu pomoć:

```bash
$ n --help
```

To bi bilo sve za upoznavanje sa ovom krajnje jednostavnom ali moćnom alatkom koja će vam pomoći da lako upravljate sa instaliranim verzijama `node`-a na vašem sistemu. Za detaljnije informacije molim vas posetite [stranicu][n] samog projekta.