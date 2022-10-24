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
      <div class="blueSidePicks test">
        <div class="bluePick1 pick"></div>
        <div class="bluePick2 pick"></div>
        <div class="bluePick3 pick"></div>
        <div class="bluePick4 pick"></div>
        <div class="bluePick5 pick"></div>
      </div>
      <div class="rules test">Rules</div>
      <div class="redSidePicks test">
        <div class="redPick1 pick"></div>
        <div class="redPick2 pick"></div>
        <div class="redPick3 pick"></div>
        <div class="redPick4 pick"></div>
        <div class="redPick5 pick"></div>
      </div>
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

.test {
  border: solid;
}
.bans {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1%;
}

.blueSideBans, .redSideBans{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
}

.ban {
  --pick-size: 50px;
  border: solid;
  width: var(--pick-size);
  height: var(--pick-size);
  background-image: url(../../assets/square.png);
  background-size: var(--pick-size) var(--pick-size);
}

.picksAndRules {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.blueSidePicks, .redSidePicks {
  width: 25%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.pick {
  
  --pick-size: 50px;
  border: solid;
  display: flex;
  width: var(--pick-size);
  height: var(--pick-size);
  flex-direction: column;
  justify-content: space-around;
  background-image: url(../../assets/square.png);
  background-size: var(--pick-size) var(--pick-size);
}

.rules {
  width: 50%;
  height: 300px;
}
</style>