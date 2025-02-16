import { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import phoneBookService from './services/phonebook';
import Notification from './Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [searchText, setSearchText] = useState('');
	const [isError, setIsError] = useState(true);
	const [alertMsg, setAlertMsg] = useState(null);

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
		const matchingPerson = persons.find((person) => person.name === newName);
		
		if (matchingPerson) {
			if (matchingPerson.number === phoneNumber) {
				setIsError(true);
				setAlertMsg(`${newName} is already added to phonebook`);
				resetAlertMsg();
			} else {
				const userResponse = window.confirm(
					`${matchingPerson.name} is already added to phonebook, do you want to replace the old number with a new one?`
				);

				if (userResponse) {
					phoneBookService
						.updatePhoneNumber({ ...matchingPerson, number: phoneNumber })
						.then((updatedPerson) => {
							const tempArr = persons.filter(
								(person) => person.id !== matchingPerson.id
							);
							setPersons([...tempArr, updatedPerson]);
							setNewName('');
							setPhoneNumber('');
							setIsError(false);
							setAlertMsg(
								`${matchingPerson.name}'s phone number has been updated successfully`
							);
							resetAlertMsg();
						})
						.catch((error) => {
							console.error('error: ', error);
							setIsError(true);
							setAlertMsg(
								`Something went wrong! Unable to update the phone number of ${matchingPerson.name}`
							);
							resetAlertMsg();
						});
				}
			}
			return;
		}

		const newPerson = { name: newName, number: phoneNumber };
		phoneBookService
			.createNewContact(newPerson)
			.then((data) => {
				setPersons(persons.concat(data));
				setNewName('');
				setPhoneNumber('');
				setIsError(false);
				setAlertMsg('New Person added to phone book successfully');
				resetAlertMsg();
			})
			.catch((error) => {
				console.error('error: ', error);
				setIsError(true);
				setAlertMsg('Something went wrong! Unable to add new person');
				resetAlertMsg();
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
				.catch((error) => {
					console.error('error: ', error);
					setIsError(true);
					setAlertMsg('Something went wrong! Unable to delete this person');
					resetAlertMsg();
				});
		}
	};

	const resetAlertMsg = () => setTimeout(() => setAlertMsg(null), 5000);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={alertMsg} isError={isError} />
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
