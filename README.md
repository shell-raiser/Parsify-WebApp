# codefiesta-web-app
**Problem statement:** PDF parser for FIR copy <br>
There are crores of FIR copies  stored in pdf’s from all over india in various states which are present in regional languages which need to be parsed and the information need to collected.

solution:<br>
* Since the FIR copies collected are in regional languages we will need to extract the information and translate them to standard english 
* Extracting the information can by done using OCR (Optical character recognition). 
* Once information is collected we can parse the information and extract the required fields from the information and store it  

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