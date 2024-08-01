import app from "./app";
import config from "./app/config"; 
// getting-started.js
import mongoose from "mongoose";
import {Server} from 'http';


let server: Server;

async function main() {
  try {
    await mongoose.connect(config.mongo_url as string);

  server = app.listen(config.port, () => { 
    console.log(`App is listening on PORT ${config.port}`)
  })
  } catch (error) {
    console.log("An Error is going on server");
    console.log(error);
    
  }
  
}


main();


process.on('unhandledRejection', () =>{
  console.log('😈 unhandledRejection is detected. Shutting down...');

  if(server){
    server.close(() =>{
      process.exit(1)
    })
  }

  process.exit(1)
})

process.on('uncaughtException', () =>{
  console.log('😈 uncaughtException is detected. Shutting down...');

  process.exit(1);
})


