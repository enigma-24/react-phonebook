const PersonForm = ({
	newName,
	onAddName,
	onNameChange,
	phoneNumber,
	onPhoneNumberChange,
}) => (
	<form onSubmit={onAddName}>
		<div>
			name: <input value={newName} onChange={onNameChange} />
		</div>
		<div>
			number: <input value={phoneNumber} onChange={onPhoneNumberChange} />
		</div>
		<div>
			<button type='submit'>add</button>
		</div>
	</form>
);

export default PersonForm;