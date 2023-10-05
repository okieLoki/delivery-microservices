import mongoose from "mongoose";

const dbConnect = async () => {

  mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log('Database connected');
    }
    ).catch((err) => {
      console.error(err);
    })
}

export { dbConnect }