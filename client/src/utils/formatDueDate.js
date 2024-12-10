const formatDueDate = (dueDate) => {
	let currDate = new Date();
	let taskDate = new Date(dueDate);
	const diff = taskDate - currDate;
	const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
	if (days < 0) return "Completed";
	if (days === 0) return "Due today";
	return `${days} days left`;
};
export default formatDueDate;
