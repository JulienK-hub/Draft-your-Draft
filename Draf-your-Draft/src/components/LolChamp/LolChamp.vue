<template>
    <div v-on:click="isHidden = !isHidden">
        <img class="champ-icon"
            :src="champ.image.full"
            :alt="champ.id"/>
        <div v-if="!isHidden">
            <p v-for ="label in labels">
                {{label.text}}
            </p>
        </div>

    </div>
  </template>

  <script>

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
    }
  }
  </script>
  
  <style scoped>
  </style>
  