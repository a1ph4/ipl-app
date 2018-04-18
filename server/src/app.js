const express = require('express')
const cors = require('cors')
const connection = require('./models/connection')
const seasonsApi = require("./routes/seasons")
const teamsApi = require("./routes/teams")
const playersApi = require("./routes/players")
const playerMatchesApi = require("./routes/player-matches")
const matchesApi = require("./routes/matches")
const ballByBallsApi = require("./routes/ball-by-balls")
const app = express();
app.use(cors())
const route = express.Router();
app.use(express.json())
const port = process.env.PORT || 80;
app.use('/api/seasons', seasonsApi)
app.use('/api/teams', teamsApi)
app.use('/api/players', playersApi)
app.use('/api/playermatches', playerMatchesApi)
app.use('/api/matches', matchesApi)
app.use('/api/ballbyballs', ballByBallsApi)

app.get('/',(rwq, res)=>{
    res.send({
        test: 'test'
    })
})
app.listen(port, ()=>{
    console.log('server running on 1337')
});

connection.connectDb().then((res)=>{
    console.log(res)
})