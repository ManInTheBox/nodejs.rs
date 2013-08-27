Markdown je alat za konverziju čistog (plain) teksta u HTML sadržaj.  Markdown ima sopstvenu sintaksu koja je veoma jednostavna za korišćenje. Prvenstveno je namenjen osobama koje pišu sadržaj vidljiv na Web-u i prema tome moraju da koriste HTML markup. Markdown je rešenje za pisanje čitkih, jednostavnih tekstualnih dokumenata koji se uz pomoć Markdown softvera konvertuju u validan HTML sadržaj. Dokumenti pisani Markdown sintaksom su veoma čitki pa se čak i ne moraju konvertovati u HTML ako ih čitate u običnom text editor-u. [John Gruber](http://daringfireball.net/), autor Markdown-a, inspiraciju za stvaranje Markdown-a je pronašao u jednostavnom formatu tekstualnih e-mail poruka.

U ovom članku će biti opisane mogućnosti i primene Markdown sintakse kroz mnoštvo primera. Nakon zvanične verzije Markdown-a http://daringfireball.net/projects/markdown/syntax, upoznaću vas sa [GFM][] unapređenim Markdown-om, kao i sa varijantom specifičnom za [_Node Srbija_](#node-srbija-markdown 'Node Srbija Markdown'), jer sve to možete koristiti na ovom sajtu.

[GFM]: http://github.github.com/github-flavored-markdown/ "GitHub Flavored Markdown"

[cutHere]

_Markdown pored svoje sintakse dozvoljava i upotrebu klasičnog HTML-a. Specijalni karakteri kao što su `>` i `&` će automatski biti _ escape-ovani. To znači da `4 < 5` jednostavno tako i napišete.  
_Napomena: upotreba HTML-a na ovom sajtu je blokirana iz bezbednosnih razloga._

### Pasusi (paragraphs)

Pasus je jednostavno skup rečenica opciono odvojenih novim redom.  
Da biste napravili novi red (`<br />`), rečenicu završite sa dva razmaka pre nego što pređete u novi red.

Ovo je primer pasus. Još jedna test rečenica u istom pasusu koja se završava sa dva razmaka pa novi red.  
Primetićete da je ovaj tekst u novom redu.

```
Ovo je primer pasus. Još jedna test rečenica u istom pasusu koja se završava sa dva razmaka pa novi red.  
Primetićete da je ovaj tekst u novom redu.
```

### Naslovi (headers)

Postoje dva načina da kreirate naslov (header).

1. Da podvučete tekst sa bilo kojim brojem znakova jednako (`=`) ukoliko želite **h1** tag, ili ukoliko želite **h2** tag sa znakovima povlaka (`-`).
2. Započnete rečenicu sa određenim brojem znakova taraba (`#`). Broj znakova je od 1 - 6 u zavisnosti od željenog taga **h1 - h6**.

a) Kod prvog načina broj karaktera kojim podvlačite tekst nije bitan:

Ovo je primer za h1
=============
```

Ovo je primer za h1
=============
```

Ovo je primer za h2
----

```
Ovo je primer za h2
----
```

b) Kod drugog načina rečenicu možete opciono i završiti sa tarabama (ne mora da se podudara sa brojem započetih taraba). Ovo je više u estetske svrhe kada se dokument čita u text editor-u.

# Ovo je h1
## Ovo je h2
### Ovo je h3
#### Ovo je h4
##### Ovo je h5
###### Ovo je h6

```
# Ovo je h1
## Ovo je h2
### Ovo je h3
#### Ovo je h4
##### Ovo je h5
###### Ovo je h6
```

### Citati (blockquotes)

Markdown koristi isti princip za citat kao e-mail poruke. Započnite rečenicu sa znakom veće (`>`):

> Ovo je čuveni citat.
> Lepo izgleda.
> Baš je čitljiv ovaj Markdown...

```
> Ovo je čuveni citat.
> Lepo izgleda.
> Baš je čitljiv ovaj Markdown...
```

Markdown ne zahteva da svaki red započne sa znakom `>`, već je potrebno da barem prvi red započnete sa `>`. Citati mogu sadržati i druge elemente (tagove) uključujući i sam citat:

> Ovde je započet citat.  
`console.log()` ili `alert()`?
_Pa naravno `console.log()` osim ako nemate sreće pa naletite na **IE** :-D_
> > Čuveni mislilac

```
> Ovde je započet citat.  
`console.log()` ili `alert()`?
_Pa naravno `console.log()` osim ako nemate sreće pa naletite na **IE** :-D_
> > Čuveni mislilac
```

### Liste

Markdown podržava uređene (ordered) i neuređene (unordered) liste.

Za unordered liste možete koristiti karaktere zvezdica (`*`), povlaka (`-`) ili plus (`+`):

- Ovo je list item1 u unordered listi
- Ovo je list item2 u unordered listi
- Ovo je list item3 u unordered listi

```
- Ovo je list item1 u unordered listi
- Ovo je list item2 u unordered listi
- Ovo je list item3 u unordered listi
```

Za ordered liste potrebno je da linija započne sa brojem pa tačkom (`.`):

1. Ovo je list item1 u ordered listi
2. Ovo je list item2 u ordered listi
3. Ovo je list item3 u ordered listi

```
1. Ovo je list item1 u ordered listi
2. Ovo je list item2 u ordered listi
3. Ovo je list item3 u ordered listi
```

Bitno je napomenuti da redosled brojeva koje navodite ne utiče na redosled u generisanom HTML-u. To znači da sledeći primer daje isti rezultat kao i prethodni:

1. Ovo je list item1 u ordered listi
8. Ovo je list item2 u ordered listi
3. Ovo je list item3 u ordered listi

```
1. Ovo je list item1 u ordered listi
8. Ovo je list item2 u ordered listi
3. Ovo je list item3 u ordered listi
```

Za obe vrste listi neophodno je da stavite jedan ili više razmaka ili tab nakon markera liste:

```
-Ovo ne radi jer nema razmak posle povlake
1.Nije dobro jer nema razmak posle tačke.
```

Svaki list item može sadržati pasuse, citate i druge elemente s' tim što je neophodno uvući tekst za 4 razmaka ili jednim tabom ukoliko ne želite da tekst bude obuhvaćen sa `p` tagom:

+  Ovo je list item1
+  Ovde imamo jedan red u `<li>`.
+  Ovo je prvi pasus.
    
    Ovo je drugi pasus.
`Nije neophodno uvući svaki red.`  
Dovoljno je samo prvi.

    > Lepše je uvući svaki red.
    > Tako će biti čitkiji dokument
    > ukoliko ga čitamo u text editor-u.

```
+  Ovo je list item1
+  Ovde imamo jedan red u `<li>`.
+  Ovo je prvi pasus.
    
    Ovo je drugi pasus.
`Nije neophodno uvući svaki red.`  
Dovoljno je samo prvi.

    > Lepše je uvući svaki red.
    > Tako će biti čitkiji dokument
    > ukoliko ga čitamo u text editor-u.
```

### Višeredni kôd

Kada želite da prikažete primere kôda uglavnom ćete koristiti ovaj element. Da biste kreirali višeredni kôd potrebno je da sve linije koje će se nalaziti u ovom bloku uvučete za 4 razmaka ili sa jednim tabom:

    var magija = function (v) {
      return v.toUpperCase();
    };
    console.log(magija('da li je ovo cool?'));
    // DA LI JE OVO COOL?

```
    var magija = function (v) {
      return v.toUpperCase();
    };
    console.log(magija('da li je ovo cool?'));
    // DA LI JE OVO COOL?
```

Markdown će vaše razmake (ili tab) automatski ukloniti, tako da će rezultat biti identičan kao u pregledu. Specijalni karakteri `&`, `<` i `>` će automatski biti konvertovani u njihove ekvivalentne HTML entitete, dok karakteri koji se koriste u samoj Markdown sintaksi neće biti konvertovani.

### Horizontalne linije (hr)

Za `hr` tag potrebno je da u jednoj liniji napišete 3 ili više karaktera povlaka (`-`), zvezdica (`*`) ili donja crta (`_`). Moguće je stavljati razmake između ovih karaktera:

* * *

***

-------

________


```
* * *

***

-------

________

```

### Linkovi

U Markdown-u postoje dve vrste linkova: `inline` i `referentni`.

a) Za `inline` link potrebno je da tekst linka obuhvatite uglastim zagradama (`[ ]`) i odmah nakon toga upišete link koji obuhvatite običnim zagradama (`( )`). Najbolje jedan primer:

[Propusti u najboljem programskom jeziku](http://wtfjs.com/)

```nohighlight
[Propusti u najboljem programskom jeziku](http://wtfjs.com/)
```

Link može imati i `title` atribut koji će se generisati ako u paru običnih zagrada upišete link, pa jedan razmak pa sam `title` obuhvaćen navodnicima:

[Genijalan lik](https://github.com/substack "Obavezno pogledajte projekte!")

```nohighlight
[Genijalan lik](https://github.com/substack "Obavezno pogledajte projekte!")
```

`title` možete obuhvatiti sa dvostrukim ili jednostrukim navodnicima. Možete koristiti i relativne linkove:

[Ja ovde učim Node](/post 'Node je mnogo gotivan')

```
[Ja ovde učim Node](/post 'Node je mnogo gotivan')
```

b) `Referentni` linkovi se sastoje od teksta linka obuhvaćenim uglastim zagradama, opciono razmakom i na kraju identifikator linka obuhvaćen uglastim zagradama. Nakon ovoga je potrebno definisati sam link bilo gde u dokumentu (preporuka je odmah nakon završenog pasusa).

[ja sam referentni link ka Google][google]
[google]: http://www.google.com "Opcioni title pod dvostrukim navodnicima"

```nohighlight
[ja sam referentni link ka Google][google]
[google]: http://www.google.com "Opcioni title pod dvostrukim navodnicima"
```

S' obzirom da je potrebno samo jednom definisati identifikator referentnog linka (bilo gde u dokumentu) dobija se mogućnost da isti link vrlo lako iskoristite više puta:

> Sećate se našeg sajta [Google][] od malopre? Zapamtite identifikator ne
prepoznaje velika i mala slova u svom nazivu i moguće je referencirati ga iz 
samog teksta linka (čak iako sadrži razmake)!

```nohighlight
> Sećate se našeg sajta [Google][] od malopre? Zapamtite identifikator ne
prepoznaje velika i mala slova u svom nazivu i moguće je referencirati ga iz 
samog teksta linka (čak iako sadrži razmake)!
```
 
### Naglašeni tekst

Ukoliko želite da naglasite tekst sa tagovima `<em>` ili `<strong>` jednostavno obuhvatite tekst sa zvezdicom (`*`) ili donjom crtom (`_`):

Za _zakošeni tekst_ koristite jedan karakter `*` ili `_`.
Za **podebljani tekst** koristite dva karaktera `**` ili `__`.

```
Za _zakošeni tekst_ koristite jedan karakter `*` ili `_`.
Za **podebljani tekst** koristite dva karaktera `**` ili `__`.
```

### Jednoredni kôd

Za jednoredni kôd ili inline (ugnježdeni) kôd dovoljno je da obuhvatite tekst sa backtick operatorom: `` ` ``.

Da li koristite alias `ll` na vašem `UNIX` sistemu?  
Jednostavno definišite novi alias u vašem npr. `~/.bashrc` fajlu: `alias ll='ls -alF'`.

```
Da li koristite alias `ll` na vašem `UNIX` sistemu?  
Jednostavno definišite novi alias u vašem npr. `~/.bashrc` fajlu: `alias ll='ls -alF'`.
```

### Slike

Umetanje slika u Markdown sintaksi je veoma slično kao definisanje linkova: inline ili referentni:

![ovo je alt tekst slike](http://emberjs.com/images/about/ember-productivity-sm.png 'Ko je rekao da ember nije strava? :P')

```nohighlight
![ovo je alt tekst slike](http://emberjs.com/images/about/ember-productivity-sm.png 'Ko je rekao da ember nije strava? :P')
```

Svakako sliku možete obuhvatiti linkom i izostaviti opcioni title. Referentne slike funkcionisu isto kao i referentni linkovi.

### Ostale osobine standardnog Markdown-a

Standardni Markdown može automatski da prepozna linkove ukoliko ih vi eksplicitno ne definišete:

http://howtonode.org/ <stankovic.zarko@gmail.com>

```
http://howtonode.org/ <stankovic.zarko@gmail.com>
```

Ukoliko želite da prikažete neki od specijalnih karaktera morate da ih escape-ujete:

Prikazujem \*zvezdice\*.

```
Prikazujem \*zvezdice\*.
```

Sledeći niz karaktera moguće je escape-ovati u Markdown-u:

- \   backslash
- `   backtick
- \*   zvezdica
- _   donja crta
- {}  vitičaste zagrade
- []  uglaste zagrade
- ()  zagrade
- \#   taraba
- \+   plus
- \-   minus (povlaka)
- .   tačka
- !   uzvičnik

### GFM - GitHub Flavored Markdown

_Node Srbija_ takođe podržava [GFM](http://github.github.com/github-flavored-markdown/). Jedna od zanimljivih osobina GFM-a je mogućnost da definišete višeredni blok koda bez uvlačenja od 4 karaktera već sintaksom u sledećem primeru:

```
console.log('ovo je GFM način prikazivanja blokova koda!');
```

    ```
    console.log('ovo je GFM način prikazivanja blokova koda!');
    ```

Iako je uključeno automatsko prepoznavanje, možete eksplicitno navesti programski jezik za isticanje koda!

```javascript
console.log('ovo je GFM način prikazivanja blokova koda!');
```

    ```javascript
    console.log('ovo je GFM način prikazivanja blokova koda!');
    ```

### Node Srbija Markdown

_Node Srbija_ nasleđuje Markdown i GFM i dodaje neke svoje specifične osobine.

* __Onemogućavanje automatskog isticanja koda__

Kao što je već navedeno, svaki put kada kreirate blok koda, parser će pokušati da detektuje programski jezik (tj tekst koda) i da izvrši isticanje koda. Ukoliko iz nekog razloga vi to ne želite, kao željeni programski jezik navedite `nohighlight`:

```nohighlight
$(function() {
  // upozorenje: u ovom primeru ipak cete videti syntax highlight
  // za ovaj snippet jer nije moguce spreciti ga dok se demonstrira :)
  $('div').on('click', function () {
    console.log($(this).text());
  });
});
```

    ```nohighlight
    $(function() {
      // upozorenje: u ovom primeru ipak cete videti syntax highlight
      // za ovaj snippet jer nije moguce spreciti ga dok se demonstrira :)
      $('div').on('click', function () {
        console.log($(this).text());
      });
    });
    ```

* __Delovi _sirovog_ koda__

Ukoliko želite da vašim čitaocima pružite kompletne primere koda (preporuka svakako) te da oni mogu vrlo lako da kopiraju delove koda i iskoriste ih u svojim projektima, koristite ovu opciju. Potrebno je definisati ime za vaš fajl i sistem će automatski generisati link ka vašem _komadu sirovog koda_ (obratite pažnju na gornji desni ugao bloka koda).  
![primer za raw fajl](http://screencloud.net/img/screenshots/28c560b3260b94754cd806494f4bfe8f.png 'Ovo je prikazano u gornjem desnom uglu')

Preporuka je da ime fajla definišete na samom vrhu bloka koda tj. na početku:  
`[raw=ime-fajla-kako-zelite-da-se-zove]` <- ovaj speciajlni token je dovoljan!!!  
Između uglastih zagrada ne sme biti razmaka.

```javascript
[raw=close-on-escape.js]
/**
 * Adds event handler for `ESC` keystroke.
 *
 * Same as:
 * `$.fn.extend({ method: function () {} });`
 */

jQuery.prototype.closeOnEscape = function (speed) {
  var self = this;
  speed = speed || 200;

  $(document).on('keyup', function (e) {
    if (e.keyCode === 27)
      self.hide(speed);
  });

  return self;
};
```

    ```javascript
    [ raw=close-on-escape.js ] // ne sme da ima razmak - moralo je zbog demonstracije!    
    /**
     * Adds event handler for `ESC` keystroke.
     *
     * Same as:
     * `$.fn.extend({ method: function () {} });`
     */

    jQuery.prototype.closeOnEscape = function (speed) {
      var self = this;
      speed = speed || 200;

      $(document).on('keyup', function (e) {
        if (e.keyCode === 27)
          self.hide(speed);
      });

      return self;
    };
    ```

* ___Odseći_ deo teksta za prikaz na listingu postova__

Ne preterano zanimljiva opcija ali se koristi na [/post](/post) stranici kako se ne bi prikazao ceo sadržaj članka već samo određeni deo a onda dalje korisnik klikom na _"Ceo tekst"_ može pročitati ostatak članka.

Sintaksa je jednostavna:  
Na mestu na kome želite da _"presečete"_ tekst unesite specijalni token `[cutHere]`

```
"Ovo je neki preterano dugački tutorial u kome ja objašnjavam sve i svašta...  
I tako ovde se priča o svemu i svačemu i tako dalje i tako bliže...
[cutHere]
Sadržaj ispod ovog tokena biće vidljiv tek kad korisnik klikne da
pročita ceo tekst tj. poseti URL ovog članka! Ovo se koristi samo iz razloga da se ne prikaže ceo članak na stranici sa listingom svih članaka."
```

Čestitamo!  
Upravo ste naučili Vašu novu sintaksu za pisanje na web-u. Za sve detaljnjije informacije o [Markdown](http://daringfireball.net/projects/markdown/)-u i [GFM][]-u molimo posetite njihove zvanične prezentacije.