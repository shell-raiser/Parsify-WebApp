const Sanscript = require("@sanskrit-coders/sanscript")
const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

app.get('/', serveHTML);
function serveHTML(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

console.log(Sanscript.t('ಹೇಲ್ಲೋ', 'kannada', 'hk'));
console.log(Sanscript.t('హేల్లో', 'telugu', 'hk'));
console.log(Sanscript.t('ஹேல்லோ', 'tamil', 'hk'));



// app.use("/", express.static("public"));
app.use('/public',express.static(__dirname + '/public'));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        console.log(result.text);
        // We can transliterate text like this 
        //translitedText = Sanscript.t(result.text, 'kannada', 'hk')
        //res.send(translitedText);
        res.send(result.text);
    });
});

app.listen(3000);