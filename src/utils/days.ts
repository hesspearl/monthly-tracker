export enum Day {
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
}

export enum Months {
  "January",
  "February ",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
}

export const getDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const theDay = date.getDay();
  const year = date.getFullYear();
  const currentMonth = Months[month];

  return { day, month, theDay, year, currentMonth };
};
