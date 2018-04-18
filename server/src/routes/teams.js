const express = require('express');
const route = express.Router()

const teams = require('../models/team-model')
//Team Specific APIS

route.get('/team/:team_Id', (req, res)=>{
    let query = {
        Team_Id: req.params.team_Id
    }
    teams.getTeam(query).then(data=>{
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
//Total Teams
route.get('/', (req, res)=>{
    
    teams.getTeam().then(data=>{
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