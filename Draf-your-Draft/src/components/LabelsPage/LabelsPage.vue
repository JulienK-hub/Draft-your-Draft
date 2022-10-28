<template>
  <div>
    <h1> Label gestion </h1>
    <button v-on:click="goToPage('/RulesPage')">
      Rules gestion
    </button>
    <button v-on:click="goToPage('/DraftPage')">
      Draft
    </button>
    <div>
      <div class="containerChampsList">
        <ChampList class="champList1"></ChampList>
        <SelectedChamp class="champList1"></SelectedChamp>
      </div>
    </div>
    <div>
      <h2 class="title">Create a label</h2>

  Name : <input id="inputText" v-model="labelName" type="text"/>
  Color : <input v-model="labelBGColor" type="color" id="colorpicker" value="#0000ff"/>
  Black : <input id="checkBox" type="checkbox" @change="changeTextLabelColor()"/>
  <br><br>
  <Label v-bind:Text="labelName"
  v-bind:BGColor="labelBGColor"
  v-bind:TextColor="labelTextColor"/><br><br>
    <button v-on:click="createLabel()">Validate</button>
</div>
<h2 class="title">List of labels</h2>
<div class="listLabels" v-for ="label in allLabels">
<button v-on:click="deleteLabel(label.id)" class="delete-button">x</button>
  <Label v-bind:Text="label.text"
  v-bind:BGColor="label.colorBG"
  v-bind:TextColor="label.color"/>
</div>

</div>
</template>

<script>

import ChampList from '../ChampList/ChampList.vue';
import Label from "./Label.vue";
import SelectedChamp from '../SelectedChamp/SelectedChamp.vue'

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
            }
            else {
                this.labelTextColor = "white";
            }
        },
        createLabel() {
            this.$store.commit("createLabel", { newText: this.labelName, newColorBG: this.labelBGColor, newColor: this.labelTextColor });
        },
        goToPage(pageURL) {
            this.$router.push(pageURL);
        },
        deleteLabel(id){
          this.$store.commit('deleteLabel',id);
        }
    },
    components: { 
      Label,
      ChampList,
      SelectedChamp 
    }
}
</script>

<style scoped>
.title {
  padding-right: 0%;
}
.listLabels{
  display: inline-block;
  margin-left: 50px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}
.delete-button {
  color: black;
  border-radius: 50%;
}
.delete-button:hover {
  background-color: red; /* Green */
  color: black;
}
.containerChampsList{
  display: flex;
  flex-direction: row;
}
.champList1{
  width: 50%;
}

</style>
