<template>
  <div>
  <h1> Draft </h1>
  <button v-on:click="goToPage('/LabelsPage')">
    Labels gestion
  </button>
  <button v-on:click="goToPage('/RulesPage')">
    Rules gestion
  </button>
  </div>
</template>

<script>
export default {
  name: 'DraftPage',
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