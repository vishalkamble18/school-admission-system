import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let gfsBucket;

mongoose.connection.once("open", () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  console.log("✅ GridFS initialized");
});

export { gfsBucket };
