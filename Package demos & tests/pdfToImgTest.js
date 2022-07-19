
var pdf2img = require('pdf-img-convert');
// Both HTTP and local paths are supported
var outputImages1 = pdf2img.convert('https://firhtml.s3-us-west-2.amazonaws.com/d5ffa24cc24c635c2105d05f31f03ecd'
    , {
        width: 2480, //Number in px
        height: 3508, // Number in px
    }
);
// var outputImages2 = pdf2img.convert('../pdf_in_local_filesystem.pdf');

// From here, the images can be used for other stuff or just saved if that's required:

var fs = require('fs');
// const Tesseract = require('tesseract.js')
const tesseract = require("node-tesseract-ocr")

const tessConfig = {
    lang: "eng+hin+tam+pan+ori+mar+mal+kan+guj+tel", // default
    oem: 3,
    psm: 3,
}




outputImages1.then(function (outputImages) {
    for (i = 0; i < outputImages.length; i++) {
        fs.writeFile("output" + i + ".png", outputImages[i], function (error) {
            if (error) { console.error("Error: " + error); }
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
                fs.writeFile(appRoot + "outputText.txt", text, function (error) {
                    if (error) { console.error("Error: " + error); }
                });
                console.log("ALL DONE")
                fs1.remove(appRoot + "/public/temp", (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Temp Folder Deleted Successfully !!");
                    }
                });
            }
        }
        theTextCalc()
    }




});