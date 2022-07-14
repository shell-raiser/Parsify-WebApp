const cheerio = require('cheerio'); 
var fs = require('fs');
const $ = cheerio.load(fs.readFileSync('index.html'));
// $('#resultText').text() = "Something"
$('#resultText').text("Something")
console.log($.html())
// console.log($('#resultText').text())