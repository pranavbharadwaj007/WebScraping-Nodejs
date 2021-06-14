const request=require("request");
const cheerio=require("cheerio")
const chalk=require("chalk");
request('https://www.worldometers.info/coronavirus',cb);

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
let h1s=selTool("h1");
let ccarray=selTool("#maincounter-wrap span");
// for(let i=0;i<ccarray.length;i++){
//   let data=  selTool(ccarray[i]).text();
//   console.log("Data =" ,data)
// }
let total=  selTool(ccarray[0]).text();
let death=  selTool(ccarray[1]).text();
let recovery=  selTool(ccarray[2]).text();
// console.log(chalk.bgMagenta("Total cases = ",total));
// console.log(chalk.bgRed("Total death = ",death));
// console.log(chalk.bgGreen("Total recovery = ",recovery));
console.log(chalk.magenta("Total cases = ",total));
console.log(chalk.red("Total death = ",death));
console.log(chalk.green("Total recovery = ",recovery));
}