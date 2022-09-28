const mongoose = require("mongoose");

class Database {
  constructor() {
    mongoose
      .connect(
        "mongodb+srv://arun:arun@cluster0.xvzskfi.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log("databse not connected", err);
      });
  }
}

module.exports = new Database();
