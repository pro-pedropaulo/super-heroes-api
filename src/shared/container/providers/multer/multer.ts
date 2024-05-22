import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve(process.env.UPLOAD_PATH ?? 'tmp');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const randomId = uuidv4();
    const filename = `${randomId}.${file.originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
