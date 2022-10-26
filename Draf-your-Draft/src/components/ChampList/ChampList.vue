<template>
  <div class="champion-list">
    <!-- Faut rajouter un truc pour prendre que les infos qui nous intéressent pour opti-->
    <input type="text" v-model="searchValue">
    <div v-on:click.ctrl="selectChampion(champion)" v-for="champion in filteredChampions">
      <LolChamp v-bind:champ="champion">
      </LolChamp>
    </div>
  </div>
</template>
  
<script>
import LolChamp from '../LolChamp/LolChamp.vue';
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
  components: { LolChamp }
}
</script>
  
<style scoped>
.champion-list {
  margin: auto;
  width: 75%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
  