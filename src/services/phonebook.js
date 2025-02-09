import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAllContacts = () => {
	return axios
		.get(baseUrl)
		.then((response) => response.data)
		.catch((error) => console.error('getAllContacts request failed: ', error));
};

const createNewContact = (newPerson) => {
	return axios
		.post(baseUrl, newPerson)
		.then((response) => response.data)
		.catch((error) => console.error('error while adding new person: ', error));
};

export default {
	getAllContacts,
	createNewContact,
};
