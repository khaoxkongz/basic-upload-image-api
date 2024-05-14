import multer from 'multer';

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const getDataUriFromBuffer = (buffer: Buffer, mimeType: string): string => {
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
};

export { multerUploads, getDataUriFromBuffer };
