// import mongoose helper utilities
var utils = require('./utils.js');
var should = require('should');
// import models
var JobApplicant = require('../models/jobApplicant.js');
var EmailToken = require('../models/emailToken.js');
var JobPost = require('../models/jobPost.js');
var Employer = require('../models/employer.js');

describe('EmailTokens: models', function(){
	describe('#create()', function(){
		it('should create a new email token', function(done){
			var name = "Lincoln";
			var email = "lincoln@gmail.com";
			var password = "sha1$d1279459$1$394b205f6h348fdb5dd698dea912227e6fa4a352";
      var phone = "4081234567";
      var token = "f45499fc1fc842aa8be6259710cf011ac6b0cb49";

			//Create an employer object to pass to Employer.create()
			var emailToken = {
      	name: name,
      	email: email,
      	password: password,
      	phone: phone,
      	token: token
			};
			EmailToken.create(emailToken, function(err, createdUser){
				// Confirm that an error does not exist
				should.not.exist(err);
				// verify that the returned user is what we expect
				createdUser.name.should.equal(name);
				createdUser.email.should.equal(email);
				createdUser.password.should.equal(password);
				createdUser.phone.should.equal(phone);
				createdUser.token.should.equal(token);
				// Call done to tell mocha that we are done with this test
				done();
			});
		});
	});
});

describe('Employers: models', function(){
	describe('#create()', function(){
		it('should create a new employer', function(done){
			var name = "Lincoln";
			var email = "lincoln@gmail.com";
			var password = "sha1$d4c79459$1$394b205f6h348fdb5dd698dea912227e6fa4a352";
      var phone = "4081234567";
			//Create an employer object to pass to Employer.create()
			var employer = {
      	name: name,
      	email: email,
      	password: password,
      	phone: phone
			};
			Employer.create(employer, function(err, createdUser){
				// Confirm that an error does not exist
				should.not.exist(err);
				// verify that the returned user is what we expect
				createdUser.name.should.equal(name);
				createdUser.email.should.equal(email);
				createdUser.password.should.equal(password);
				createdUser.phone.should.equal(phone);
				// Call done to tell mocha that we are done with this test
				done();
			});
		});
	});
});

describe('JobApplicants: models', function(){
	describe('#create()', function(){
		it('should create a new job applicant', function(done){
			var name = "Lincoln";
			var email = "lincoln@gmail.com";
			var password = "sha1$d4c79459$1$394b205f6h348fdb5dd6976ea912227e6fa4a352";
      var phone = "4081234567";
      var coords = [-122.4089036, 37.7835939];

			//Create an employer object to pass to Employer.create()
			var jobApplicant = {
      	name: name,
      	email: email,
      	password: password,
      	phone: phone,
      	coords: coords
			};
			JobApplicant.create(jobApplicant, function(err, createdUser){
				// Confirm that an error does not exist
				should.not.exist(err);
				// verify that the returned user is what we expect
				createdUser.name.should.equal(name);
				createdUser.email.should.equal(email);
				createdUser.password.should.equal(password);
				createdUser.phone.should.equal(phone);
				createdUser.coords[0].should.equal(coords[0]);
				createdUser.coords[1].should.equal(coords[1]);
				// Call done to tell mocha that we are done with this test
				done();
			});
		});
	});
});

describe('JobPosts: models', function(){
	describe('#create()', function(){
		it('should create a new job post', function(done){
			var positionName = "Lincoln";
			var yearsExperience = "lincoln@gmail.com";
			var experience = { "education" : "High school diploma", "Alzheimers" : true };
			var latitude = 37.7835939;
			var longitude = -122.4089036;

			//Create an employer object to pass to Employer.create()
			var jobPost = {
      	positionName: positionName,
      	yearsExperience: yearsExperience,
      	experience: experience,
      	latitude: latitude,
      	longitude: longitude
			};
			JobPost.create(jobPost, function(err, createdUser){
				// Confirm that an error does not exist
				should.not.exist(err);
				// verify that the returned user is what we expect
				createdUser.positionName.should.equal(positionName);
				createdUser.yearsExperience.should.equal(yearsExperience);
				createdUser.experience["education"].should.equal(experience["education"]);
				createdUser.latitude.should.equal(latitude);
				createdUser.longitude.should.equal(longitude);
				// Call done to tell mocha that we are done with this test
				done();
			});
		});
	});
});



