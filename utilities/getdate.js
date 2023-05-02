// sometimes date has leading 0, sometimes doesnt, check this.

date_ob = new Date();

// Format Date For API URL
// Get current dates
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Date object returns the day as a integer from 0-6, so find this index in a array of days.
let day = weekday[date_ob.getDay()];

let date = date_ob.getDate(); // Day as an integer
let month = date_ob.getMonth() + 1; // Month as integer
let year = date_ob.getFullYear(); // Year as integer
let monthName = date_ob.toLocaleString("default", { month: "long" }); // Month as string

// Format Dates For JSON Path
// If month is 1 digit, add 0 to beginning, so 1 becomes 01 (for the API path to work)
month = month.toString();
if (month.length == 1) {
  month = "0" + month;
}
let dateFinalDigit;

// If date is 1 digit, do nothing, if 2 digit, get the final digit.
let otherDate;
date = date.toString();
if (date.length == 1) {
  dateFinalDigit = date;
  otherDate = "0" + date;
} else {
  dateFinalDigit = date.slice(-1);
  otherDate = date;
}

// Format date to end in (st), (nd), (rd), or (th) depending on final number.

let dateFinish;

switch (dateFinalDigit) {
  case "1":
    dateFinish = "st";
    break;

  case "2":
    dateFinish = "nd";
    break;

  case "3":
    dateFinish = "rd";
    break;

  default:
    dateFinish = "th";
}
let dayComplete = date + dateFinish;

// Formate the dates for the API URL and the path for finding scores
// Export
let x = (module.exports.formatDatePath =
  day + "-" + dayComplete + "-" + monthName);
let y = (module.exports.formatDateAPI = year + "-" + month + "-" + otherDate);
console.log(x);
console.log(y);
