<template>
  <div>
    <h1>Rules gestion</h1>
    <button v-on:click="goToPage('/LabelsPage')">Labels gestion</button>
    <button v-on:click="goToPage('/DraftPage')">Draft</button>

    <div class="cornerB">
      <div>
        <div
        id="Moi"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Moi</div>
      
      <div
        id="Ennemi"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Ennemi</div>
      </div>
      <div
      id="selectorType2"
      draggable="true"
      @dragstart="drag($event)"
      class="boxType2">
        <select id="positionChamp" v-on:change="setPosSelected($event.target.value)">
          <option value="Pick">Pick</option>
          <option value="Ban">Ban</option>
          <option value="All">All</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
          <option value="P5">P5</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
          <option value="B4">B4</option>
          <option value="B5">B5</option>
      </select><div>
      <v-select @option:selecting="setChampSelected($event.text)" :options="availableLabels" label="text" >
        <template v-slot:option="option">
        <Label v-bind:Text="option.text"
                            v-bind:BGColor="option.colorBG"
                            v-bind:TextColor="option.color">
                    </Label>
        </template>
        <template v-slot:selected-option="option">
        <Label v-bind:Text="option.text"
                            v-bind:BGColor="option.colorBG"
                            v-bind:TextColor="option.color">
                    </Label>
        </template>
    </v-select>
    <v-select class="style-chooser" @option:selecting="setChampSelected($event.Name)" :options="champList" label="Name" >
      <template v-slot:selected-option="option">
      <img class="iconChamp" v-bind:src="option.Img"/>
      <span>{{option.Name}}</span> 
      </template>
      <template v-slot:option="option">
      <img class="iconChamp" v-bind:src="option.Img"/>
      <span >{{option.Name}} </span>
      </template>
  </v-select></div>
      </div>

      <div
        id="alorsAfficher"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Alors afficher</div>
      <div>
        <div
        id="Et"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Et</div>
<div
        id="Ou"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Ou</div>

      </div>
      <div>
        <div
        id="ParentheseO"
        draggable="true"
        @dragstart="drag($event)"
        class="box">(</div>
      <div
        id="ParentheseF"
        draggable="true"
        @dragstart="drag($event)"
        class="box">)</div>

      </div>
        <input
        id="input"
        type="text"
        draggable="true"
        @dragstart="drag($event)"
        class="box"/>
    </div>
    
    <div
      id=""
      :class="compiled ? 'cornerG' : 'cornerR'"
      @drop="drop($event)"
      @dragover.prevent
      @dragenter.prevent
    > 
    <div class="word">SI</div>
      <div v-for="(word,index) in rule" :key="index">
        <div class="word">{{ word.value}}</div>
        <div class="moveWords">
          <div class="leftArrow" @click="moveLeft(index)"></div>
          <div class="cross" @click="deleteCurrent(index)"></div>
          <div class="rightArrow" @click="moveRight(index)"></div>
        </div>
      </div>
      
    </div>
    <button @click="compile()">validate</button>
  </div>
</template>

<script>
import Label from '../LabelsPage/Label.vue'
import dll from '../DLL.js'
export default {
  name: "RulesPage",
  render: function (createElement) {},
  data() {
    return {
      champSelected: "",
      posSelected: "Pick",
      rule: [],
      ruleSide: "Blue",
      compiled: false,
      champList: this.$store.state.champsNameAndImg,
    };
  },
  methods: {
    setChampSelected(champSelected){
      console.log(champSelected);
      this.champSelected = champSelected;
    },
    setPosSelected(posSelected){
      console.log(posSelected);
      this.posSelected = posSelected;
    },
    goToPage(pageURL) {
      this.$router.push(pageURL);
    },

    drag(event) {
      if(event.target.id === "input"){
        event.dataTransfer.setData("itemID", event.target.id);
        event.dataTransfer.setData("itemValue", event.target.value);
      }
      else{
        event.dataTransfer.setData("itemID", event.target.id);
        event.dataTransfer.setData("itemValue", event.target.textContent);
      }
    },

    drop(event) {
      var id = event.dataTransfer.getData("itemID");
      var value = event.dataTransfer.getData("itemValue");
      console.log("adding", id, "to rule (not empty text input)");
      switch (id) {
        case "Ennemi":
        case "Moi":
          this.rule.push({type: 1, text: value});
          break;
        case "selectorType2":
          this.rule.push({type: 2, value: {pos: this.posSelected, champ: this.champSelected}});
          console.log(this.rule);
          break;
        case "alorsAfficher":
          this.rule.push({type: 3, text: value});
          break;
        case "input":
          if( value !== ""){
            this.rule.push({type: 6, value: value});
          }
          break;
        case "Et":
        case "Ou":
          this.rule.push({type: 4, value: value});
          break;
        case "ParentheseO":
        case "ParentheseF":
          this.rule.push({type: 5, value: value});
          break;
      }
    },
    setSelected(event, origin) {
      switch (origin) {
        case "labelSelector":
          this.labelSelected = event.text;
          break;
      }
    },
    moveLeft(index){
      if(index > 0){
       const item = this.rule[index-1];
       const item2 = this.rule[index];
        this.rule.splice(index-1,2,item2,item)
        console.log("moving element to left")
      }
    },
    deleteCurrent(index){
      this.rule.splice(index,1)
      console.log("deleting element")
    },
    moveRight(index){
      if(index < (this.rule.length - 1)){
       const item = this.rule[index];
       const item2 = this.rule[index+1];
        this.rule.splice(index,2,item2,item)
        console.log("moving element to right")
      }
    },
    compile(){
        //this.compiled = dll.compiler(this.rule)
        const ruleComputed =dll.computeRule(this.rule,this.ruleSide);
        
        this.$store.commit('addRule',ruleComputed);
    },
  },
  computed: {
        availableLabels() {
            return this.$store.state.labels
        },
        
    },
  components: {
      Label
  }
};
</script>

<style scoped>
.cornerB {
  border: solid 5px rgb(146, 172, 255);
  display: flex;
  height: 250px;
}
.cornerG {
  border: solid 5px rgb(146, 255, 146);
  display: flex;
  height: 250px;
}
.cornerR {
  border: solid 5px rgb(255, 132, 132);
  display: flex;
  height: 250px;
}
.box {
  margin: 10px 10px 0 0;
  width: 100px;
  height: 30px;
  border: solid 2px;
}
.boxType2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px 0 0;
  width: 300px;
  height: 40px;
  border: solid 2px;
}
.word {
  font-size: 20px;
  margin: 20px 20px 0px 0px;
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px 0 0 3px;
  border: solid;
}
.moveWords {
  height: 100%;
  display: flex;
}
.leftArrow {
  width: 30px;
  height:30px;
  background: url(../../assets/leftArrow.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.cross {
  width: 30px;
  height:30px;
  background: url(../../assets/cross.png);
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
.rightArrow {
  width: 30px;
  height:30px;
  background: url(../../assets/rightArrow.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.iconChamp{
  width: 20px;
}
</style>
