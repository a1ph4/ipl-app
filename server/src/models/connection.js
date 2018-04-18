const mongoose = require("mongoose");

const uri =
  "mongodb://ipldatauser:90iopklbnm@ipldata-shard-00-00-j2c7q.mongodb.net:27017,ipldata-shard-00-01-j2c7q.mongodb.net:27017,ipldata-shard-00-02-j2c7q.mongodb.net:27017/ipldata?ssl=true&replicaSet=ipldata-shard-0&authSource=admin";

let connectDb = function() {
return new Promise((res, rej) => {
    mongoose.connect(uri);
    let db = mongoose.connection;
    db.on("error", err => rej(err));
    db.once("open", () => {
      res('connected');
    });
});
};
module.exports.connectDb = connectDb;