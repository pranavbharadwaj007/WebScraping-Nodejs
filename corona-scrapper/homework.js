const request=require("request");
const cheerio=require("cheerio")
const chalk=require("chalk");
request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard',cb);

function cb(error,response,html){
    if(error){

        console.log('error:',error);
    }else{

      
        //console.log("hyml:",html);
        handlehtml(html);
    }
}

function handlehtml(html){
let selTool=cheerio.load(html);

let ccarray=selTool(".best-player-name a");

console.log(ccarray.length);

let total=selTool(ccarray[0]).text();
console.log(chalk.magenta("Man of the match = ",total));

}