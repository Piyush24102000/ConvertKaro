// import multer from 'multer';
// const util = require('util');
// import imagemin from 'imagemin';
// import imageminMozjpeg from 'imagemin-mozjpeg';
// const upload = multer();

// export const config = {
//     api: {
//         bodyParser: false,
//         responseLimit: false,

//     },
// };

// export default async function handler(req, res) {
//     switch (req.method) {
//         case 'POST':
//             await bufferImage(req, res)
//             break;
//     }
// }

// const bufferImage = async (req, res) => {
//     try {
//         const multerMiddleware = util.promisify(upload.single('image'));
//         await multerMiddleware(req, res);
//         const fileBuffer = req.file.buffer;

//         // Get the desired file size from the request parameters
//         const desiredSize = parseInt(req.query.size) || 1000
//         // const desiredSize = 400

//         const maxIterations = 8; // set a maximum number of iterations
//         let quality = 75;
//         let compressedBuffer = null;
//         let iterations = 0;

//         while (compressedBuffer === null || compressedBuffer.length / 1000 > desiredSize) {
//             // check if the maximum number of iterations has been reached
//             if (iterations > maxIterations) {
//                 return res.status(400).send({msg:'Unable to compress image to desired size. Please increase/decrease size'});
//             }

//             compressedBuffer = await imagemin.buffer(fileBuffer, {
//                 plugins: [
//                     imageminMozjpeg({ quality }),
//                 ],
//             });

//             quality = Math.round(quality * (desiredSize / (compressedBuffer.length / 1000)));
//             iterations++;
//         }

//         // Convert the compressed image buffer to a base64 data URL
//         const base64Image = compressedBuffer.toString('base64');
//         const dataUrl = `data:image/jpeg;base64,${base64Image}`;

//         // Send the data URL as a response
//         const responseObj = {
//             dataUrl,
//         };
//         return res.status(200).json(responseObj);

//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send("An error occurred while uploading the file.");

//     }
// }
