import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    console.log("Trying to connect to db ...");
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("database sucessfully connected");
  } catch (e) {
    console.log("database connnection failed : ", e);
    process.exit(1);
  }
}

export default dbConnect;
