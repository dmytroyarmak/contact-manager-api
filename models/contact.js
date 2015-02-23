var _ = require('underscore');

function getNextId (contactStorage) {
	contactStorage.currentId += 1;
	return contactStorage.currentId;
}

function Contact (attributes) {
	_.extend(this, attributes);
}

Contact.createContactStorage = function createContactStorage () {
	return {
		currentId: 6,
		contacts: {
			'1': {
				id: 1,
				name : 'Terrence S. Hatfield',
				tel: '651-603-1723',
				email: 'TerrenceSHatfield@rhyta.com',
				faceId: 1
			},
			'2': {
				id: 2,
				name : 'Chris M. Manning',
				tel: '513-307-5859',
				email: 'ChrisMManning@dayrep.com',
				faceId: 2
			},
			'3': {
				id: 3,
				name : 'Ricky M. Digiacomo',
				tel: '918-774-0199',
				email: 'RickyMDigiacomo@teleworm.us',
				faceId: 3
			},
			'4': {
				id: 4,
				name : 'Michael K. Bayne',
				tel: '702-989-5145',
				email: 'MichaelKBayne@rhyta.com',
				faceId: 4
			},
			'5': {
				id: 5,
				name : 'John I. Wilson',
				tel: '318-292-6700',
				email: 'JohnIWilson@dayrep.com',
				faceId: 5
			},
			'6': {
				id: 6,
				name : 'Rodolfo P. Robinett',
				tel: '803-557-9815',
				email: 'RodolfoPRobinett@jourrapide.com',
				faceId: 6
			}
		}
	};
};

function newContact (attributes) {
	return new Contact(attributes);
}

Contact.getAllContacts = function getAllContacts (contactStorage) {
	return _.map(contactStorage.contacts, newContact);
}

Contact.getContactById = function getContactById (contactStorage, id) {
	return newContact(contactStorage.contacts[id]);
}

Contact.updateContact = function (contactStorage, id, data) {
	if (contactStorage.contacts[id]) {
		contactStorage.contacts[id] = data;
		return Contact.getContactById(id);
	} else {
		throw new Error('There is no contact with id: ' + id);
	}
}

Contact.createContact = function (contactStorage, data) {
	var id = getNextId(contactStorage);
	data.id = id;
	contactStorage.contacts[id] = data;
	return Contact.getContactById(id);
}

Contact.deleteContact = function (contactStorage, id) {
	delete contactStorage.contacts[id];
}

exports.Contact = Contact;
