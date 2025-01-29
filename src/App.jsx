import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: '' }]);
	const [newName, setNewName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleAddName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{' '}
					<input value={phoneNumber} onChange={handlePhoneNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.phoneNumber}
				</div>
			))}
		</div>
	);
};

export default App;
