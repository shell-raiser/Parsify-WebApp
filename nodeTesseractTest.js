const tesseract = require("node-tesseract-ocr")

const config = {
    lang: "eng", // default
    oem: 3,
    psm: 3,
}

async function main() {
    try {
        //const images = ["./samples/file1.png", "./samples/file2.png"]
        //const text = await tesseract.recognize(images)
        const img = "https://tesseract.projectnaptha.com/img/eng_bw.png"
        const text = await tesseract.recognize(img)
        console.log("Result:", text)
    } catch (error) {
        console.log(error.message)
    }
}

main()