import multer from 'multer';
import DatauriParser from 'datauri/parser';
import path from 'path';

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

const dataUri = file => {
  const dUri = new DatauriParser();
  return dUri.format(path.extname(file.originalname).toString(), file.buffer);
};

export { upload, dataUri };
