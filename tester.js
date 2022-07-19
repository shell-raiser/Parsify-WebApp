const Sanscript = require("@sanskrit-coders/sanscript")
var fs = require('fs');
const fs1 = require("fs-extra");
const tesseract = require("node-tesseract-ocr");
var path = require('path');
global.appRoot = path.resolve(__dirname);
var pdf2img = require('pdf-img-convert');
const { text } = require("express");

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

const csv = require('csv-parser')

const results = [];

fs.createReadStream('./Output Template (1).csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        function parseString(theString) {
            let dist_name_org = theString.substring(theString.search('District') + 'District'.length, theString.search('Police Station'))
            let police_station_org = theString.substring(theString.search('Police Station') + 'Police Station'.length, theString.indexOf('FIR', 10) - 5)
            let fir_date = theString.substring(theString.search('Date') + 'Date '.length, theString.search('Date') + "07/04/2019".length + 'Date '.length)

            let fir_no = theString.substring(theString.search('FIR No.') + 'FIR No.'.length, theString.search('Date'))

            let accused_name_1_org = theString.substring(theString.search('Accused Name') + 'Accused Name'.length, theString.search('Age'))

            let act_org = theString.substring(theString.search('Act') + 'Act'.length, theString.search('Sections'))

            let complaint_informan_father_husband_name_org = theString.substring(theString.search("Father's/") + "Father's/".length, theString.search("Father's/") + "Father's/".length + 20)
            // let complaint_informan_father_husband_name = theString.substring(theString.search("Father's/")+"Father's/".length,theString.search('\('))

            let complaint_informan_name_org = theString.substring(theString.indexOf("Name ASI", 1000) + 'Name ASI'.length, theString.search('Name ASI') + 'Name ASI'.length + 11)

            let complaint_informan_nationality_org = theString.substring(theString.search('Nationality') + 'Nationality'.length, theString.search('Nationality') + 'Nationality'.length + 8)
            let date = theString.substring(theString.search('Date') + 'Date'.length, theString.search('Date') + 'Date'.length + 11)

            let details_address_1_org = theString.substring(theString.search('Address') + 'Address'.length, theString.search('Address') + 'Address'.length + 50)




            let occupation_org = theString.substring(theString.search('Occupatio') + 'Occupatio'.length, theString.indexOf('Address', 1200))


            let occurrence_of_offence_date_from = theString.substring(theString.search('Date from ') + 'Date from '.length, theString.search('Date to ') + "07/04/2019".length + 'Date to '.length)
            let occurrence_of_offence_time_from = theString.substring(theString.search('Time from'), theString.search('Time to') + 'Time from'.length, theString.search('Informatior received at PS'))
            let occurrence_of_offence_date_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Informatior received at PS'))
            let occurrence_of_offence_time_period = theString.substring(theString.search('Time Period') + " ", theString.search('Time from'))//doubt
            let occurrence_of_offence_time_to = theString.substring(theString.search('Time to') + 'Time to'.length, theString.search('Time to') + "19:10".length + 'Time to'.length)


            let place_of_occurrence_name_of_police_station_org = theString.substring(theString.search('Name of P.S. District') + 'Name of P.S. District'.length, theString.search('Complainan/Informan'))


            let sections = theString.substring(theString.search('Sections') + 'Sections'.length, theString.search('Sections') + 'Sections'.length + 13)


            let year = date.substring(date.length - 4);

            let op = {
                
                "dist_name_org": dist_name_org,
                "police_station_org": police_station_org,
                "fir_date": fir_date,
                "fir_no": fir_no,
                "state": "",
                "accused_name_1": accused_name_1,
                "act_org": act_org,
                "complaint_informan_father_husband_name_org": complaint_informan_father_husband_name_org,
                "complaint_informan_name_org": complaint_informan_name_org,
                "complaint_informan_nationality_org": complaint_informan_nationality_org,
                "date": date,
                "details_address_1_org": details_address_1_org,
                "dist_name_pdf_org": dist_name_org,
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
        for (let j = 0; j < results.length; j++) {
            // console.log(results[i]["pdf link"])
            var outputImages = pdf2img.convert(results[j]["pdf link"]
                , {
                    width: 2480,
                    height: 3508,
                }
            );

            const tessConfig = {
                lang: "eng+hin+tam+pan+ori+mar+mal+kan+guj+tel",
                oem: 3,
                psm: 3,
            }

            let theText = "";
            let inCount = 0;
            let outCount = 0;
            fs.mkdir(appRoot + "/public/temp"+j, { recursive: true }, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    // console.log("Temp Directory created successfully !!");
                }
            });
            outputImages.then(function (outputImages) {
                for (i = 0; i < outputImages.length; i++) {
                    // console.log(i)
                    fs.writeFile(appRoot + "/public/temp"+ j +"/output" + i  + ".png", outputImages[i], function (error) {
                        if (error) { console.error("Error: " + error); }
                        // console.log("IMG REND")
                    });

                    async function main() {
                        try {
                            //const images = outputImages
                            //const text = await tesseract.recognize(images)
                            const img = appRoot + "/public/temp"+ j +"/output" + i + ".png"
                            var text = await tesseract.recognize(img, tessConfig)
                            // theText = theText + text;
                            inCount++;
                            // fs.writeFile(appRoot + "/public/temp/outputText" + inCount + ".txt", text, function (error) {
                            //     if (error) { console.error("Error: " + error); }
                            // });
                            // console.log('running' + inCount)

                            return (text)

                        } catch (error) {
                            console.log(error.message)
                        }
                    }

                    async function theTextCalc() {
                        let text = await main()
                        theText = theText + text;
                        // console.log(text)
                        outCount++;
                        if (outCount == outputImages.length) {
                            console.log("ALL DONE"+ j)
                            fs1.remove(appRoot + "/public/temp"+ j, (error) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    // console.log("Temp Folder Deleted Successfully !!");
                                }
                            });
                            console.log(parseString(theText))

                        }
                    }
                    theTextCalc()
                }

            });

        }


        // API for batch processing



    });