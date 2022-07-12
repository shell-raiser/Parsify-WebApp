// requires 'fs' and "pdf-img-convert"

// I'm trying this as most OCR stuff takes photos instead of PDF as input

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

const config = {
    lang: "eng guj", // default
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
                const img = "output" + i + ".png"
                const text = await tesseract.recognize(img,config)
                console.log("Result:", text)
            } catch (error) {
                console.log(error.message)
            }
        }
        main()
        // Tesseract.recognize(
        //     outputImages[i],
        //     'eng',
        //     'guj',
        //     { logger: m => console.log(m) }
        // ).then(({ data: { text } }) => {
        //     console.log(text);
        // })
    }




});