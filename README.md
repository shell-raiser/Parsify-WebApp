# Parsify
A Web App and API made for the [Codefiesta 2022](https://unstop.com/hackathon/codefiesta-sir-m-visvesvaraya-institute-of-technology-smvit-bengaluru-364352) Hackathon

### AWS Hosting 
It is hosted on AWS for demoing http://ec2-54-174-113-31.compute-1.amazonaws.com:3000 <br>
It takes time to OCR the PDF after uploading. Have Patience 😄 <br>
For now, this works great only for PDFs in [this format](https://firhtml.s3-us-west-2.amazonaws.com/d5ffa24cc24c635c2105d05f31f03ecd)

## Problem statement: PDF parser for FIR copy
There are crores of FIR copies stored in pdf’s from all over india in various states which are present in regional languages which need to be parsed and the information need to collected.


## Our Solution:
* A Web App for uploading a PDF (or a PDF URL) and obtaining a JSON String with all the necessary info about the FIR, nicely formatted inside the HTML page, available for copy-pasting.

* An API for batch-processing multiple files and getting JSON Object as a response. Which can be directly stored in a NoSQL DB like MongoDB.


---

## Development
This project is meant to be run on a Ubuntu (Or some specific Debian distros) server. It is possible to run it on other platforms, although, its not as straight forward as this.
<br>
- clone repo <br>
```
git clone https://github.com/shell-raiser/codefiesta-web-app.git
```

- Install all dependencies and packages
```
sudo apt-get install tesseract-ocr -y; npm install; sudo wget -P /usr/share/tesseract-ocr/4.00/tessdata/ https://github.com/tesseract-ocr/tessdata/raw/4.00/hin.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/tam.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/pan.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/ori.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/mar.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/mal.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/kan.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/guj.traineddata   https://github.com/tesseract-ocr/tessdata/raw/4.00/tel.traineddata
```

- run the below command to start the server
```
npm start
```
and open ```localhost:3000``` in browser to view the website

## Presentation Link
* shorturl.at/kn014

## Made By Team - Tense Turtles
* [K S SHAILESH](https://github.com/shell-raiser)
* [THANMAI SAI P](https://github.com/thanmaisai)
* [SANJAY C HIREMATH](https://github.com/beast-sanjay)
