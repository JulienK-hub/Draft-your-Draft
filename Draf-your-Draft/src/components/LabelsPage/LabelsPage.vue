<template>
  <div class="background">
    <div class="menu">
      <h1>Label gestion</h1>
      <button v-on:click="goToPage('/RulesPage')">Rules gestion</button>
      <button v-on:click="goToPage('/DraftPage')">Draft</button>
    </div>
    <div class="containerChampsLists">
      <ChampList class="champList1"></ChampList>
      <SelectedChamp class="champList1"></SelectedChamp>
    </div>
    
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
      <button class="button actions" v-on:click="createLabel()">Validate</button>

      <h2>LIST OF LABELS</h2>
      <div class="listLabels" v-for="label in allLabels">
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
import ChampList from "../ChampList/ChampList.vue";
import Label from "./Label.vue";
import SelectedChamp from "../SelectedChamp/SelectedChamp.vue";

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
  background: url(../../assets/motifCubesV3.jpg);
  background-size: 10%;
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
  margin-bottom: 15%;

}
.marginLeft{
  margin-left: 70px;
}
.champList1 {
  width: 45%;
}
.background{
  
  background: url(../../assets/champ.png);
  background-position-x: 15%;
  background-position-y: 20%;
  background-repeat: no-repeat;
  background-size: 30%;
}
/* ACTIONS
   ========== */
   .button {
    font-family: 'Beaufort';
    text-transform: uppercase;
    font-size: 18px;
    color: #242731;
    padding: .45rem 2rem;
    margin-bottom: 5px;
    margin-top: 30px;
}
</style>
