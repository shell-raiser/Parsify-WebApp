const cheerio = require('cheerio');
const Sanscript = require("@sanskrit-coders/sanscript")
var cors = require('cors');
const multer = require('multer')
const express = require("express");
const app = express();
var bodyParser = require('body-parser')
var fs = require('fs');
const fs1 = require("fs-extra");
const tesseract = require("node-tesseract-ocr");
var path = require('path');
global.appRoot = path.resolve(__dirname);
app.use(cors());
// const upload = multer({ dest: './public/temp/uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
var pdf2img = require('pdf-img-convert');
const { text } = require("express");



app.get('/', serveHTML);
function serveHTML(req, res) {
    res.sendFile(__dirname + '/index.html');
}

const $ = cheerio.load(fs.readFileSync('index.html'));
// console.log($.html())
console.log(Sanscript.t('ಹೇಲ್ಲೋ', 'kannada', 'hk'));
console.log(Sanscript.t('హేల్లో', 'telugu', 'hk'));
console.log(Sanscript.t('ஹேல்லோ', 'tamil', 'hk'));


// app.use("/", express.static("public"));
app.use('/public', express.static(__dirname + '/public'));

function checkLang(i) {
    switch (i) {
        case '0':
            return { tess: "tel", ss: "telugu" }
            break;
        case '1':
            return { tess: "hin", ss: "hindi" }
            break;
        case '2':
            return { tess: "hin", ss: "hindi" };
            break;
        case '3':
            return { tess: "guj", ss: "gujarati" };
            break;
        case '4':
            return { tess: "hin", ss: "hindi" };
            break;
        case '5':
            return { tess: "kan", ss: "kannada" };
            break;
        case '6':
            return { tess: "mal", ss: "malayalam" };
            break;
        case '7':
            return { tess: "hin", ss: "hindi" };
            break;
        case '8':
            return { tess: "mar", ss: "hindi" };
            break;
        case '9':
            return { tess: "ori", ss: "hindi" };
            break;
        case '10':
            return { tess: "tam", ss: "tamil" };
            break;
        case '11':
            return { tess: "pan", ss: "hindi" };
            break;
        case '12':
            return { tess: "hin", ss: "hindi" };
            break;
        case '13':
            return { tess: "tam", ss: "tamil" };
            break;
        case '14':
            return { tess: "hin", ss: "hindi" };
            break;
    }
}


// console.log(checkLang(0).tess);

app.post("/extractOne", upload.single('upfile'), (req, res) => {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;
    const theFile = req.file.buffer;
    var theLang = checkLang(req.body.States);
    function parseString(theString) {
        let dist_name_org = theString.substring(theString.search('District') + 'District'.length, theString.search('Police Station'))
        let dist_name = Sanscript.t(dist_name_org, theLang.ss, 'hk')
        let police_station_org = theString.substring(theString.search('Police Station') + 'Police Station'.length, theString.indexOf('FIR', 10) - 5)
        let police_station = Sanscript.t(police_station_org, theLang.ss, 'hk')
        let fir_date = theString.substring(theString.search('Date') + 'Date '.length, theString.search('Date') + "07/04/2019".length + 'Date '.length)
    
        let fir_no = theString.substring(theString.search('FIR No.') + 'FIR No.'.length, theString.search('Date'))
    
        let accused_name_1_org = theString.substring(theString.search('Accused Name') + 'Accused Name'.length, theString.search('Age'))
        let accused_name_1 = Sanscript.t(accused_name_1_org, theLang.ss, 'hk');
    
        let act_org = theString.substring(theString.search('Act') + 'Act'.length, theString.search('Sections'))
        let act = Sanscript.t(act_org, theLang.ss, 'hk');
    
        let complaint_informan_father_husband_name_org = theString.substring(theString.search("Father's/") + "Father's/".length, theString.search("Father's/") + "Father's/".length + 20)
        let complaint_informan_father_husband_name = Sanscript.t(complaint_informan_father_husband_name_org, theLang.ss, 'hk');
        // let complaint_informan_father_husband_name = theString.substring(theString.search("Father's/")+"Father's/".length,theString.search('\('))
    
        let complaint_informan_name_org = theString.substring(theString.indexOf("Name ASI", 1000) + 'Name ASI'.length, theString.search('Name ASI') + 'Name ASI'.length + 11)
        let complaint_informan_name = Sanscript.t(complaint_informan_name_org, theLang.ss, 'hk');
    
        let complaint_informan_nationality_org = theString.substring(theString.search('Nationality') + 'Nationality'.length, theString.search('Nationality') + 'Nationality'.length + 8)
        let complaint_informan_nationality = Sanscript.t(complaint_informan_nationality_org, theLang.ss, 'hk');
        let date = theString.substring(theString.search('Date') + 'Date'.length, theString.search('Date') + 'Date'.length + 11)
    
        let details_address_1_org = theString.substring(theString.search('Address') + 'Address'.length, theString.search('Address') + 'Address'.length + 50)
        let details_address_1 = Sanscript.t(details_address_1_org, theLang.ss, 'hk');
        
    
    
    
        let occupation_org = theString.substring(theString.search('Occupatio') + 'Occupatio'.length, theString.indexOf('Address', 1200))
        let occupation = Sanscript.t(occupation_org, theLang.ss, 'hk');
    
    
        let occurrence_of_offence_date_from = theString.substring(theString.search('Date from ') + 'Date from '.length, theString.search('Date to ') + "07/04/2019".length + 'Date to '.length)
        let occurrence_of_offence_time_from = theString.substring(theString.search('Time from'), theString.search('Time to') + 'Time from'.length, theString.search('Informatior received at PS'))
        let occurrence_of_offence_date_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Informatior received at PS'))
        let occurrence_of_offence_time_period = theString.substring(theString.search('Time Period') + " ", theString.search('Time from'))//doubt
        let occurrence_of_offence_time_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Time to') + "19:10".length + 'Time to'.length)
    
    
        let place_of_occurrence_name_of_police_station_org = theString.substring(theString.search('Name of P.S. District') + 'Name of P.S. District'.length, theString.search('Complainan/Informan'))
        let place_of_occurrence_name_of_police_station = Sanscript.t(place_of_occurrence_name_of_police_station_org, theLang.ss, 'hk');
    
    
        let sections = theString.substring(theString.search('Sections') + 'Sections'.length, theString.search('Sections') + 'Sections'.length + 13)
    
    
        let year = date.substring(date.length - 4);
    
        let op = {
            "dist_name": dist_name,
            "dist_name_org": dist_name_org,
            "police_station": police_station,
            "police_station_org": police_station_org,
            "fir_date": fir_date,
            "fir_no": fir_no,
            "state": "",
            "accused_name_1": accused_name_1,
            "act": act,
            "act_org": act_org,
            "complaint_informan_father_husband_name": complaint_informan_father_husband_name,
            "complaint_informan_father_husband_name_org": complaint_informan_father_husband_name_org,
            "complaint_informan_name": complaint_informan_name,
            "complaint_informan_name_org": complaint_informan_name_org,
            "complaint_informan_nationality": complaint_informan_nationality,
            "complaint_informan_nationality_org": complaint_informan_nationality_org,
            "date": date,
            "details_address_1": details_address_1,
            "details_address_1_org": details_address_1_org,
            "dist_name_pdf": dist_name,
            "dist_name_pdf_org": dist_name_org,
            "occupation": occupation,
            "occupation_org": occupation_org,
            "occurrence_of_offence_date_from": occurrence_of_offence_date_from,
            "occurrence_of_offence_time_from": occurrence_of_offence_time_from,
            "occurrence_of_offence_date_to": occurrence_of_offence_date_to,
            "occurrence_of_offence_time_period": occurrence_of_offence_time_period,
            "occurrence_of_offence_time_to": occurrence_of_offence_time_to,
            "place_of_occurrence_name_of_police_station_org": place_of_occurrence_name_of_police_station_org,
            "place_of_occurrence_name_of_police_station_org": place_of_occurrence_name_of_police_station_org,
            "sections": sections,
            "year": year
        }
        return op;
    }
    if (fileType == "application/pdf") {
        var outputImages = pdf2img.convert(theFile
            , {
                width: 2480, //Number in px
                height: 3508, // Number in px
            }
        );
        
        console.log(typeof (req.body.States))
        console.log(req.body.States)
        console.log(theLang)
        
        const tessConfig = {
            lang: "eng+" + theLang.tess,
            oem: 3,
            psm: 3,
        }

        let theText = " ";
        let inCount = 0;
        let outCount = 0;
        fs.mkdir(appRoot + "/public/temp", { recursive: true }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Temp Directory created successfully !!");
            }
        });
        outputImages.then(function (outputImages) {
            for (i = 0; i < outputImages.length; i++) {
                console.log(i)
                fs.writeFile(appRoot + "/public/temp/output" + i + ".png", outputImages[i], function (error) {
                    if (error) { console.error("Error: " + error); }
                    console.log("IMG REND")
                });

                async function main() {
                    try {
                        //const images = outputImages
                        //const text = await tesseract.recognize(images)
                        const img = appRoot + "/public/temp/output" + i + ".png"
                        var text = await tesseract.recognize(img, tessConfig)
                        // theText = theText + text;
                        //console.log(theText)
                        inCount++;
                        // fs.writeFile(appRoot + "/public/temp/outputText" + inCount + ".txt", text, function (error) {
                        //     if (error) { console.error("Error: " + error); }
                        // });
                        console.log('running' + inCount)
                        // console.log('Ran inside');
                        return (text)

                    } catch (error) {
                        console.log(error.message)
                    }
                }

                async function theTextCalc() {
                    let text = await main()
                    theText = theText + text;
                    console.log(text)
                    outCount++;
                    if (outCount == outputImages.length) {
                        console.log("ALL DONE")
                        fs1.remove(appRoot + "/public/temp", (error) => {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("Temp Folder Deleted Successfully !!");
                            }
                        });
                        const $ = cheerio.load(fs.readFileSync('index.html'));
                        // $('#resultText').text() = "Something"
                        theText = parseString(theText)
                        $('#resultText').text(JSON.stringify(theText));
                        // console.log($.html())
                        console.log($('#resultText').text())
                        // res.send(parseString(theText));
                        res.send($.html());
                    }
                }
                theTextCalc()
                // theText = theText + main();
                // console.log(theText)
            }

        });

        //console.log('hi')
        //console.log(theText)




    }
    else {
        res.send('Please Upload Valid PDF');
    }

    // pdfParse(req.files.pdfFile).then(result => {
    //     console.log(result.text);
    //     // We can transliterate text like this 
    //     //translitedText = Sanscript.t(result.text, 'kannada', 'hk')
    //     //res.send(translitedText);
    //     res.send(result.text);
    // });
});

//app.listen(3000);
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});