## Zašto backbone.js ?

Naučili ste jQuery. Svidja vam se šta sve možete da postignete njim, ali shvatate da Vaš kod nema strukturu. Završavate sa bezbroj indentacija `callback` funkcija. 

> Kada neko klikne ovde, pošalji ajax request. Kada se vrati rezultat, ubaci novi list item ovde i pokreni sledeću animaciju…

To je ono što želimo da izbegnemo. Backbone.js je mali MV* framework koji nam pomaže da podelimo kod na 4 celine: modele, view-ove, kolekcije i rutere.
[cutHere]

## O autoru

Autor ove divne biblioteke je [Jeremy Ashkenas](https://twitter.com/jashkenas), koji je takodje napisao biblioteku [underscore.js](http://underscorejs.org/) koja je 'dependency' backbone-a. Takodje Jeremy radi na razvoju [CoffieScript-a](http://coffeescript.org/).

## Instalacija
Backbone.js je biblioteka koja je zavisna od drugih biblioteka, tj. ima svoje 'dependecies'. Dakle backbone.js zavisi od biblioteke underscore.js i neke od biblioteka za rad sa node elementima, jQuery ili Zepto. Kada učitavate biblioteke na stranicu, vodite računa o redosledu, dakle underscore.js i jQuery moraju biti učitani pre backbone-a. Ukoliko imate potrebu da podržavata browsere poput IE7 i ispod, potrebno je da učitate i biblioteku [json2](https://github.com/douglascrockford/JSON-js) od autora [Douglas Crockforda](http://www.crockford.com/).

## Modeli
U back-end-u model **uglavnom** predstavlja jednu tabelu iz baze podataka. Ovde je to malo drugačije i mene je to dosta zbunjivalo na početku. Da ne dužim i da Vas ne zbunjujem, nastavite dalje i biće Vam jasnije.

### Vanilla javascript model
Da bi ste shvatili kako backbone modeli rade, dobro je da vidimo kako bismo koristili 'vanilla' javascript za pisanje modela.

Treba da napravimo model Osobe. Osoba treba da ima: ime, prezime i starost.

```
var Person = function (config) {
	this.first_name = config.first_name;
	this.last_name = config.last_name;
	this.age = config.age;
};
```

Takodje ta osoba može da vrši neke akcije. Možemo te akcije prikačiti na sam objekat, ali to želimo da izbegnemo jer će svaka instanca objekta imati svoju metodu u memoriji. Za takve stvari je bolje da koristimo `prototype`. Sve instance će onda deliti tu metodu umesto da je rekreiraju svaki put.

```
Person.prototype.getFullName = function () {
	return this.first_name + ' ' + this.last_name;
};
```

Sada kad smo kreirali model osobe, testirajte u konzoli. Kreirajte instancu osobe:
```
var person = new Person({ first_name: 'John', last_name: 'Doe', age: 20});
```

Zatim probajte da izvučete podatke iz instance:

```
person.age // trebalo bi da vrati 20
person.getFullName() // trebalo bi da vrati 'John Doe'
```


### Backbone.js modeli
Ako ste shvatili kako funkcionisu modeli sa `vanilla` javascript-om, probajmo da uradimo isto sa backbone modelima.

Da definišete model, treba da 'extendujete' backbone-ov model.

```
var Person = Backbone.Model.extend({});
```

Umesto da koristimo `this.first_name`, bolje je da definišemo neke 'default' vrednosti, koje možemo pregaziti prilikom instanciranja. Takodje je to dobar podsetnik šta model ima od osobina. **Pored default vrednosti, modelu možemo setovati neograničen broj drugih vrednosti, tj. one nisu limit, niti ćete dobiti error ako pokušate da setujete nešto što nema u `defaults` objektu.**

```
var Person = Backbone.Model.extend({
	defaults: {
		first_name: 'John',
		last_name: 'Doe',
		age: 20
	}
});
```

Ako bismo hteli da dodamo metode, više to ne moramo stavljati u prototype, već samo dodati unutar modela.

```
var Person = Backbone.Model.extend({
	defaults: {
		first_name: 'John',
		last_name: 'Doe',
		age: 20
	},

	getFullName: function () {
		return this.get('first_name') + ' ' + this.get('last_name');
	}
});
```
#### Getters and setters
Trebalo je da primetite da sada osobine ne kupimo kao u native varijanti, samo pozivajući ih sa `this.first_name`, već koristimo backbone helper metodu `get` koja nam dovlači bilo koji property. Takodje ukoliko želite da promenite neku vrednost, koristićete metodu `set`, npr:

```
var person = new Person({ first_name: 'Korisnik' });
person.get('first_name'); // vraća 'Korisnik'
person.get('last_name'); // vraća 'Doe' jer je to default vrednost
person.set('last_name', 'sajta');
person.get('last_name'); // vraća 'sajta'
person.getFullName(); // vraća 'Korisnik sajta'
```

*U set metodi, drugi parametar može biti objekat, ukoliko želite da izmenite više osobina.*


#### Helper metode

Da bi ste dobili json objekat osobina, pozovite metodu `toJSON`. To je manje-više klasičan javascript objekat. Ako logujete u konzoli model, videćete da se tu nalazi dosta stvari, a da se osobine čuvaju u objektu `attributes`. Metoda toJSON praktično vraća taj objekat, npr:

```
person.toJSON();
/*
	Trebalo bi da vrati sledece:
	{
		first_name: 'Korisnik',
		last_name: 'sajta',
		age: 20
	}
*/

```

#### Validacija
Da bi smo validirali podatke potrebno je da napišemo `validate` metodu. Ova metoda se automatski poziva kada setujemo vrednosti atributa modela. Ona prihvata objekat atributa (toJSON()) kao parametar. 

```
var Person = Backbone.Model.extend({
	defaults: {
		first_name: 'John',
		last_name: 'Doe',
		age: 20
	},

	validate: function (attrs) {
		if ( attrs.age < 0 ) {
			return 'Age must be positive…';
		}
	},

	getFullName: function () {
		return this.get('first_name') + ' ' + this.get('last_name');
	}
});
```

Ukoliko probate u konzoli da setujete vrednost atributa age na negativnu vrednost, vratiće se false. Model neće biti izmenjen.
Da bi ste uhvatili string, tj. grešku koju hoćete da vratite, možete koristiti pub-sub koji se pojavljuje svuda kroz backbone. Ne bih hteo da dužim o tome previše, jer je to poglavlje za sebe, ali trebalo bi da izgleda ovako nekako:

```
// Primer za samu instancu. Ne koristiti u praksi!
person.on('error', function (model, error) {
	return console.log(error);
});
```

To je to za početak.