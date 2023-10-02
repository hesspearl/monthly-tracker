export enum Day {
  Sunday = "SUN",
  Monday = "MON",
  Tuesday = "TUE",
  Wednesday = "WED",
  Thursday = "THU",
  Friday = "FRI",
  Saturday = "SAT",
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

const dateHandler = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const theDay = date.getDay();
  const year = date.getFullYear();
  const currentMonth = Months[month];

  return { day, month, theDay, year, currentMonth };
};

export const getDate = dateHandler(new Date());
