export default function Filter({ searchText, onSearchText }) {
	return (
		<div>
			filter shown with{' '}
			<input
				type='text'
				value={searchText}
				onChange={(event) => onSearchText(event.target.value)}
			/>
		</div>
	);
}