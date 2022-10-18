<template>
    <div class="champion-list">
        <div v-for="champion in champions">
            <LolChamp  v-bind:champ="champion">
            </LolChamp>
        </div>
    </div>
  </template>
  
  <script>
import LolChamp from '../LolChamp/LolChamp.vue';
import championsJSON from'../../assets/champion.json'

  export default {
    name: "ChampList",
    data() {
        return {
            champions: championsJSON    
        };
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
  