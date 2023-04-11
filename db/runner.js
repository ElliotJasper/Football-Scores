// nodeCmd and node-cron to use cmd prompt
// And execute files every (specific time frame)

const nodeCmd = require("node-cmd");
const cron = require("node-cron");
cron.schedule("*/10 * * * * *", function () {
  nodeCmd.run("node storegamesdb", (err, data, stderr) => {
    console.log(data);
  });
  nodeCmd.run("node storeLeague.js", (err, data, stderr) => {
    console.log(data);
  });
  console.log("ran");
});
