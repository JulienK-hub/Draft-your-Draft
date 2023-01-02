<template>
  <div class="background">
    <div class="menu">
      <h1>Label gestion</h1>
      <button class="button menu" v-on:click="goToPage('/RulesPage')">Rules</button>
      <button class="button menu" v-on:click="goToPage('/DraftPage')">Draft</button>
    </div>
    <div class="containerChampsLists">
      <ChampList class="champList1"></ChampList>
      <SelectedChamp class="champList1"></SelectedChamp>
    </div>
    <div class="linearTransition"/>
    <div class="createLabel">
      <h2 class="title">CREATE A LABEL</h2>
      <div class="labelParameters">
      <a>Name :</a> <input id="inputText" v-model="labelName" type="text" /> 
      <a class="marginLeft">Color :</a>
      <input
        v-model="labelBGColor"
        type="color"
        id="colorpicker"
        value="#0000ff"
      />
      <a class="marginLeft">Black :</a> <input id="checkBox" type="checkbox" @change="changeTextLabelColor()" />
      <br /><br />
      <Label class="labelMargin"
        v-bind:Text="labelName"
        v-bind:BGColor="labelBGColor"
        v-bind:TextColor="labelTextColor"
      />
      </div>
      <button class="button actions margin-top" v-on:click="createLabel()">Validate</button>

      <h2>LIST OF LABELS</h2>
      <div class="listLabels" v-for="label in allLabels" :key="label.id">
        <button v-on:click="deleteLabel(label.id)" class="delete-button">
          x
        </button>
        <Label class="labelMargin"
          v-bind:Text="label.text"
          v-bind:BGColor="label.colorBG"
          v-bind:TextColor="label.color"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChampList from "./ChampList.vue";
import Label from "./Label.vue";
import SelectedChamp from "./SelectedChamp.vue";

export default {
  name: "LabelsPage",
  data() {
    return {
      labelBGColor: "#0000ff",
      labelName: "",
      labelTextColor: "white",
      allLabels: this.$store.state.labels,
    };
  },
  methods: {
    changeTextLabelColor() {
      if (this.labelTextColor == "white") {
        this.labelTextColor = "black";
      } else {
        this.labelTextColor = "white";
      }
    },
    createLabel() {
      this.$store.commit("createLabel", {
        newText: this.labelName,
        newColorBG: this.labelBGColor,
        newColor: this.labelTextColor,
      });
    },
    goToPage(pageURL) {
      this.$router.push(pageURL);
    },
    deleteLabel(id) {
      this.$store.commit("deleteLabel", id);
    },
  },
  components: {
    Label,
    ChampList,
    SelectedChamp,
  },
};
</script>

<style scoped>
.listLabels {
  display: inline-block;
  margin-left: 50px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.labelParameters{
  font-family: "spiegel-bold";
  font-size: 1.5em;
}
.createLabel{
  position: left;
  background: url(../../assets/motifCubesV1.png);
  background-size: 100%;
  margin-bottom: 80px;
}
.createLabel:hover{
  background-color: rgb(255, 255, 255,0.5);
    background-blend-mode: lighten;
}
.delete-button {
  color: black;
  border-radius: 50%;
}
.delete-button:hover {
  background-color: gray; /* Green */
  color: black;
}
.containerChampsLists {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  margin-bottom: 10%;

}
.marginLeft{
  margin-left: 70px;
}
.champList1 {
  width: 45%;
}
.background{
  
  background: url(../../assets/champ.png);
  background-position-x: 13.5%;
  background-position-y: 20%;
  background-repeat: no-repeat;
  background-size: 30%;
}
/* ACTIONS
   ========== */

.linearTransition{
  height: 100px;
  background: url(../../assets/epee2.png);
  background-size: 50%;
  position: top;
  background-repeat: repeat-x;
  
}
</style>
