const Sanscript = require("@sanskrit-coders/sanscript")
var cors = require('cors');
const multer = require('multer')
const upload = multer({ dest: './public/data/uploads/' })
const express = require("express");
const app = express();
app.use(cors());
const fileUpload = require("express-fileupload");


app.get('/', serveHTML);
function serveHTML(req, res) {
    res.sendFile(__dirname + '/views/index.html');
}

console.log(Sanscript.t('ಹೇಲ್ಲೋ', 'kannada', 'hk'));
console.log(Sanscript.t('హేల్లో', 'telugu', 'hk'));
console.log(Sanscript.t('ஹேல்லோ', 'tamil', 'hk'));



// app.use("/", express.static("public"));
app.use('/public', express.static(__dirname + '/public'));
app.use(fileUpload());

app.post("/extractOne", upload.single('upfile'), (req, res) => {
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;
    const fileSize = req.file.size;
    if (fileType == "application/pdf"){
        res.send(result.text);
    }
    else if(fileType == "text/csv"){
        res.send(result.text);
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