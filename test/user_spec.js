var expect = require('chai').expect;
var User = require('../models').users;

describe('User', function() {
	var nullUser,
		  invalidUser,
		  validUser;

	context('null user', function() {
		beforeEach('build a null user', function() {
			nullUser = User.build();
		});

		it('should validate the presence of a first name', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('first_name');
					done();
				});
		});

		it('should validate the presence of a last name', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('last_name');
					done();
				});
		});

		it('should validate the presence of a username', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('username');
					done();
				});
		});

		it('should validate the presence of a password', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('password_digest');
					done();
				});
		});

		it('should validate the presence of a age', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('age');
					done();
				});
		});

		it('should validate the presence of a gender', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) { return error.path; });
					expect(error_fields).to.include('gender');
					done();
				});
		});

		// it('should validate the presence of a pregnancy status', function(done) {
		// 	nullUser
		// 		.validate()
		// 		.then(function(err) {
		// 			var error_fields = err.errors.map(function(error) { return error.path; });
		// 			expect(error_fields).to.include('pregnant');
		// 			done();
		// 		});
		// });
	});
});