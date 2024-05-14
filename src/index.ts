import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { getDataUriFromBuffer, multerUploads } from './config/multerConfig';
import { cloudinary } from './config/cloudinaryConfig';

const app = express();

app.use(cors());
dotenv.config();

app.post('/upload', multerUploads, async (req: Request, res: Response) => {
  if (req.file) {
    const file = req.file;
    const dataUri = getDataUriFromBuffer(file.buffer, file.mimetype);

    try {
      const result = await cloudinary.uploader.upload(dataUri);

      const image = result.secure_url;
      return res.status(200).json({
        message: 'Your image has been uploaded successfully to Cloudinary',
        data: {
          image,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Something went wrong while processing your request',
        data: {
          err,
        },
      });
    }
  } else {
    return res.status(400).json({
      message: 'No file was provided',
    });
  }
});

app.listen(8881, () => console.log(`Server is listening up at 8881`));
