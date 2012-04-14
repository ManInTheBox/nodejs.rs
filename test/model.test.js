var User = require('../models/user')
	, Post = require('../models/post')
	, Email = require('../models/email')
	, Comment = require('../models/comment')
	, Picture = require('../models/picture');

describe('User', function () {

	var user = new User();

	it('should be instanceof User', function () {
		user.should.be.an.instanceof(User);
	});

	describe("#find()", function () {
		it('should find ALL user models (2)', function (done) {
			User.find({}, function (err, users) {
				if (err) done(err);
				users.should.be.an.instanceof(Array);
				users.should.have.lengthOf(2);
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

describe('Post', function () {

	describe('#findByAuthor()', function () {
		it('should find posts by given author', function (done) {
			Post.findByAuthor('4f5f612b09110bc711000002', function (err, posts) {
				if (err) done(err);
				posts.should.be.an.instanceof(Array);
				posts.should.have.lengthOf(3);
				posts.should.not.have.lengthOf(4);
				done();
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
});