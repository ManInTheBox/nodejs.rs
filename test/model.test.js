var User = require('../models/user')
	, Post = require('../models/post')
	, Email = require('../models/email')
	, Comment = require('../models/comment')
	, Picture = require('../models/picture');

// describe('User', function () {

// 	var user = new User();

// 	it('should be instanceof User', function () {
// 		user.should.be.an.instanceof(User);
// 	});

// 	describe("#find()", function () {
// 		it('should find ALL user models (2)', function (done) {
// 			User.find({}, function (err, users) {
// 				if (err) done(err);
// 				users.should.be.an.instanceof(Array);
// 				users.should.have.lengthOf(2);
// 				users.should.not.have.lengthOf(3);
// 				done();
// 			});
// 		});
// 	});

// 	describe('#findByUsername()', function () {
// 		it('should find record with a given username', function (done) {
// 			User.findByUsername('ManInTheBox', function (err, user) {
// 				if (err) done(err);
// 				user.should.be.a('object');
// 				user.name.should.have.property('username', 'ManInTheBox');
// 				user.name.should.not.have.property('username', 'Pera');
// 				done();
// 			});
// 		});
// 	});
// });

// var zarko = new User({
// 	name: {
// 		_id: "4f5f612b09110bc711000002",
// 		username: "ManInTheBox"
// 	}
// });


// var post1 = new Post({
// 	owner: zarko._id
// });
// var post2 = new Post({
// 	owner: zarko._id
// });
// var post3 = new Post({
// 	owner: zarko._id
// });

// describe('Post', function () {

// 	describe('#findByAuthor()', function () {
// 		it('should find posts by given author', function (done) {
// 			Post.findByAuthor('4f5f612b09110bc711000002', function (err, posts) {
// 				if (err) done(err);
// 				posts.should.be.an.instanceof(Array);
// 				posts.should.have.lengthOf(3);
// 				posts.should.not.have.lengthOf(4);
// 				done();
// 			});
// 		});
// 	});

// 	describe('#findNewest()', function () {

// 		it('should find newest posts with default limit', function (done) {
// 			Post.findNewest(function (err, posts) {
// 				if (err) done(err);
// 				posts.should.be.lengthOf(4);
// 				done();
// 			});
// 		});

// 		it('should find newest posts with supplied limit', function (done) {
// 			Post.findNewest(2, function (err, posts) {
// 				if (err) done(err);
// 				posts.should.be.lengthOf(2);
// 				posts.should.not.be.lengthOf(4);
// 				done();
// 			});
// 		});
// 	});
// });

// describe('Picture', function () {

// 	describe('#store()', function () {
// 		it('should save instance and store files o file system', function (done) {
// 			var mb = 1024 * 1024;
// 			var picture = new Picture({
//         name: 'TestUsername',
//         size: 2 * mb,
//         type: 'image/jpg'
// 			});

// 			picture.store('/tmp/7c5082e7078bd688211c53e1ed5d1f9b', function (err) {
// 				if (err) return done(err);
// 				picture.should.have.property('name', 'TestUsername');
// 				picture.size.should.be.below(5 * mb);
// 				picture.size.should.not.be.above(2 * mb);
// 				picture.size.should.eql(2 * mb);
// 				picture.should.have.property('type', 'image/jpg');
// 				picture.should.not.have.property('type', 'text/plain');
// 				done();
// 			});

// 		});
// 	});
// });

describe('Post', function () {
	describe('#normalizeTitle()', function () {

		var title = 'Ja se zovem Žarko Stanković, a ovo je đumbir šaban Čačak.';
		var post = new Post({
			title: title
		});

		var normalized = post.normalizeTitle(post.title);

		it('should generate url-valid title based on user input', function () {
			normalized.should.eql('ja-se-zovem-zarko-stankovic-a-ovo-je-djumbir-saban-cacak');
			title = '<script>alert("želim da uništim ovaj sajt!")</script>';
			normalized = post.normalizeTitle(title);
			normalized.should.eql('scriptalertzelim-da-unistim-ovaj-sajtscript');
			title = 'ŽARKO,STANKOVIĆ NIJE ĐUBRE, VEĆ ĆOVEK.';
			normalized = post.normalizeTitle(title);
			normalized.should.not.eql('zarko-stankovic-nije-djubre-vec-covek');
			title = '-Malo     ćiriličnog писма.----test-';
			normalized = post.normalizeTitle(title);
			normalized.should.not.eql('malo-cirilicnog-pisma-test-');
			normalized.should.eql('malo-cirilicnogtest');
			title = '-poČinje sa crticom, sadrži više ----- crtica, i završava se sa crticom-';
			normalized = post.normalizeTitle(title);
			normalized.should.eql('pocinje-sa-crticom-sadrzi-visecrtica-i-zavrsava-se-sa-crticom');
		});
	});
});