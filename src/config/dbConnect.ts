import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose.connect('mongodb://localhost:27017/food-delivery')
    .then(() => {
      console.log('Database connected');
    }
    ).catch((err) => {
      console.error(err);
    })
}

export { dbConnect }