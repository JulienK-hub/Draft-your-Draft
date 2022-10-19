<template>
  <div>
    <div v-on:click="isHidden = !isHidden">
        <img class="champ-icon"
            :src="champ.image.full"
            :alt="champ.id"/>
      
    </div>
    <div v-if="!isHidden">
            <div class="label" v-for ="label in labels">
              <button :id="label.id" v-on:click="deleteLabel($event)">supprimer</button>
                <p>{{label.text}}</p>
            </div>
        </div>
      </div>
  </template>

  <script>
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'LolChamp',
    props: {
        champ: Object
    },
    data () {
      return {
        isHidden: true,
        labels : this.$store.getters.getLabelsByChampId(this.champ.key)
      }
    },
    methods: {
      ...mapMutations([
        'deleteChampionLabelById'
      ]),
      deleteLabel: function(event){
        console.log(event.currentTarget.id + "ee")
        this.deleteChampionLabelById(championLabel)
        this.labels = this.$store.getters.getLabelsByChampId(this.champ.key)
      },
      addLabel: function(){
        console.log("création d'un label + ajout au champion");
      }
    },
  }
  </script>
  
  <style scoped>
  </style>
  