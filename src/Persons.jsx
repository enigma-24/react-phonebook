import Person from './Person';

export default function Persons({ peopleMatchingSearchText }) {
	return (
		<>
			{peopleMatchingSearchText.map((person) => (
				<Person
					key={person.id}
					name={person.name}
					phoneNumber={person.number}
				/>
			))}
		</>
	);
}
