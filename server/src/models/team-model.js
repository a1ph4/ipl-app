const mongoose = require("mongoose");
const Team = require('./schemas').team

let getTeam = function(query) {
  return new Promise((res, rej) => {
    Team.find(query,(err, team) => {
      if (team) {
        res(team);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getTeam = getTeam;
