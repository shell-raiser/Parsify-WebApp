FROM ubuntu:latest 

WORKDIR /app
RUN apt-get update && apt-get install nodejs npm tesseract-ocr wget -y 

RUN wget -P /usr/share/tesseract-ocr/4.00/tessdata/ https://github.com/tesseract-ocr/tessdata/raw/4.00/hin.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/tam.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/pan.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/ori.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/mar.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/mal.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/kan.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/guj.traineddata https://github.com/tesseract-ocr/tessdata/raw/4.00/tel.traineddata

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000



CMD [ "npm", "start" ]