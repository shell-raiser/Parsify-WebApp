# codefiesta-web-app
**Problem statement:** PDF parser for FIR copy <br>
There are crores of FIR copies  stored in pdf’s from all over india in various states which are present in regional languages which need to be parsed and the information need to collected.

solution:<br>
* A Web App for uploading a PDF (or a PDF URL) and obtaining a JSON String with all the necessary info about the FIR, nicely formatted inside the HTML page, available for copy-pasting.

* An API for batch-processing multiple files and getting JSON Object as a response. Which can be directly stored in a NoSQL DB like MongoDB.


---

# Development
This project is meant to be run on a Ubuntu (Or some specific Debian distro) server. It is possible to run it on other platforms if you know what you are doing.
<br>

---
- clone repo <br>
```
git clone https://github.com/shell-raiser/codefiesta-web-app.git
```

- Install all dependencies and packages
```
sudo apt-get install tesseract-ocr -y; npm install; sudo wget -P /usr/share/tesseract-ocr/4.00/tessdata/ https://github.com/tesseract-ocr/tessdata/raw/4.00/hin.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/tam.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/pan.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/ori.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/mar.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/mal.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/kan.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/guj.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/tel.traineddata
```

- run `npm start` and open ```localhost:3000``` in browser

## Road map
- Parsing
- Transliteration
- JSON Formatting 

## AWS Hosting 
- http://ec2-54-174-113-31.compute-1.amazonaws.com:3000

## Team Tense Turtles
* K S SHAILESH
* THANMAI SAI P
* SANJAY C HIREMATH
