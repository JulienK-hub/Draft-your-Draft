<template>
  <div class="page test">
    <!-- J'ajoute la class "test" pour le moment pour tout encadrer et mieux visualiser les div-->

    <h1>Page de Draft</h1>

    <div class="labelsRulesButton test">
      <button v-on:click="goToPage('/LabelsPage')">Labels gestion</button>
      <button v-on:click="goToPage('/RulesPage')">Rules gestion</button>
    </div>

    <div class="side test">
      <h1>Choix du side</h1>
    </div>

    <div class="selectChampion test">
      <h1>Choix du champion</h1>
    </div>

    <div class="bans test">
      <h1>Champions bannis</h1>
    </div>

    <div class="picksAndRules test">
      <div class="blueSidePicks test testt">Blue side</div>
      <div class="rules test testt">Rules</div>
      <div class="redSidePicks test testt">Red side</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DraftPage',
  data() {
    return {
    }
  },
  methods: {
    goToPage(pageURL) {
      this.$router.push(pageURL)
    }
  },
}
</script>

<style scoped>

.picksAndRules {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
.test {
  border: solid;
}

.testt {
  width: 33%;
  height: 300px;
}


</style>