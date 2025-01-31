import Person from './Person';

export default function Persons({ peopleMatchingSearchText }) {
	return (
		<>
			{peopleMatchingSearchText.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					phoneNumber={person.phoneNumber}
				/>
			))}
		</>
	);
}
