const mongoose = require("mongoose");
const BallByBall = require('./schemas').ballByBall;

let getBallByBall = function(query) {
  return new Promise((res, rej) => {
    BallByBall.find(query,(err, ballByBall) => {
      if (ballByBall) {
        res(ballByBall);
      }
      if (err) {
        rej(err);
      }
    });
  });
};
module.exports.getBallByBall = getBallByBall;