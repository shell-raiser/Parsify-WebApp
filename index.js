const Sanscript = require("@sanskrit-coders/sanscript")
const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");


console.log(Sanscript.t('ಹೇಲ್ಲೋ', 'kannada', 'hk'));
console.log(Sanscript.t('హేల్లో', 'telugu', 'hk'));
console.log(Sanscript.t('ஹேல்லோ', 'tamil', 'hk'));


const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        console.log(result.text);
        res.send(result.text);
    });
});

app.listen(3000);