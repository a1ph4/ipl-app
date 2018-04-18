const mongoose = require("mongoose");
const Season = require('./schemas').seasons;

let getSeason = function(query) {
  return new Promise((res, rej) => {
    Season.find(query).sort('Season_Id').exec((err, seasons) => {
      if (seasons) {
        res(seasons);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getSeason = getSeason;
