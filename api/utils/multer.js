import multer from 'multer';

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid image file type'), false);
  }
};

export default multer({ storage, fileFilter });
