const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = date => {
  date = new Date(date);
  const monthName = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};
