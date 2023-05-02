const fs = require("fs");
// YYYY, MM, DD
var from = new Date(2017, 7, 11);
let test = new Date(2015, 5, 24);
console.log(test);
var to = new Date(2018, 4, 13);
let counter = 0;
let every = [];

// Function to get data for different leagues and return relevant parts
const getGames = async (uri, x) => {
  try {
    fetch(uri)
      .then((response) => response.json())
      .then((response) => {
        let leagueRoute = response.payload[0].body.matchData;
        for (let league of leagueRoute) {
          if (league.tournamentMeta.tournamentSlug == "premier-league") {
            if (league.tournamentDatesWithEvents[x] != undefined) {
              league = league.tournamentDatesWithEvents[x][0].events;
              console.log(league[0]);
              counter += league.length;
              console.log(counter);

              every.push(...league);
              for (let teams of league) {
                let info =
                  teams.startTime +
                  "  " +
                  teams.homeTeam.name.full +
                  "vs" +
                  teams.awayTeam.name.full;
                fs.appendFile(
                  "text.txt",
                  JSON.stringify(info) + "\n",
                  function (err) {
                    if (err) throw err;
                    console.log("saved");
                  }
                );
              }
            }
          }
        }
      });

    // If league not found, throw custom error
  } catch (error) {
    console.error(`Error getting data`);
    return [];
  }
};
// loop for every day
const loopAll = async () => {
  for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
    // your day is here
    console.log(day);
    // sometimes date has leading 0, sometimes doesnt, check this.

    let date_ob = day;

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
    let yo = weekday[date_ob.getDay()];

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

    // Formate the dates for the API URL and the path for finding scores
    // Export
    let x = yo + "-" + date + nth(date) + "-" + monthName;
    let y = year + "-" + month + "-" + otherDate;

    console.log(x);
    console.log(y);

    let requestURL = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-football-scores-match-list-data%2FendDate%2F${y}%2FstartDate%2F${y}%2FtodayDate%2F${y}%2Ftournament%2Ffull-priority-order%2Fversion%2F2.4.6?timeout=10`;

    getGames(requestURL, x);
  }
  return every;
};

(async () => {
  await loopAll();
  console.log(every[0]);
})();
