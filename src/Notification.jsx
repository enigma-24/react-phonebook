const Notification = ({ message, isError }) => {
	if (message === null) return null;

	let alertMsgStyle = {
		color: isError ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	return <div style={alertMsgStyle}>{message}</div>;
};

export default Notification;
