Node.js je baziran na tome da uglavnom veći deo koda samo sedi u pozadini i čeka da se desi neki I/O (Ulaz/Izlaz), kao što su čekanje da se fajl upiše na disk ili da MySql upit vrati podatke. 

Kada zahtevamo da se otvori fajl, ne čekamo na rezulat nego kažemo kojoj funkciji da prosledimo podatke kad je citanje gotovo ili koji događaj da pozove, a izvršavanje drugog koda se nastavlja. 

Primer:
```javascript
   fs.readFile('data.txt', function(data) {
     console.log(data);
   });
   uradiNestoDrugo();
```

U našem primeru neće se čekati da se procita fajl, nego će se odmah pozvati funkcija ```uradiNestoDrugo();``` a kad se pročita pozvaće se anonimna funkcija(callback) koju smo prosledili.
[cutHere]

### Šta je callback ?

Asihrona priroda JavaScript-a i Noda dovodi do toga da stvari radimo drugačije, umesto da čekamo u mestu dok se neki događaj ne završi i vrati rezulat mi možemo da prosledimo funkciju(callback) koja će biti pozvana kad resurs bude spreman ili događaj završen. 

Jedan od najjednostavnijih primera je AJAX request.

```js
   $.get('tekstovi.html', function(tekstovi) {
	  console.log(tekstovi);
   });
```

```jQuery``` metodi ```get``` prosleđujemo adresu sa koje će dohvati tekstove i callback funkciju koja će biti pozvana kad ti testovi nama budu dostupni.

Meni je uvek lakše kad vidim primer, tako da evo jedan primer kako da implementirate sami vašu funkciju koja će da prihvata callback.


```javascript
   /* 
    * funkcija koja uzima putem AJAX-a tekst i 
    * menja sadržaj .text elementa
    * putem animacije fadeOut i fadeIn
    * parametri su idTeksta i callback funkciju 
    * koja se poziva na kraju
    */
    var prikaziTekst = function(idTeksta, callback) {
        $.ajax({
            url: '/api/tekstovi/' + idTeksta + '.html',
            success: function(tekst) {
              $('.tekst').fadeOut(300, function() {
                $(this).html(tekst).fadeIn(300, function() {
                    callback();
                 });
               });
		    }
        });
    }
    
    /*
     * mali primer kako bi tu funkciju mogli da iskoristimo
     * dodajemo click event na a element
     */
    $('.tekstovi a').on('click', function(e) {
        // uzimamo idTeksta iz a[data-id] attributa
        var idTeksta = $(this).data('id');
        prikaziTekst(idTeksta, function() {
            alert('novi tekst prikazan');
        });
    });
```

### Kako organizovati asihroni kod?

Zbog asihronog pristupa lako se može desiti da vaš kod postane zbunjujući. Na primer ako imate više asinhronih funkcija to može da izgleda ovako:

```javascript
    app.get('/proizvod/:id', function(req, res) {
        proizvod(req.params.id, function(proizvod) {
            autor(proizvod.id, function(autor){
                proizvodi({autorId: autor.id, limit: 5}, function(slicniProizvodi) {
                    komentari({proizvodId: proizvod.id}, function(komentari), function() {
                        res.render('proizvod', { 
                                      autor: autor, 
                                      proizvod: proizvod, 
                                      slicniProizvodi: slicniProizvodi, 
                                      komentari: komentari
                                    });
                    })
                });
            });
        });
    });
```

Primenom nekih od bibilioteka kao što su [async](https://github.com/caolan/async) i [Q](https://github.com/kriskowal/q) ili odvajanjem u manje celine možemo dovesti do toga da naš kod bude pregledan i čitak.

Ukoliko ste zainteresovani za više informacija kako da rešite ovaj problem sa ugnježdenim callback funkcijama, [Callback Hell](http://callbackhell.com/) je sjajan vodič koji će vam sigurno biti od koristi.