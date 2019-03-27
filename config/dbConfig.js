const mongoose = require("mongoose");
const User = require('../models/userModel');

mongoose.Promise = global.Promise;

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

gracefulShutdown = (msg, callback) => {
  console.log("Mongoose disconnected through " + msg);
  callback();
};

process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", () => {
  gracefulShutdown("app termination", function() {
    process.exit(0);
  });
});

module.exports = {
  User
};