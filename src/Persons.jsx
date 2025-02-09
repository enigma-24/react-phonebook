import Person from './Person';

export default function Persons({ peopleMatchingSearchText, onDeletePerson }) {
	return (
		<>
			{peopleMatchingSearchText.map((person) => (
				<Person
					key={person.id}
					id={person.id}
					name={person.name}
					phoneNumber={person.number}
					onDeletePerson={onDeletePerson}
				/>
			))}
		</>
	);
}
