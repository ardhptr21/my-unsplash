import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my-unsplash';

function dbConnect(cb) {
  mongoose.connect(connectionURI, { autoIndex: true }, (err) => {
    if (err) {
      console.log(err);
      return false;
    }

    console.log('MongoDB connected');
    cb();
  });
}

export const Photos = mongoose.model(
  'Photos',
  new mongoose.Schema(
    {
      label: String,
      url: String,
    },
    {
      timestamps: true,
    }
  )
);

export default dbConnect;
