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

const date = new Date();
export const day = date.getDate();
export const month = date.getMonth();
export const theDay = date.getDay();
export const year = date.getFullYear();
