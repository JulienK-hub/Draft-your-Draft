<template>
  <div>
    
    <FilterVue></FilterVue>
    <input type="text" v-model="searchValue">
    <button class="button actions" v-on:click="selectAll()">Select all</button>
  <div class="champion-list scrollBarDiv">
    <!-- Faut rajouter un truc pour prendre que les infos qui nous intéressent pour opti-->
    
    <div v-on:click.ctrl="selectChampion(champion)" v-for="champion in filteredChampions" :key="champion.id">
      <LolChamp v-bind:champ="champion" v-bind:isInSelectedList="false">
      </LolChamp>
    </div>
  </div>
</div>
</template>
  
<script>
import LolChamp from './LolChamp.vue';
import FilterVue from './Filter.vue'
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



</style>
  