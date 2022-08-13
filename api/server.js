import express from 'express';
import cors from 'cors';
import dbConnect, { Photo } from './utils/mongose.js';
import multer from './utils/multer.js';
import cloudinary from './utils/cloudinary.js';
import * as dotenv from 'dotenv';
dotenv.config();

const APP_NAME = process.env.APP_NAME || 'My Unsplash';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => res.send('Hello World!'));

app.get('/photos', (req, res) => {});

app.post('/photos', multer.single('photo'), async (req, res) => {
  const photo = req.file;
  const label = req.body.label;

  if (!photo) {
    return res.status(400).send({ status: 'error', message: 'Photo not provided' });
  }

  const folder = APP_NAME.split(' ').join('-').toLowerCase() + '/photos';
  try {
    const result = await cloudinary.uploader.upload(photo.path, { folder });
    const photoResult = await Photo.create({
      label,
      url: result.secure_url,
      public_id: result.public_id,
    });
    return res.status(201).json({ status: 'success', data: photoResult });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', message: err.message });
  }

  return res.send('oke');
});

app.delete('/photos/d/:label', (req, res) => {});

const PORT = process.env.PORT || 8080;

dbConnect(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
