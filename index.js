const Sanscript = require("@sanskrit-coders/sanscript")
var cors = require('cors');
const multer = require('multer')
const express = require("express");
const app = express();
var fs = require('fs');
const tesseract = require("node-tesseract-ocr");
var path = require('path');
global.appRoot = path.resolve(__dirname);
app.use(cors());
// const upload = multer({ dest: './public/temp/uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
var pdf2img = require('pdf-img-convert');


app.get('/', serveHTML);
function serveHTML(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

console.log(Sanscript.t('ಹೇಲ್ಲೋ', 'kannada', 'hk'));
console.log(Sanscript.t('హేల్లో', 'telugu', 'hk'));
console.log(Sanscript.t('ஹேல்லோ', 'tamil', 'hk'));


// app.use("/", express.static("public"));
app.use('/public', express.static(__dirname + '/public'));




app.post("/extractOne", upload.single('upfile'), (req, res) => {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;
    const theFile = req.file.buffer;
    if (fileType == "application/pdf") {
        var outputImages = pdf2img.convert(theFile
            , {
                width: 2480, //Number in px
                height: 3508, // Number in px
            }
        );
        const tessConfig = {
            lang: "eng+guj", // default
            oem: 3,
            psm: 3,
        }

        let theText = " ";
        let inCount = 0;

        outputImages.then(function (outputImages) {
            for (i = 0; i < outputImages.length; i++) {
                fs.writeFile(appRoot + "/public/temp/output" + i + ".png", outputImages[i], function (error) {
                    if (error) { console.error("Error: " + error); }
                });

                async function main() {
                    try {
                        //const images = outputImages
                        //const text = await tesseract.recognize(images)
                        const img = appRoot + "/public/temp/output" + i + ".png"
                        const text = await tesseract.recognize(img, tessConfig)
                        theText = theText + text;
                        inCount++;
                        console.log('running' + inCount)
                        console.log('Ran inside');
                        // console.log(text)

                    } catch (error) {
                        console.log(error.message)
                    }
                }
                main()
            }

        });
        
        //console.log('hi')
        //console.log(theText)
        res.send(theText);


    }
    else if (fileType == "text/csv") {
        res.send('text');
    }

    // pdfParse(req.files.pdfFile).then(result => {
    //     console.log(result.text);
    //     // We can transliterate text like this 
    //     //translitedText = Sanscript.t(result.text, 'kannada', 'hk')
    //     //res.send(translitedText);
    //     res.send(result.text);
    // });
});

app.listen(3000);