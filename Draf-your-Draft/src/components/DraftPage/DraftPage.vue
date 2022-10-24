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
      <div class="blueSideBans">
        <div class="blueBan1 ban"></div>
        <div class="blueBan2 ban"></div>
        <div class="blueBan3 ban"></div>
        <div class="blueBan4 ban"></div>
        <div class="blueBan5 ban"></div>
      </div>
      <div class="redSideBans">
        <div class="redBan1 ban"></div>
        <div class="redBan2 ban"></div>
        <div class="redBan3 ban"></div>
        <div class="redBan4 ban"></div>
        <div class="redBan5 ban"></div>
      </div>

    </div>

    <div class="picksAndRules test">
      <div class="blueSidePicks test">Blue side</div>
      <div class="rules test">Rules</div>
      <div class="redSidePicks test">Red side</div>
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
}

.test {
  border: solid;
}

.ban {
  border: solid;
  width: 50px;
  height: 50px;
}

.bans {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.blueSideBans, .redSideBans{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
}

.blueSidePicks, .redSidePicks {
  width: 33%;
  height: 300px;
}

.rules {
  width: 33%;
  height: 300px;
}
</style>