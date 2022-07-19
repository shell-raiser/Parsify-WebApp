const { exec } = require("child_process");
var fs = require('fs');
const csv = require('csv-parser')
const results = [];
fs.createReadStream('/workspace/Parsify-WebApp/Output Template (1).csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        for (let j = 0; j < results.length; j++) {
            exec("wget -P ./Sample-PDFs "+results[j]["pdf link"]+" -O "+j+".pdf", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
    })