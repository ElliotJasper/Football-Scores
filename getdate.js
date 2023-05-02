date_ob = new Date();
const weekday = date_ob.toLocaleString("en-us", { weekday: "long" });

let date = date_ob.getDate(); // Day as an integer
let month = date_ob.getMonth() + 1; // Month as integer
let monthName = date_ob.toLocaleString("default", { month: "long" }); // Month as string

// add ending to date: th, rd etc

month = month.toString();
if (month.length == 1) {
  month = "0" + month;
}

let x = (module.exports.formatDatePath =
  weekday + "-" + date + nth(date) + "-" + monthName);
let y = (module.exports.formatDateAPI = date_ob.toISOString().split("T")[0]);

//let x = (module.exports.formatDatePath = "Sunday-19th-March");
//let y = (module.exports.formatDateAPI = "2023-03-19");

console.log(y);
console.log(x);
