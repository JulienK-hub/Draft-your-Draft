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
</div>
</template>

<script>
import Label from "./Label.vue";
export default {
    name: "LabelsPage",
    data() {
        return {
            labelBGColor: "#0000ff",
            labelName: "",
            labelTextColor: "white"
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
            this.$store.commit("createLabel", { a: this.labelName, b: this.labelBGColor, c: this.labelTextColor });
        },
        goToPage(pageURL) {
            this.$router.push(pageURL);
        }
    },
    components: { Label }
}
</script>

<style scoped>
.title{
  padding-right: 0%;
}
</style>
