Nastavljamo dalje. Ukoliko niste pročitali prvi deo, preporučujem da se vratite i pročitate [Backbone.js - part 1](http://nodejs.rs/post/backbonejs-part-1) jer su članci povezani.

## Kolekcije

Shvatili ste i naučili šta je, za šta služi i kako se koristi model. Sledeće pitanje je kako grupisati modele i kako raditi sa grupom modela. Za to nam služe backbone.js kolekcije.

[cutHere]

## Inicijalizacija

Držaćemo se primera iz prethodnog članka. Tamo smo imali model osobe. Ukoliko želimo da grupišemo više modela, napravićemo kolekciju ljudi.

```
var People = Backbone.Collection.extend({
	model: Person,
	url: '/people'
});
```

Primetićete da se kolekciji za property model prosledjuje sama 'klasa', a ne instanca. To prosledjujemo da bi mogli da koristimo 'custom' metode modela.
Url property je url sa kojim će kolekcija komunicirati. Backbone je radjen po REST patternu. Ukoliko ne znate šta je REST ili kako funkcioniše, pogledajte: [Teach a dog to rest](https://vimeo.com/17785736).

Ukratko:


| Request       | Url             | Response                |
| ------------- |:---------------:| -----------------------:|
| GET           | /people         | vraća sve objekte       | 
| POST          | /people         | dodaje novi objekat     |
| GET           | /people/:id     | vraća odredjeni objekat |
| PUT           | /people/:id     | menja odredjeni objekat |
| DELETE        | /people:/id     | briše odredjeni objekat |


Url property može biti i funkcija u kojoj ćete definisati generisanje urla na način na koji vama odgovara, npr:

```
var People = Backbone.Collection.extend({
	model: Person,
	url: function() {
		return this.document.url() + '/people';
	}
});
```

## Dodavanje modela u kolekciju

Zatim ćemo napraviti instancu i dodati modele u kolekciju.

```
var people = new People();
people.add(person);
```

*`person` je instanca modela koju smo koristili u prethodnoj lekciji.*

Ako logujete instancu kolekcije, videćete da je property length promenjen jer sada imamo model u kolekciji. Kolekcije takodje imaju metodu `toJSON` i ako je pozovete, dobićete niz objekata, tj. modela.

Drugi način dodavanja modela je prilikom instanciranja kolekcije. Ovaj način se takodje koristi za 'butstrapovanje' kolekcije sa strane back-enda.

```
var people = new People([
	{ first_name: 'John', last_name: 'Doe' },
	{ first_name: 'Ben', last_name: 'Doe', age: 20 },
	{ first_name: 'Nicolas' },
]);
```

Back-end developer to može srediti na sledeći način:

```
var people = new People(<?php echo json_encode($people); ?>);
```

Na taj način smo popunili kolekciju bez dodatnog requesta za dobijanje modela.

## Dodatne funkcije
Ukoliko želite da izvučete model sa odredjenim id-em iz kolekcije, možete koristiti metodu `get`.

```
var somePerson = people.get(2);
```

Ako vam treba model odredjenog indeksa možete koristiti metodu `at`.
Kolekcija ima dosta korisnih metoda koje su većinom iz underscore.js biblioteke koja se prožima kroz ceo backbone. Za detaljnija objašnjenja proverite [dokumentaciju](http://backbonejs.org/).

### Sortiranje
Kolekcije mogu da se sortiraju i to se često koristi kada vam trebaju modeli iz kolekcije koji su po nečemo specifični. U našem primeru ćemo izvući sve članove koji imaju preko 18 godina.

```
var People = Backbone.Collection.extend({
	model: Person,
	url: '/people',
	getAdults: function () {
		return this.filter(function (person) {
			return person.get('age') > 18;
		});
	}
});
```

## Napomena
Ukoliko vaš model nema sopstvene metode, onda kolekciji nije ni potrebno prosledjivati 'klasu' modela, a ni kreirati sam model, jer nemate šta korisno iskoristiti iz modela. Naravno i dalje ćete moći da koristite sve backbone metode koje su vezane za model.


To su osnove, a sad trk po dokumentaciju. :)