const league = require('../leagues');
require("dotenv").config({
    path: "C:/Users/ellio/Documents/lastmanstanding/.env",
  });
  
  console.log(process.env.PASSWORD);
  
  const { MongoClient, ServerApiVersion } = require("mongodb");

  
  const URI =
    "mongodb+srv://elliotadmin:" +
    process.env.PASSWORD +
    "@lastmanstanding.oqj3y.mongodb.net/?retryWrites=true&w=majority";
  
  // Connect to MonogDB
  const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client.connect((err) => {
    if (err) throw err;
    let db = client.db("lastmanstanding-scores");
    const query = {   leagueName: 'Premier League Table' }
    db.collection('leagues')
    .find(query).toArray((err, result) => {
        if (result.length == 0) {
            db.collection('leagues').insertOne(league.league, (err, result) => {
                if (err) throw err;
                console.log('Document inserted');
                client.close();
            })
        } else client.close();
    })
    
});
  