import multer from 'multer';
import sharp from 'sharp'
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
            await convertImage(req, res)
            break;
    }
}

const convertImage = async (req, res) => {
    try {
        const multerMiddleware = util.promisify(upload.single('image'));
        await multerMiddleware(req, res);
        const fileBuffer = req.file.buffer;
        const fileFormat = req.query.format

        const convertedBuffer = await sharp(fileBuffer)
            .toFormat(fileFormat)
            .toBuffer();


        // Send the converted image buffer back as a binary response
        res.setHeader('Content-Type', `image/${fileFormat}`);
        res.setHeader('Content-Disposition', `attachment; filename=converted.${fileFormat}`);
        return res.status(200).send(convertedBuffer);
        
        
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}
