const express = require('express');
const playerMatches = require('../models/player-match-model')
const route = express.Router()
//Player-Matches Specific APIS

//Get all the Matches Played By a Player

route.get('/player/:player_Id', (req, res)=>{
    let query = {
        Player_Id: req.params.player_Id
    }
    playerMatches.getPlayerMatch(query).then(data=>{
        let status = true;
        if(data.length == 0){
            status=false;
        }
        response = {
            "status":status,
            "data":data
        }
        res.send(response);
    })
    .catch((err)=>{
        response = {
            "status":false,
            "err":err
        }
        res.send(response);
    })
});

//Get all the Player from match ID

route.get('/match/:match_Id', (req, res)=>{
    let query = {
        Match_Id: req.params.match_Id
    }
    playerMatches.getPlayerMatch(query).then(data=>{
        let status = true;
        if(data.length == 0){
            status=false;
        }
        response = {
            "status":status,
            "data":data
        }
        res.send(response);
    })
    .catch((err)=>{
        response = {
            "status":false,
            "err":err
        }
        res.send(response);
    })
});
module.exports = route