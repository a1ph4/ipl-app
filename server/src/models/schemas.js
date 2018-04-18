const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let playerSchema = mongoose.Schema(
  {
    Player_Id: Number,
    Player_Name: String,
    DOB: String,
    Batting_Hand: String,
    Bowling_Skill: String,
    Country: String,
    Is_Umpire: Number
  },
  {
    collection: "players"
  }
);

let teamSchema = mongoose.Schema(
{
    Team_Id: Number,
    Team_Name: String,
    Team_Short_Code: String
},
{
    collection: "teams"
}
);

let seasonSchema = mongoose.Schema(
{
    Season_Id: Number,
    Season_Year: Number,
    Orange_Cap_Id: Number,
    Purple_Cap_Id: Number,
    Man_of_the_Series_Id: Number
},
{
    collection: "seasons"
}
);

let playerMatchSchema = mongoose.Schema(
{
    Match_Id: Number,
    Player_Id: Number,
    Team_Id: Number,
    Is_Keeper: Number,
    Is_Captain: Number
},
{
    collection: "playerMatches"
}
);


let matchSchema = mongoose.Schema(
{
    Match_Id: Number,
    Match_Date: String,
    Team_Name_Id: Number,
    Opponent_Team_Id: Number,
    Season_Id: Number,
    Venue_Name: String,
    Toss_Winner_Id: Number,
    Toss_Decision: String,
    IS_Superover: Number,
    IS_Result: Number,
    Is_DuckWorthLewis: Number,
    Win_Type: String,
    Won_By: Number,
    Match_Winner_Id: Number,
    Man_Of_The_Match_Id: Number,
    First_Umpire_Id: Number,
    Second_Umpire_Id: Number,
    City_Name: String,
    Host_Country: String
},
{
    collection: "matches"
}
);


let ballByBallSchema = mongoose.Schema(
{
    Match_Id: Number,
    Innings_Id: Number,
    Over_Id: Number,
    Ball_Id: Number,
    Team_Batting_Id: Number,
    Team_Bowling_Id: Number,
    Striker_Id: Number,
    Striker_Batting_Position: Number,
    Non_Striker_Id: Number,
    Bowler_Id: Number,
    Batsman_Scored: Number,
    Extra_Type: String,
    Extra_Runs: Number,
    Player_dissimal_Id: Number,
    Dissimal_Type: String,
    Fielder_Id: Number
},
{
    collection: "ballByBalls"
}
);

let BallByBall = module.exports.ballByBall = mongoose.model("BallByBall", ballByBallSchema);
let Match = module.exports.match = mongoose.model("Match", matchSchema);
let PlayerMatch = module.exports.playerMatch = mongoose.model("PlayerMatch", playerMatchSchema);
let Season = module.exports.seasons = mongoose.model("Season", seasonSchema);
let Team = module.exports.team = mongoose.model("Team", teamSchema);
let Player = module.exports.player = mongoose.model("Player", playerSchema);

