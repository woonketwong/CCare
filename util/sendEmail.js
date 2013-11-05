var nodemailer = require("nodemailer");
var sendEmail = function(name, email, message){
  var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
      user: "credentialedcaredev@gmail.com",
      pass: "credentialed"
    }
  });

  var mailOptions = {
    from: "Crendentialed Care <credentialedcaredev@gmail.com>", // sender address
    to: email, // list of receivers
    subject: "Pending Confirmation", // Subject line
    html: "<h1>Hello " + name +"!<\/h1><p>Thank you for your registration. Please click the following link to complete your signup process</p><a href='"+ message +"' >Click here</a>" // html body
  };

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
  });
};

module.exports = sendEmail;