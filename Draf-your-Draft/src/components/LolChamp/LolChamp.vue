<template>
    <div>
        <img class="champ-icon"
            :src="champ.image.full"
            :alt="champ.id">
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
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  