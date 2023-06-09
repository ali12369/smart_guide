const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/pfe")
    .then((data) => {
      console.log(`mongod connected `);
    });
};

module.exports = connectDatabase;