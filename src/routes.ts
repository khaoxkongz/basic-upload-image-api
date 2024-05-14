import express from 'express';

import { uploadHandler } from './handlers';
import { multerUploads } from './config/multerConfig';

const router = express.Router();

router.post('/upload', multerUploads, uploadHandler);

export default router;
