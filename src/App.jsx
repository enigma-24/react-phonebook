import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((response) => {
			if (response.status === 200) setPersons(response.data);
			else console.error('get request failed');
		});
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
		axios
			.post('http://localhost:3001/persons', newPerson)
			.then((response) => {
				setPersons(persons.concat(response.data));
				setNewName('');
				setPhoneNumber('');
			})
			.catch((error) => {
				console.error('error while adding new person: ', error);
				alert('Something went wrong! Unable to add new person');
			});
	};

	const peopleMatchingSearchText = persons.filter((person) =>
		person.name.toLowerCase().includes(searchText.toLowerCase())
	);

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
			<Persons peopleMatchingSearchText={peopleMatchingSearchText} />
		</div>
	);
};

export default App;
