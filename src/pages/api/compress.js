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
      await bufferImage(req, res)
      break;
  }
}

const bufferImage = async (req, res) => {
  try {
    const multerMiddleware = util.promisify(upload.single('image'));
    await multerMiddleware(req, res);
    const fileBuffer = req.file.buffer;
    const desiredSize = parseInt(req.query.size) || 750; // Get the desired file size from the request parameters
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();
    const originalSize = metadata.size;

    let quality = 100;
    let outputBuffer = await image.jpeg({ quality }).toBuffer();
    while (outputBuffer.length > desiredSize * 1000) {
      quality -= 10;
      if (quality < 10) break;
      outputBuffer = await image.jpeg({ quality }).toBuffer();
    }

    // Send the compressed image as a response
    const responseObj = {
      dataUrl: `data:image/jpeg;base64,${outputBuffer.toString('base64')}`,
      originalSize,
      compressedSize: outputBuffer.length,
    };
    return res.status(200).json(responseObj);

  } catch (error) {
    console.log(error.message)
    res.status(500).send("An error occurred while uploading the file.");

  }
}