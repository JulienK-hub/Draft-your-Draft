<template>
  <div class="page test">
    <!-- J'ajoute la class "test" pour le moment pour tout encadrer et mieux visualiser les div-->

    <h1>Page de Draft</h1>

    <div class="labelsRulesButtons test">
      <button class="button" v-on:click="goToPage('/LabelsPage')">Labels</button>
      <button class="button" v-on:click="goToPage('/RulesPage')">Rules</button>
    </div>

    <div class="side test">
      <p>You are</p>
      <button class="button buttonBlue">Blue</button>
      <button class="button buttonRed">Red</button>
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
      <div class="rules test">
        {{rulesList}}
      </div>
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
      rulesList: this.$store.getters.getRules
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
.button {
  background-image: linear-gradient(to right, lightgrey 0%, white 51%, lightgrey 100%);
  padding: 5px 20px;
  margin: 10px;
  text-align: center;
  font-size: medium;
  transition: 0.5s;
  background-size: 200% auto;
  color: black;
  display: online-block;
}

.button:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: black;
  text-decoration: none;
}

.side {
  display: flex;
  flex-direction: row;
  justify-content: center;  
  font-size: medium;
}

.buttonBlue {
  background-image: linear-gradient(to right, blue 0%, white 50%, blue 100%);
}
.buttonBlue:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: black;
  text-decoration: none;
}

.buttonRed {
  background-image: linear-gradient(to left, white 0%, red 50%, white 100%);
}
.buttonRed:hover {
  background-position: right center;
  /* change the direction of the change here */
  color: black;
  text-decoration: none;
}


.test {
  border: solid;
}

.bans {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1%;
}

.blueSideBans, .redSideBans {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
}

.ban {
  --ban-size: 50px;
  border: solid;
  width: var(--ban-size);
  height: var(--ban-size);
  background-image: url(../../assets/square.png);
  background-size: var(--ban-size) var(--ban-size);
}

.picksAndRules {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.blueSidePicks,
.redSidePicks {
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
  white-space: pre-line;
}
</style>