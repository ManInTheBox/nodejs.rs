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