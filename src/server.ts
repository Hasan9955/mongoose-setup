import app from "./app";
import config from "./app/config"; 
// getting-started.js
import mongoose from "mongoose";
 

async function main() {
  try {
    await mongoose.connect(config.mongo_url as string);

  app.listen(config.port, () => { 
    console.log(`App is listening on PORT ${config.port}`)
  })
  } catch (error) {
    console.log("An Error is going on server");
    console.log(error);
    
  }
  
}


main();


