<template lang="">
    <div>
    <div v-on:click.ctrl="unselectChampion(champion)" v-on:click.shift="addOrRemoveUnderSelectedChamp(champion)" v-for="champion in selectedChampions">
      <LolChamp v-bind:champ="champion">
      </LolChamp>
    </div>
  </div>
</template>
<script>
import LolChamp from '../LolChamp/LolChamp.vue';
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SelectedChamp',
    data() {
        return {
            underSelectedChamp: []
        }
    },
    methods: {
        ...mapMutations([
      'deleteChampionLabelByLabelId',
      'addChampionLabel',
      'addSelectedChamp',
      'deleteSelectedChamp'
    ]),
        unselectChampion: function(champion){
            console.log("add " + champion.id + " unselected")
            this.removeUnderSelectedChamp(champion.key)
            this.deleteSelectedChamp(champion)
        },
        addOrRemoveUnderSelectedChamp: function(champion){
            if(!this.removeUnderSelectedChamp(champion.key)){
                console.log("add " + champion.id + " to under selected champions")
                this.underSelectedChamp.push(champion)
            }
        },
        removeUnderSelectedChamp: function(championKey){
            var index = 0
            if( (index = this.underSelectedChamp.findIndex(champ => champ.key == championKey)) != -1){
                console.log("Champion " + championKey + " under unselected")
                this.underSelectedChamp.splice(index, 1)
                return true
            }
            return false
        }
    },
    computed: mapState({
        selectedChampions: 'selectedChamps'

    }),
    components:{
        LolChamp
    }
    
}
</script>
<style lang="">
    
</style>