import { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import phoneBookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		phoneBookService
			.getAllContacts()
			.then((contacts) => setPersons(contacts))
			.catch((error) =>
				alert('Something went wrong! Unable to get all contacts')
			);
	}, []);

	const handleNameChange = (event) => setNewName(event.target.value);

	const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);

	const handleAddName = (event) => {
		event.preventDefault();
		const matchingName = persons.find((person) => person.name === newName);
		if (matchingName) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		const newPerson = { name: newName, number: phoneNumber };
		phoneBookService
			.createNewContact(newPerson)
			.then((data) => {
				setPersons(persons.concat(data));
				setNewName('');
				setPhoneNumber('');
			})
			.catch((error) => {
				alert('Something went wrong! Unable to add new person');
			});
	};

	const peopleMatchingSearchText = persons.filter((person) =>
		person.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const handleDeletePerson = (id) => {
		const userResponse = window.confirm(
			'Are you sure you want to remove this person?'
		);

		if (userResponse) {
			phoneBookService
				.deletePerson(id)
				.then((response) =>
					setPersons(persons.filter((person) => person.id !== id))
				)
				.catch((error) =>
					alert('Something went wrong! Unable to delete this person')
				);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter searchText={searchText} onSearchText={setSearchText} />
			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				onAddName={handleAddName}
				onNameChange={handleNameChange}
				phoneNumber={phoneNumber}
				onPhoneNumberChange={handlePhoneNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons
				peopleMatchingSearchText={peopleMatchingSearchText}
				onDeletePerson={handleDeletePerson}
			/>
		</div>
	);
};

export default App;
