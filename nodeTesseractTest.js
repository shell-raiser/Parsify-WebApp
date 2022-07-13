const tesseract = require("node-tesseract-ocr")

const config = {
    lang: "eng+guj", // default
    oem: 3,
    psm: 3,
}

async function main() {
    try {
        //const images = ["./samples/file1.png", "./samples/file2.png"]
        //const text = await tesseract.recognize(images)
        const img = "output0.png"
        const text = await tesseract.recognize(img)
        console.log(text)
    } catch (error) {
        console.log(error.message)
    }
}

main()