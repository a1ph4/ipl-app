const mongoose = require("mongoose");
const PlayerMatch = require('./schemas').playerMatch;

let getPlayerMatch = function(query) {
  return new Promise((res, rej) => {
    PlayerMatch.find(query,(err, playerMatch) => {
      if (playerMatch) {
        res(playerMatch);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getPlayerMatch = getPlayerMatch;