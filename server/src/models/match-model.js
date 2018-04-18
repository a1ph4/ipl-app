const mongoose = require("mongoose");
const Match = require('./schemas').match;

let getMatch = function(query) {
  return new Promise((res, rej) => {
    Match.find(query).sort('Match_Id').exec((err, matches) => {
      if (matches) {
        res(matches);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getMatch = getMatch;
