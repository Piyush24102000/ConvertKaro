import multer from 'multer';
const Tesseract = require('tesseract.js');
const util = require('util');
const upload = multer();

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
};

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            await imgToText(req, res)
            break;
    }
}
const imgToText = async (req,res) => {
    try {
        const multerMiddleware = util.promisify(upload.single('image'));
        await multerMiddleware(req, res);
        const fileBuffer = req.file.buffer;
        const result = await Tesseract.recognize(fileBuffer, 'eng');
        return res.status(200).send(result.data.text);

    } catch (error) {
        console.log(error.message) 
        return res.status(500).send(error.message);

    }
}