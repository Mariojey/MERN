import "dotenv/config";
import env from './util/envValidation.ts';
import mongoose from "mongoose";

import app from "./app.ts";

mongoose.connect(env.DB_URL!).then(() => {
  console.log("Dd connected");

  app.listen(5000, () => {
    console.log(`Server running on 5000`);
  });
}).catch(console.error);
