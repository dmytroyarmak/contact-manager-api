var express = require('express');
var Contact = require('./models/contact').Contact;
var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/contacts', function (req, res) {
	var contacts = Contact.getAllContacts();
  	res.send(contacts);
})

app.get('/contacts/:id', function (req, res) {
	var contactId = parseInt(req.params.id, 10),
		contact = Contact.getContactById(contactId);
  	res.send(contact);
})

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Contact Manager API listening at http://%s:%s', host, port)
});
