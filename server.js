var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var Contact = require('./models/contact').Contact;
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function (req, res, next) {
  if (!req.session.contactStorage) {
    req.session.contactStorage = Contact.createContactStorage();
  }

  next();
});

app.use(bodyParser.json({type: '*/*'}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
	next();
});

app.get('/contacts', function (req, res) {
	var contacts = Contact.getAllContacts(req.session.contactStorage);
  	res.send(contacts);
});

app.post('/contacts', function (req, res) {
	var	contact = Contact.createContact(req.session.contactStorage, req.body);
  	res.send(contact);
});

app.get('/contacts/:id', function (req, res) {
	var	contact = Contact.getContactById(req.session.contactStorage, req.params.id);
  	res.send(contact);
});

app.put('/contacts/:id', function (req, res) {
	var	contact = Contact.updateContact(req.session.contactStorage, req.params.id, req.body);
  	res.send(contact);
});

app.delete('/contacts/:id', function (req, res) {
	Contact.deleteContact(req.session.contactStorage, req.params.id);
  	res.send({});
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Contact Manager API listening at http://%s:%s', host, port)
});
