const mongoose = require("mongoose");
const Player = require('./schemas').player;

let getPlayer = function(query) {
  return new Promise((res, rej) => {
    Player.find(query,(err, players) => {
      if (players) {
        res(players);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getPlayer = getPlayer;
