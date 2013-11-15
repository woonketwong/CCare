module.exports = {
  db: {
    production: process.env.MONGOLAB_URI ||
                process.env.MONGOHQ_URL  ||
                'mongodb://localhost/HelloMongoose',
    development: 'mongodb://localhost/HelloMongoose',
    test: "mongodb://localhost/HelloMongoose",
  },
  mailer: {
    auth: {
       user: "credentialedcaredev@gmail.com",
       pass: "credentialed"
    },
   defaultFromAddress: 'Credentialed Care <credentialedcaredev@gmail.com>'
  }
}; 