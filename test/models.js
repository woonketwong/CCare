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
      var coords = [-122.4089036, 37.7835939]

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

// { "__v" : 0, "_id" : ObjectId("52842cb66de88946f5000002"), "coords" : [  -122.4089036,  37.7835939 ], "email" : "woonketwong@hotmail.com", "name" : "Woon Ket", "password" : "sha1$0396bb0b$1$a3b4cad83cfce3a2426b756e0b2504aa2cfb71d5", "phone" : "4081234567", "preferences" : { "jobType" : { "caregiver" : false, "CHHA" : true, "STNA" : true, "PCA" : false, "LPN" : false, "CNA" : false }, "certifications" : { "LPN" : true }, "specializations" : { "SpecialMeal" : true, "Geriatric" : true, "Fingerprints" : true, "FirstAid" : true }, "languages" : { "Arabic" : false, "Chinese_Cantonese" : true, "Chinese_Mandarin" : true }, "hourlyRate" : 14, "dailyRate" : 8, "fullTime" : true, "dayShift" : true, "weekDays" : true, "weekEnds" : true, "homeCare" : true, "facilityCare" : true, "dogsOk" : true, "carAvailable" : false, "latitude" : 37.7835939, "longitude" : -122.4089036, "education" : "Some college", "yearsExperience" : 5, "idealPatient" : "nice", "idealWorkEnvironment" : "comfortable", "interests" : "Reading" } }




