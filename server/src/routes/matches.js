const express = require('express');
const matches = require('../models/match-model')
const route = express.Router()
//Match Specific APIS

route.get('/seasonid/:season_Id', (req, res)=>{
    let query = {
        Season_Id: req.params.season_Id,
    }
    matches.getMatch(query).then(data=>{
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