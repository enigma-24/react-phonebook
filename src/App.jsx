import { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Abc Xyz', phoneNumber: '123-456-7890' },
	]);
	const [newName, setNewName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchText, setSearchText] = useState('');

	const handleNameChange = (event) => setNewName(event.target.value);

	const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);

	const handleAddName = (event) => {
		event.preventDefault();
		const matchingName = persons.find((person) => person.name === newName);
		if (matchingName) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons(persons.concat({ name: newName, phoneNumber }));
		setNewName('');
		setPhoneNumber('');
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
