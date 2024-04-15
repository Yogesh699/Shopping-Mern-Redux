const mongoose = require("mongoose");

mongoose.connect(
  // process.env.MONGODB_URI ||
  "mongodb+srv://mearsalan:mearsalan@cluster0.mimezxj.mongodb.net/Redux"
);

module.exports = mongoose.connection;
