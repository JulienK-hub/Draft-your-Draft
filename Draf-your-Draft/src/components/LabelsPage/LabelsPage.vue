<template>
  <div>
  <h1> Label gestion </h1>
  <button v-on:click="goToPage('/RulesPage')">
    Rules gestion
  </button>
  <button v-on:click="goToPage('/DraftPage')">
    Draft
  </button>
  <h2 class="title">Create a label</h2>
  <p style="display:inline">Name</p>
  <input v-model="labelName" type="text"/>
  <p style="display:inline">Color</p>
  <input style="display:inline" v-model="labelBGColor" type="color" id="colorpicker" value="#0000ff"/>
  
    <p style="display:inline">Black</p>
    <input id="black" type="checkbox" @change="changeTextLabelColor()"/>

  <p :style="{'background-color':labelBGColor,'color':labelTextColor}">{{labelName}}</p>
  <div>
    <FilterVue></FilterVue>
    <ChampList></ChampList>
  </div>
</div>
</template>

<script>
import ChampList from '../ChampList/ChampList.vue';
import FilterVue from '../Filter/Filter.vue'

export default {
  name: 'LabelsPage',
  data () {
    return {
      labelBGColor: "#0000ff",
      labelName: "",
      labelTextColor: "white"
    }
  },
  
  methods: {
    changeTextLabelColor () {
      if(this.labelTextColor == "white") {
        this.labelTextColor = "black";
      }
      else{
        this.labelTextColor = "white";
      }
    },
    goToPage(pageURL){
      this.$router.push(pageURL)
    }
  },
  components : {
    ChampList,
    FilterVue
  }
}
</script>

<style scoped>
.title{
  padding-right: 0%;
}
</style>
