var User = require('../models/user')
	, Post = require('../models/post')
	, Email = require('../models/email')
	, Comment = require('../models/comment')
	, Picture = require('../models/picture')
	, fixtures = __dirname + '/fixtures';

describe('User', function () {

	var user = new User();

	it('should be instanceof User', function () {
		user.should.be.an.instanceof(User);
	});

	describe("#find()", function () {

		it('should find ALL user models (1)', function (done) {
			User.find({}, function (err, users) {
				if (err) done(err);
				users.should.be.an.instanceof(Array);
				users.should.have.lengthOf(1);
				users.should.not.have.lengthOf(3);
				done();
			});
		});

	});

	describe('#findByUsername()', function () {

		it('should find record with a given username', function (done) {
			User.findByUsername('ManInTheBox', function (err, user) {
				if (err) done(err);
				user.should.be.a('object');
				user.name.should.have.property('username', 'ManInTheBox');
				user.name.should.not.have.property('username', 'Pera');
				done();
			});
		});

	});

});

describe('Post', function () {

	describe('#findByAuthor()', function () {

		it('should find posts by given author (ManInTheBox)', function (done) {
			User.findByUsername('ManInTheBox', function (err, zarko) {
				Post.findByAuthor(zarko, function (err, posts) {
					if (err) done(err);
					posts.should.be.an.instanceof(Array);
					posts.should.have.lengthOf(4);
					posts.should.not.have.lengthOf(100);
					done();
				});
			});
		});

	});

	describe('#findNewest()', function () {

		it('should find newest posts with default limit', function (done) {
			Post.findNewest(function (err, posts) {
				if (err) done(err);
				posts.should.be.lengthOf(4);
				done();
			});
		});

		it('should find newest posts with supplied limit', function (done) {
			Post.findNewest(2, function (err, posts) {
				if (err) done(err);
				posts.should.be.lengthOf(2);
				posts.should.not.be.lengthOf(4);
				done();
			});
		});

	});

	describe('#normalizeTitle() (slug generator)', function () {

		var title = 'Ja se zovem Žarko Stanković, a Čačak je lep grad i šta više reći.';
		var post = new Post({
			title: title
		});

		var normalized = post.normalizeTitle(post.title);

		it('should generate url-valid title based on user input', function () {
			normalized.should.eql('ja-se-zovem-zarko-stankovic-a-cacak-je-lep-grad-i-sta-vise-reci');
			title = '<script>alert("želim da uništim ovaj sajt!")</script>';
			normalized = post.normalizeTitle(title);
			normalized.should.eql('scriptalertzelim-da-unistim-ovaj-sajtscript');
			title = 'ĐINĐUVE, ŽARKO, ČaSnA ReČ... kraj :D';
			normalized = post.normalizeTitle(title);
			normalized.should.not.eql('đinđuve-žarko-casna-rec-kraj-d');
			normalized.should.eql('djindjuve-zarko-casna-rec-kraj-d');
			title = '-Malo     ćiriličnog писма.----test-';
			normalized = post.normalizeTitle(title);
			normalized.should.not.eql('malo-cirilicnog-pisma-test-');
			normalized.should.eql('malo-cirilicnog-pisma-test');
			title = '-poČinje sa crticom, sadrži više ----- crtica, i završava se sa crticom-';
			normalized = post.normalizeTitle(title);
			normalized.should.eql('pocinje-sa-crticom-sadrzi-vise-crtica-i-zavrsava-se-sa-crticom');
		});

	});

});

describe('Picture', function () {

	describe('#store()', function () {

		it('should save instance and store files on file system', function (done) {
			var mb = 1024 * 1024;
			var picture = new Picture({
		        name: 'TestUsername',
		        size: 2 * mb,
		        type: 'image/png',
		        ext: 'png'
			});

			picture.store(fixtures + '/sublimetext2.png', function (err) {
				if (err) return done(err);
				picture.should.have.property('name', 'TestUsername');
				picture.size.should.be.below(5 * mb);
				picture.size.should.not.be.above(2 * mb);
				picture.size.should.eql(2 * mb);
				picture.should.have.property('type', 'image/png');
				picture.should.not.have.property('type', 'text/plain');
				done();
			});

		});

	});

});