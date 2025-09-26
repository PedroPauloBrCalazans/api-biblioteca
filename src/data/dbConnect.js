import mongoose from "mongoose";

async function connectDataBase() {
  mongoose.connect(process.env.DATABASE);

  return mongoose.connection;
}

export default connectDataBase;
