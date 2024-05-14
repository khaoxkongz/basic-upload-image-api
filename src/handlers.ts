import { Request, Response } from 'express';

import { cloudinary } from './config/cloudinaryConfig';
import { getDataUriFromBuffer } from './config/multerConfig';

export const uploadHandler = async (req: Request, res: Response) => {
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
};
