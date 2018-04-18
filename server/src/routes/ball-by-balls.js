const express = require('express');
const matches = require('../models/ball-by-ball-model')
const route = express.Router()

//Ball by Ball Stats Specific APIS
//Per ball stats by Match

route.get('/match/:match_Id', (req, res)=>{
    matches.getBallByBall({'Match_Id':req.params.match_Id}).then(data=>{
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

//Per ball stats by Match && Inning

route.get('/match/:match_Id/inning/:inning_Id', (req, res)=>{
    let query = {
        Match_Id: req.params.match_Id,
        Innings_Id:req.params.inning_Id
    }
    matches.getBallByBall(query).then(data=>{
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

//Per ball stats by Match && inning && over

route.get('/match/:match_Id/inning/:inning_Id/over/:over_Id', (req, res)=>{
    let query = {
        Match_Id: req.params.match_Id,
        Innings_Id:req.params.inning_Id,
        Over_Id:req.params.over_Id
    }
    matches.getBallByBall(query).then(data=>{
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

//Per ball stats by Match && over

route.get('/match/:match_Id/over/:over_Id', (req, res)=>{
    let inning = 1;
    let over = req.params.over_Id
    if(req.params.over_Id > 20){
        inning = 2;
        over = req.params.over_Id - 20;
    }
    let query = {
        Match_Id: req.params.match_Id,
        Innings_Id:inning,
        Over_Id:over
    }
    matches.getBallByBall(query).then(data=>{
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