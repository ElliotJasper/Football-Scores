date_ob = new Date();
// Get the weekday as a string (long version)
const weekday = date_ob.toLocaleString("en-us", { weekday: "long" });

let date = date_ob.getDate(); // Day as an integer
let month = date_ob.getMonth() + 1; // Month as integer
let monthName = date_ob.toLocaleString("default", { month: "long" }); // Month as string

// Function to add ending to date: th, rd etc
const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Format date for path and API (add leading 0s)
month = month.toString();
if (month.length == 1) {
  month = "0" + month;
}

// Export date formats
let x = (module.exports.formatDatePath =
  weekday + "-" + date + nth(date) + "-" + monthName);
let y = (module.exports.formatDateAPI = date_ob.toISOString().split("T")[0]);
console.log(y);
console.log(x);
