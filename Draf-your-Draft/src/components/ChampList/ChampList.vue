<template>
  <div class="championListBackGround">
    
    <FilterVue></FilterVue>
    <input type="text" v-model="searchValue">
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
  background: linear-gradient(Green, brown 100%);
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
</style>
  