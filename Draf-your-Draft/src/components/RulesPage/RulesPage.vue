<template>
  <div>
  <h1> Rules gestion </h1>
  <button v-on:click="goToPage('/LabelsPage')">
    Labels gestion
  </button>
  <button v-on:click="goToPage('/DraftPage')">
    Draft
  </button>
  </div>
</template>

<script>
export default {
  name: 'RulesPage',
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
