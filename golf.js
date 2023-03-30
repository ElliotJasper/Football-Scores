const date = require("./getdate");

let requestURI = `https://push.api.bbci.co.uk/batch?t=%2Fdata%2Fbbc-morph-%7Bgraphql%2Fquery%2Fquery(%2524tournamentSlug%253AString!%252C%2524todayDate%253AString!)%257Bsbl%257Bgolf%257Bevents(tournamentSlugs%253A%255B%2524tournamentSlug%255D%252CtodayDate%253A%2524todayDate)%257BcourseName%252CdisplayDate%252CdisplayName%252Cpar%252CprizeMoney%252Cstatus%252Cyards%257D%257D%257D%257D%2Ftoken%2F3118d18d2d5d207c75eeee41a21028c22c32b4da0632af2fbfd7d57ba7192dd8%2Fvariables%2F%257B%2522tournamentSlug%2522%253A%2522uspga-tour%2522%252C%2522todayDate%2522%253A%2522${date.formatDateAPI}%2522%257D%2Fversion%2F2.3.103%2Csport-tables-data-modeller%2Fcompetition%2Fuspga-tour%2Fsport%2Fgolf%2FtodayDate%2F${date.formatDateAPI}%2Fversion%2F1.27.1%7D?timeout=5`;

const getStandings = async () => {
  const data = await fetch(requestURI);
  const json = await data.json();
  const players = json.payload[1].body.sportTables.tables[0].rows;
  for (player of players) {
    console.log(player.cells[1].td.abbreviations[0].text);
  }
};

getStandings();
