import mongoose from 'mongoose'

import {app} from './app'

const start = async () => {
  if (!process.env.JWT_KEY){
    throw new Error('process.env.JWT_KEY not found')
  }

  if (!process.env.MONGO_URI){
    throw new Error('process.env.MONGO_URI not found')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('DB::OK')
  } catch (error) {
    console.error(error)
  }
  
  app.listen(3000, () => {
    console.log("Listening on port ->> 3000");
  });
}

start()
