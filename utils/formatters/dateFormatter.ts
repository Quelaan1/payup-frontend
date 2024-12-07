export function formatDate(dateObject: Date): string {
	// Extract the day, month, and year from the Date object
	const day = String(dateObject.getDate()).padStart(2, '0');
	const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
	const year = dateObject.getFullYear();

	// Format the date in DD/MM/YYYY format
	return `${day}/${month}/${year}`;
}
