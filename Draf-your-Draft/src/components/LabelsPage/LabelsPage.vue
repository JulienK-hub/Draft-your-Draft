<template>
  <div>
  <h1> Label gestion </h1>
  <button v-on:click="goToPage('/RulesPage')">
    Rules gestion
  </button>
  <button v-on:click="goToPage('/DraftPage')">
    Draft
  </button>
  </div>
</template>

<script>
export default {
  name: 'LabelsPage',
  data () {
    return {
    }
  },
  
  methods: {
    goToPage(pageURL){
      this.$router.push(pageURL)
    }
  },
}
</script>

<style scoped>
</style>
