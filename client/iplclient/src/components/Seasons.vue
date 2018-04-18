<template>
    <div class="seasons-container">
        <div class="row">
            <template v-for="item in data">
                <div class="col s12 m6 l4" v-bind:key="item.Season_Id">
                    <div class="card  cyan darken-2">
                        <div class="card-content white-text">
                          <span class="card-title center-align">Season {{ item.Season_Id }}</span>
                          <p>Year {{ item.Season_Year }}</p>
                          <ul>
                            <li><i class="fas fa-star orange-text"></i> Orange Cap: {{ getOrange(item.Season_Id) }} </li>
                            <li><i class="fas fa-star purple-text"></i> Purple Cap: {{ getPurple(item.Season_Id) }}  </li>
                            <li></li>
                          </ul>
                        </div>
                        <div class="card-action">
                          <router-link class="blue-text text-lighten-5" :to='`/season/${item.Season_Id}`'> Season Details <i class="fas fa-angle-right"></i></router-link>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Seasons',
  data () {
    return {
      data: [],
      players: {}
    }
  },
  methods: {
    getOrange (id) {
      return this.players[id].orange
    },
    getPurple (id) {
      return this.players[id].purple
    },
    getPlayer (season, cb) {
      return new Promise((resolve, reject) => {
        let oid = season.Orange_Cap_Id
        let pid = season.Purple_Cap_Id
        let mosi = season.Man_of_the_Series_Id
        let url = `http://localhost/api/players/orangecap/${oid}/purplecap/${pid}/mos/${mosi}`
        fetch(url)
          .then(data => {
            return data.json()
          })
          .then((json) => {
            let orange = json.data[0].Player_Name
            let purple = json.data[1].Player_Name
            let mos = (oid !== mosi) ? json.data[2].Player_Name : json.data[0].Player_Name
            this.players[season.Season_Id] = {
              'orange': orange,
              'purple': purple,
              'mos': mos
            }
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  beforeCreate: function () {
    fetch('http://localhost/api/seasons')
      .then(data => {
        return data.json()
      })
      .then((json) => {
        let promises = []
        for (let data of json.data) {
          promises.push(this.getPlayer(data))
        }
        Promise.all(promises).then(() => {
          for (let data of json.data) {
            this.data.push(data)
          }
        })
      })
      .catch(err => {
        this.data.push(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .seasons-container{
    margin-top:30px;
  }
  .card-action a svg{
    transition: all .3s linear;
    font-size:18px;
    vertical-align: -4px;
  }
  .card-action a:hover svg{
    margin-left: 5px;
    transition: all .3s linear
  }
</style>
