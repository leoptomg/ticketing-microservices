import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'xpto'

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let item of collections){
        await item.deleteMany({})
    }
});

afterAll(async()=>{
    await mongo.stop()
    await mongoose.connection.close()
})