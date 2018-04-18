const express = require('express');
const players = require('../models/player-model')
const route = express.Router()
//Players Specific APIS

route.get('/player/:player_Id', (req, res)=>{
    let query = {
        'Player_Id' : req.params.player_Id
    }
    players.getPlayer(query).then(data=>{
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

//Get two players

route.get('/orangecap/:orange_cap_Id/purplecap/:purple_cap_Id/mos/:man_of_the_series_Id', (req, res)=>{
    let query = { $or: [
            {'Player_Id' : req.params.orange_cap_Id},
            {'Player_Id' : req.params.purple_cap_Id},
            {'Player_Id' : req.params.man_of_the_series_Id}
        ]
    }
    players.getPlayer(query).then(data=>{
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