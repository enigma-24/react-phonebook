const Person = ({ id, name, phoneNumber, onDeletePerson }) => (
	<div>
		{name} {phoneNumber}
		<button onClick={() => onDeletePerson(id)}>delete</button>
	</div>
);

export default Person;
