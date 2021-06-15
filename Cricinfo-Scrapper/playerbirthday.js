const request = require("request");
const cheerio = require("cheerio");
const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard";
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

    console.log(teamName);
    let tableElm = $(inningArray[i]).find(".table.batsman");
    let allBatters = $(tableElm).find("tr");
    for (j = 0; j < allBatters.length; j++) {
      let allColOfPlayers = $(allBatters[j]).find("td");
      let isbatsManCol = $(allColOfPlayers[0]).hasClass("batsman-cell");

      if (isbatsManCol == true) {
        let href = $(allColOfPlayers[0]).find("a").attr("href");
        let name = $(allColOfPlayers[0]).text();
        let fullLink = "https://www.espncricinfo.com" + href;
        // console.log(`${fullLink}`);
        getBirthDay(fullLink, name, teamName);
        // console.log(`TeamName :${teamName} playername : ${playerName}`);
      }
    }
  }
}
function getBirthDay(url, name, teamName) {
  request(url, cb);
  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else {
      extractBirthDay(html, name, teamName);
    }
  }
}
function extractBirthDay(html, name, teamName) {
  let $ = cheerio.load(html);
  let deatilsArray = $(".player-card-description");
  let birthDay = $(deatilsArray[1]).text();
  let age = $(deatilsArray[2]).text();
  console.log(
    `Player Name : ${name}  Birth : ${birthDay}  Age:${age}  Team= ${teamName}`
  );
}
