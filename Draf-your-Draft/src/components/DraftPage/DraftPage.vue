<template>
  <div class="page">
    <!-- J'ajoute la class "test" pour le moment pour tout encadrer et mieux visualiser les div-->

    <div class="menu">
    <h1>Page de Draft</h1>
      <button class="button menu" v-on:click="goToPage('/LabelsPage')">
        Labels
      </button>
      <button class="button menu" v-on:click="goToPage('/RulesPage')">Règles</button>
  </div>

    <div class="sideSelection">
        <div id="blueSide" class="radioBtn"  @click="handleSideSelectionClick('Blue')">
          <input type="radio" id="Blue" name="sideSelection"/>
          <label class="radioBtnBlue">BLUE</label>
        </div>
        <div id="anySide" class="radioBtn"  @click="handleSideSelectionClick('Both')">
          <input type="radio" id="Both" name="sideSelection" checked />
          <label class="radioBtnAny">LES DEUX</label>
        </div>
        <div id="redSide" class="radioBtn"  @click="handleSideSelectionClick('Red')">
          <input type="radio" id="Red" name="sideSelection" />
          <label class="radioBtnRed">RED</label>
        </div>
    </div>

    <!-- <div class="selectChampion">
      <h1>Choix du champion</h1>
    </div> -->
  <div class="test">
    <div class="bans">
      <div class="blueSideBans">
        <div v-for="index in 5" :key="index">
          <div :id="'blueBan' + index" class="ban" @click="showChamps('blueBanSelector' + index)"></div>
          <div hidden :id="'blueBanSelector' + index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="
              setChamp($event, 'blueBanSelector' + index, 'blueBan' + index)
            " @input="
                setIconToDefault(
                  $event,
                  'blueBanSelector' + index,
                  'blueBan' + index
                )
              " :options="champList" label="Name">
              <template v-slot:selected-option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }}</span>
              </template>
              <template v-slot:option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }} </span>
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div class="redSideBans">
        <div v-for="index in 5" :key="index">
          <div :id="'redBan' + index" class="ban" @click="showChamps('redBanSelector' + index)"></div>
          <div hidden :id="'redBanSelector' + index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="
              setChamp($event, 'redBanSelector' + index, 'redBan' + index)
            " @input="
                setIconToDefault(
                  $event,
                  'redBanSelector' + index,
                  'redBan' + index
                )
              " :options="champList" label="Name">
              <template v-slot:selected-option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }}</span>
              </template>
              <template v-slot:option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }} </span>
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </div>

    <div class="picksAndRules">
      <div class="blueSidePicks">
        <div v-for="index in 5" :key="index">
          <div :id="'bluePick' + index" class="pick" @click="showChamps('bluePickSelector' + index)"></div>
          <div hidden :id="'bluePickSelector' + index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="
              setChamp($event, 'bluePickSelector' + index, 'bluePick' + index)
            " @input="
                setIconToDefault(
                  $event,
                  'bluePickSelector' + index,
                  'bluePick' + index
                )
              " :options="champList" label="Name">
              <template v-slot:selected-option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }}</span>
              </template>
              <template v-slot:option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }} </span>
              </template>
            </v-select>
          </div>
        </div>
      </div>
      <div id="ruleDisplay" class="rules"></div>
      <div class="redSidePicks">
        <div v-for="index in 5" :key="index">
          <div :id="'redPick' + index" class="pick" @click="showChamps('redPickSelector' + index)"></div>
          <div hidden :id="'redPickSelector' + index" class="selectChamp">
            <v-select class="style-chooser" @option:selecting="
              setChamp($event, 'redPickSelector' + index, 'redPick' + index)
            " @input="
                setIconToDefault(
                  $event,
                  'redPickSelector' + index,
                  'redPick' + index
                )
              " :options="champList" label="Name">
              <template v-slot:selected-option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }}</span>
              </template>
              <template v-slot:option="option">
                <img class="iconChamp" v-bind:src="option.Img" />
                <span>{{ option.Name }} </span>
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </div></div>
  </div>
</template>

<script>
import dll from "../DLL.js";
export default {
  name: "DraftPage",
  data() {
    return {
      rulesList: this.$store.getters.getRules,
      champList: this.$store.state.champsNameAndImg,
      draftSide: "Both",
      draftBTab: [],
      draftRTab: [],
      iconNochampBackgroundUrl:
        "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAL2rbcQHIV4Frr_TYK3VJ_rTJn3eMNwMSTzVQ3YMN8AMYE_7wjk49n00ubRUZyCdj2I4&usqp=CAU)"
    };
  },
  methods: {
    handleSideSelectionClick(side) {
      console.log("draft side changed to:", side);
      this.draftSide = side;
      // display texts
      this.getDisplays();
    },
    goToPage(pageURL) {
      this.$router.push(pageURL);
    },
    setChamp(champ, selectorId, iconChampId) {
      document.getElementById(selectorId).setAttribute("hidden", true);
      document.getElementById(iconChampId).style.backgroundImage =
        "url(" + champ.Img + ")";
      let pos = this.getChampPos(selectorId);
      let labelTab = this.$store.getters.getLabelsFromChampName(champ.Name);
      if (selectorId[0] === "r") {
        this.draftRTab = this.draftRTab.filter(el => el.pos !== pos);

        this.draftRTab.push({ pos: pos, champ: champ.Name });
        labelTab.forEach(label =>{
          this.draftRTab.push({ pos: pos, champ: label });
        })
      } else {
        this.draftBTab = this.draftBTab.filter(el => el.pos !== pos);

        this.draftBTab.push({ pos: pos, champ: champ.Name });
        labelTab.forEach(label =>{
          this.draftBTab.push({ pos: pos, champ: label });
        })
      }
      
      // display texts
      this.getDisplays();
      
    },

    showChamps(selectorId) {
      let el = document.getElementById(selectorId);
      if (el.hasAttribute("hidden")) {
        document.getElementById(selectorId).removeAttribute("hidden");
      } else {
        document.getElementById(selectorId).setAttribute("hidden", true);
      }
    },
    setIconToDefault(event, selectorId, iconChampId) {
      if (event === null) { // if a champ is removed from selector
        document.getElementById(selectorId).setAttribute("hidden", true);
        document.getElementById(
          iconChampId
        ).style.backgroundImage = this.iconNochampBackgroundUrl;
        let pos = this.getChampPos(selectorId);
        if (selectorId[0] === "r") {
          this.draftRTab = this.draftRTab.filter(el => el.pos !== pos);
        } else {
          this.draftBTab = this.draftBTab.filter(el => el.pos !== pos);
        }
        console.log("blue draft", this.draftBTab, "red draft", this.draftRTab);
        
        // display texts
        this.getDisplays();
      }
    },
    getChampPos(selectorId) {
      if (selectorId[3] === "P") {
        return "P" + selectorId.slice(-1);
      } else if (selectorId[3] === "B") {
        return "B" + selectorId.slice(-1);
      } else if (selectorId[4] === "P") {
        return "P" + selectorId.slice(-1);
      } else {
        return "B" + selectorId.slice(-1);
      }
    },
    getDisplays(){
      document.getElementById("ruleDisplay").textContent = '';
      this.$store.state.rules.forEach(rule => {
        if (
          dll.checkRule(
            rule.ruleSide,
            rule.ruleTarget,
            rule.champsTab,
            rule.displaysTab,
            this.draftBTab,
            this.draftRTab,
            this.draftSide
          )
        ) {
          console.log("1 règle validée",rule);
          let p = document.createElement("p");
          p.innerText = rule.id + ": " + rule.displaysTab[0].value;
          p.style.color = rule.ruleSide === 'Both' ? 'black' : rule.ruleSide.toLowerCase();
          document.getElementById("ruleDisplay").appendChild(p);
        }
        else{
          console.log("1 règle pas validée",rule);
        }
      });
    }
  }
};
</script>

<style scoped>
.page {
  font-family: "Beaufort";
  font-size: 18px;
}

.side {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: medium;
}



.buttonAny {
  color: black;
}

.buttonAny:hover {
  border: 3px solid black;
  color: black;
}

.buttonBlue {
  color: black;
}

.buttonBlue:hover {
  border: 3px solid black;
  color: black;
}

.buttonRed {
  color: black;
}

.buttonRed:hover {
  border: 3px solid black;
  color: black;
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

.blueSideBans {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
}

.redSideBans {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  gap: 20px;
}

.ban {
  cursor: pointer;
  --ban-size: 70px;
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
  width: 15%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.pick {
  cursor: pointer;
  --pick-size: 70px;
  margin-top: 10px;
  
  margin-bottom: 10px;
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
  height: auto;
  white-space: pre-line;
}

.selectChamp {
  width: 200px;
  height: 40px;
  position: absolute;
  margin-top: 10px;
  top: auto;
  left: auto;
}

.iconChamp {
  width: 20px;
}
</style>
