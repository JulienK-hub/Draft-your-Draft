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
        <div v-for="index in 5" :key="index">
        <div :id="'blueBan' + index" class="ban" @click="showChamps('blueBanSelector' + index)"></div>
        <div  hidden :id="'blueBanSelector' + index" class="selectChamp">
          <v-select class="style-chooser" @option:selecting="setChamp($event, 'blueBanSelector' + index)" @option:deselecting="setIconToDefault('blueBan' + index)" :options="champList" label="Name" >
          <template v-slot:selected-option="option">
          <img class="iconChamp" v-bind:src="option.Img"/>
          <span>{{option.Name}}</span> 
          </template>
          <template v-slot:option="option">
          <img class="iconChamp" v-bind:src="option.Img"/>
          <span >{{option.Name}} </span>
          </template>
      </v-select></div></div>

        
      </div>
      <div class="redSideBans">
        <div v-for="index in 5" :key="index">
          <div :id="'redBan' + index" class="ban" @click="showChamps('redBanSelector' + index)"></div>
          <div  hidden :id="'redBanSelector'+index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="setChamp($event, 'redBanSelector' + index)" @option:deselecting="setIconToDefault('redBan' + index)" :options="champList" label="Name" >
            <template v-slot:selected-option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span>{{option.Name}}</span> 
            </template>
            <template v-slot:option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span >{{option.Name}} </span>
            </template>
        </v-select></div></div>
      </div>
    </div>

    <div class="picksAndRules test">
      <div class="blueSidePicks test">
        <div v-for="index in 5" :key="index">
          <div :id="'bluePick' + index" class="pick" @click="showChamps('bluePickSelector' + index)"></div>
          <div  hidden :id="'bluePickSelector' + index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="setChamp($event, 'bluePickSelector' + index)" @option:deselecting="setIconToDefault('bluePick' + index)" :options="champList" label="Name" >
            <template v-slot:selected-option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span>{{option.Name}}</span> 
            </template>
            <template v-slot:option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span >{{option.Name}} </span>
            </template>
        </v-select></div></div>
      </div>
      <div class="rules test">
        {{rulesList}}
      </div>
      <div class="redSidePicks test">
        <div v-for="index in 5" :key="index">
          <div :id="'redPick' + index" class="pick" @click="showChamps('redPickSelector' + index)"></div>
          <div  hidden :id="'redPickSelector'+index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="setChamp($event, 'redPickSelector' + index)" @option:deselecting="setIconToDefault('redPick' + index)" :options="champList" label="Name" >
            <template v-slot:selected-option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span>{{option.Name}}</span> 
            </template>
            <template v-slot:option="option">
            <img class="iconChamp" v-bind:src="option.Img"/>
            <span >{{option.Name}} </span>
            </template>
        </v-select></div></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DraftPage',
  data() {
    return {
      rulesList: this.$store.getters.getRules,
      champList: this.$store.state.champsNameAndImg,
      draftSide: "Both", // à changer
      draftBTab: [],
      draftRTab: []
    }
  },
  methods: {
    goToPage(pageURL) {
      console.log(this.champList)
      this.$router.push(pageURL)
    },
    setChamp(champ,selectorId){
      document.getElementById(selectorId).setAttribute("hidden",true);
      let iconId = selectorId.substr(0,selectorId.length - 9) + selectorId[selectorId.length-1];
      document.getElementById(iconId).style.backgroundImage = "url("+ champ.Img + ")";
      if(selectorId[0] === "r"){
        if(selectorId[3]=== "P"){
          this.draftRTab.push({pos: "P" + selectorId.slice(-1), champ: champ.Name});
        }
        else{
          
          this.draftRTab.push({pos: "B" + selectorId.slice(-1), champ: champ.Name});
        }
      }
      else{
        if(selectorId[4]=== "P"){
          this.draftBTab.push({pos: "P" + selectorId.slice(-1), champ: champ.Name});
        }
        else{
          
          this.draftBTab.push({pos: "B" + selectorId.slice(-1), champ: champ.Name});
        }
      }
      
      console.log(this.draftRTab);
      console.log(this.draftBTab);
    },
    showChamps(selectorId){
      let el = document.getElementById(selectorId);
      if(el.hasAttribute("hidden")){
        document.getElementById(selectorId).removeAttribute("hidden");
      }
      else{
        document.getElementById(selectorId).setAttribute("hidden",true);
      }
    },
    setIconToDefault(iconChampId){
      console.log(iconChampId)
      //document.getElementById(iconChampId).style.backgroundImage = "url(../../assets/square.png)";
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

.blueSideBans{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
}
.redSideBans {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  gap: 10px;
}

.ban {
  cursor: pointer;
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
  cursor: pointer;
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

.selectChamp{
  width: 200px;
  height: 40px;
  position: absolute;
  margin-top: 10px;
  top: auto;
  left: auto;
}

.iconChamp{
  width: 20px;
}
</style>