const express = require('express');
const seasons = require('../models/season-model')
const route = express.Router()
//Seasons Specific APIS

route.get('/', (req, res)=>{
    seasons.getSeason().then(data=>{
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

module.exports = route;