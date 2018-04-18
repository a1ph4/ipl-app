<template>
<div>
  <div v-if="!loaded" class="overlay">
    <div class="ball"></div>
  </div>
  <h2>Season {{ $route.params.id }}</h2>
   <ul class="collapsible">
    <li v-for="(match,index) in matches[0]" :key="match.Match_Id">
      <div class="collapsible-header grey lighten-4 ">{{index + 1}}. {{match.Team_Name_Id}} Vs. {{match.Opponent_Team_Id}} <span class="matchdate">{{match.Match_Date}}</span></div>
      <div class="collapsible-body">

      </div>
    </li>
  </ul>
  <ul class="pagination">
      <li v-for="(page, active) in pages" :key="active" :id="active" :class="[page ? 'active' : 'waves-effect']" @click="getNext(active)"><a>{{active}}</a></li>
  </ul>
</div>
</template>

<script>

export default {
  name: 'Seasons',
  data () {
    return {
      matches: [],
      promises: [],
      err: [],
      teams: {},
      done: 1,
      pages: {},
      loaded: false
    }
  },
  methods: {
    getNext (i) {
      if (!this.pages[i] && this.pages[i] !== undefined) {
        this.loaded = false
        this.getPromiseData((i) * 10)
        if (this.pages[i - 1] !== undefined && i > this.done) {
          for (let itr = 1; itr < i; itr++) {
            this.pages[itr] = false
          }
        } else {
          console.log(this.pages.length)
          for (let itr = parseInt(i); itr <= Object.keys(this.pages).length; itr++) {
            this.pages[itr] = false
          }
        }
        this.pages[i] = true
        this.done = i
      }
    },
    getPages () {
      for (let i = 1; i <= Math.ceil(this.promises.length / 10); i++) {
        if (i === 1) {
          this.pages[i] = true
        } else {
          this.pages[i] = false
        }
      }
    },
    getPromiseData (n) {
      this.matches = []
      let p5 = []
      console.log(n - 10)
      for (let i = n - 10; i < n; i++) {
        if (this.promises[i]) {
          p5.push(this.promises[i])
        }
      }
      Promise.all(p5).then(values => {
        this.matches.push(values)
        this.makeCollapsible()
        this.loaded = true
      })
    },
    makeCollapsible () {
      var elem = document.querySelector('.collapsible')
      M.Collapsible.init(elem)
    },
    getCompleteData (data) {
      return new Promise((resolve, reject) => {
        Promise.all([this.getPlayer(data['Man_Of_The_Match_Id']), this.getPlayer(data['First_Umpire_Id']), this.getPlayer(data['Second_Umpire_Id']), this.getTeam(data['Team_Name_Id']), this.getTeam(data['Opponent_Team_Id']), this.getTeam(data['Match_Winner_Id'])]).then(values => {
          data['Man_Of_The_Match_Id'] = values[0]
          data['First_Umpire_Id'] = values[1]
          data['Second_Umpire_Id'] = values[2]
          data['Team_Name_Id'] = values[3]
          data['Opponent_Team_Id'] = values[4]
          data['Match_Winner_Id'] = values[5]
          resolve(data)
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    getPlayer (id) {
      return new Promise((resolve, reject) => {
        fetch('http://localhost/api/players/player/' + id)
          .then(data => {
            return data.json()
          })
          .then((json) => {
            resolve(json.data[0].Player_Name)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getTeam (id) {
      return new Promise((resolve, reject) => {
        fetch('http://localhost/api/teams/team/' + id)
          .then(data => {
            return data.json()
          })
          .then((json) => {
            if (!this.teams[json.data[0].Team_Short_Code]) {
              this.teams[json.data[0].Team_Short_Code] = json.data[0]
            }
            resolve(json.data[0].Team_Short_Code)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },

  created: function () {
    fetch('http://localhost/api/matches/seasonid/' + this.$route.params.id)
      .then(data => {
        return data.json()
      })
      .then((json) => {
        for (let data of json.data) {
          this.promises.push(this.getCompleteData(data))
        }
        this.getPages()
        this.getPromiseData(10)
      })
      .catch(err => {
        this.err.push(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .seasons-container{
    margin-top:30px;
  }
  .overlay{
    height:100vh;
    width:100%;
    background:rgba(0,0,0,0.5);
    position: absolute;
    top:0;
    left:0;
    z-index: 2;
  }
  .overlay .ball{
    margin: 25% 0 0 40%;
    transform: translate(-50%, -50%);
    height:50px;
    width:50px;
    background: linear-gradient(to right,#ff3838 ,#da4545);
    border-radius: 50%;
    animation: moveball 1.5s forwards infinite;
  }
  .overlay .ball:after{
    content: ' ';
    display: inline-block;
    height: 10px;
    width: 49px;
    border-top: 2px dotted yellowgreen;
    border-bottom: 2px dotted yellowgreen;
    transform: rotate(45deg);
    position: absolute;
    top: 20px;
  }
  .collapsible-header{
    position: relative;
  }
  .matchdate{
    position: absolute;
    right:20px;
    top:15px;
  }
  @keyframes moveball{
    0%{
      margin-left:40%;
      transform: rotate(0deg);
      opacity: 0.3;
    }
    50%{
      opacity: 1;
    }
    100%{
      margin-left:60%;
      transform: rotate(360deg);
      opacity: 0.3;
    }
  }
</style>
