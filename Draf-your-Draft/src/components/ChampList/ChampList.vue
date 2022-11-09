<template>
  <div class="championListBackGround">
    
    <FilterVue></FilterVue>
    <input type="text" v-model="searchValue">
    <button class="button actions" v-on:click="selectAll()">Select all</button>
  <div class="champion-list scrollBarDiv">
    <!-- Faut rajouter un truc pour prendre que les infos qui nous intéressent pour opti-->
    
    <div v-on:click.ctrl="selectChampion(champion)" v-for="champion in filteredChampions">
      <LolChamp v-bind:champ="champion" v-bind:isInSelectedList="false">
      </LolChamp>
    </div>
  </div>
</div>
</template>
  
<script>
import LolChamp from '../LolChamp/LolChamp.vue';
import FilterVue from '../Filter/Filter.vue'
import championsJSON from '../../assets/champion.json'
import { mapMutations } from 'vuex'

export default {
  name: "ChampList",
  data() {
    return {
      champions: championsJSON,
      searchValue: '',
    };
  },
  methods: {
    ...mapMutations([
      'addSelectedChamp'
    ]),
    selectChampion: function (champion) {
      this.addSelectedChamp(champion)
    },
    fusionChampionsArrays: function(array1, array2){
      let array3 = array1.concat(array2);
      array3 = [...new Set([...array1,...array2])]
      return array3
    },
    selectAll: function (){
      var filteredLabelsChampions = this.$store.getters.getFilteredChampions()
      const intersection = filteredLabelsChampions.filter(element => this.filteredChampions.includes(element));
      this.$store.commit('selectChampions', intersection);
    }
  },
  computed: {
    filteredChampions() {
      let tempChampions = championsJSON

      // Process search input
      if (this.searchValue != '' && this.searchValue) {
        tempChampions = tempChampions.filter((item) => {
          return item.id
            .toUpperCase()
            .includes(this.searchValue.toUpperCase())
        })
      }
      return tempChampions
    }
  },
  components: { LolChamp,FilterVue, }
}
</script>
  
<style scoped>
.championListBackGround{
  background: url(../../assets/champ.png);
  background-position: center;
  background-size: 10%;
}
.champion-list {
  margin: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.scrollBarDiv {
  margin:5px;
  padding:5px;
  height: 500px;
  overflow: auto;
  text-align:justify;
}


/* ACTIONS
   ========== */
   .button {
    font-family: 'Beaufort';
    text-transform: uppercase;
    font-size: 18px;
    color: #242731;
    padding: .45rem 2rem;
    margin-bottom: 5px;
}

.button.actions {
    border: 3px solid;
    border-radius: 0;
    background: #f3f3f3;
    transition: all ease .25s;
}

.button.actions:hover {
    border: 3px solid grey;
    color: white;
    background: black;
    cursor: pointer;
}

/* CUSTOM SCROLLBAR */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient( rgb(207, 207, 207),  #5B5A56 ); 
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3C3C41; 
}
</style>
  