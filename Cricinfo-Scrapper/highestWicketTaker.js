const request = require("request");
const cheerio = require("cheerio");
const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
request(url, cb);
function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else {
    extracthtml(html);
  }
}
function extracthtml(html) {
  let $ = cheerio.load(html);
  let WinningTeamNameElem;
  let teamArr = $(".match-info-MATCH .team");
  console.log(teamArr.length);
  for (let i = 0; i < teamArr.length; i++) {
    let hasclass = $(teamArr[i]).hasClass("team-gray");
    if (hasclass == false) {
      let teamNameElem = $(teamArr[i]).find(".name");
      WinningTeamNameElem = teamNameElem.text().trim();
    }
  }
  let inningArray = $(".card.content-block.match-scorecard-table>.Collapsible");
  let htmlStr = "";
  for (let i = 0; i < inningArray.length; i++) {
    //   let chtml=  $(inningArray[i]).html();
    //   htmlStr+=chtml;
    let teamNameElem = $(inningArray[i]).find(".header-title.label");
    let teamName = teamNameElem.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
    let hwtName = "";
    let hwtWicket = 0;
    if (WinningTeamNameElem != teamName) {
      console.log(teamName);
      let tableElm = $(inningArray[i]).find(".table.bowler");
      let allBowlers = $(tableElm).find("tr");
      for (j = 0; j < allBowlers.length; j++) {
        let allColOfPlayers = $(allBowlers[j]).find("td");
        let playerName = $(allColOfPlayers[0]).text();
        let wicket = $(allColOfPlayers[4]).text();
        if (wicket >= hwtWicket) {
          hwtWicket = wicket;
          hwtName = playerName;
        }
        console.log(
          `Winning Team ${WinningTeamNameElem}  Playername:${playerName}  Wicket:${wicket}`
        );
      }
      console.log(
        `Highest wicket taker :  Playername:${hwtName}  Wicket:${hwtWicket}`
      );
    }
  }
}
