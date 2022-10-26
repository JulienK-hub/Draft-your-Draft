<template lang="">
    <div>
    <div v-on:click.ctrl="unselectChampion(champion)" v-for="champion in selectedChampions">
      <LolChamp   v-bind:champ="champion">
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
            //selectedChampions : this.$store.getters.getSelectedChamps()
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
            this.deleteSelectedChamp(champion)
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