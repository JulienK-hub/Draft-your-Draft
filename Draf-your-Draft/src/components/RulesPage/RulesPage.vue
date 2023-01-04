<template>
  <div>
    <div class="menu">
      <h1>Gestion des règles</h1>
      <button class="button menu" v-on:click="goToPage('/LabelsPage')">Labels</button>
      <button class="button menu" v-on:click="goToPage('/DraftPage')">Draft</button>
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
          <option value="All">Pick/Ban</option>
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
      </select><div class="selectors">
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
      
      <div
        id="alorsAfficher"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Alors afficher</div>
        <input
        id="input"
        type="text"
        draggable="true"
        @dragstart="drag($event)"
        placeholder="_ _ _ _ _ _ _ _ _"
        class="box"/>
    </div>
    
    <div
      id=""
      :class="compiled ? 'cornerG' : 'cornerR'"
      @drop="drop($event)"
      @dragover.prevent
      @dragenter.prevent
    > 
    <div><div class="word">SI</div></div>
      <div v-for="(word,index) in rule" :key="index">
        <div v-if="word.type !== 2" class="word">{{ word.value}}</div>
        
        <div v-else class="word">{{word.value.pos}} {{word.value.champ}}</div>
        <div class="moveWords">
          <div class="leftArrow" @click="moveLeft(index)"></div>
          <div class="cross" @click="deleteCurrent(index)"></div>
          <div class="rightArrow" @click="moveRight(index)"></div>
        </div>
      </div>
    </div>
    <button class="button actions margin-top" @click="compile()">VALIDER</button>
    <ListRules @clicked="displayRule" />

  </div>
</template>

<script>
import Label from '../LabelsPage/Label.vue'
import dll from '../DLL.js'
import ListRules from './ListRules.vue';
export default {
  name: "RulesPage",
  render: function (createElement) {},
  data() {
    return {
      champSelected: "",
      posSelected: "Pick",
      rule: [],
      ruleSide: "Both",
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
    handleSideSelectionClick(side){
      console.log("side changed to",side);
      this.ruleSide = side;
    },
    drop(event) {
      var id = event.dataTransfer.getData("itemID");
      var value = event.dataTransfer.getData("itemValue");
      console.log("adding", id, "to rule (not empty text input)");
      switch (id) {
        case "Ennemi":
        case "Moi":
          this.rule.push({type: 1, value: value});
          break;
        case "selectorType2":
          
        if(this.champSelected !== ""){
          this.rule.push({type: 2, value: {pos: this.posSelected, champ: this.champSelected}});
          console.log(this.rule);
        }
          break;
        case "alorsAfficher":
          this.rule.push({type: 3, value: value});
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
    displayRule(rule){
      console.log("display rule clicked",rule );
      this.rule = rule.ruleNotComputed;
      this.ruleSide= rule.ruleSide;
      let radiobtn = document.getElementById(rule.ruleSide);
      radiobtn.checked = true;
    }
  },
  computed: {
        availableLabels() {
            return this.$store.state.labels
        },
        
    },
  components: {
    Label,
    ListRules
}
};
</script>

<style scoped>

.cornerB {
  /*border: solid 5px rgb(146, 172, 255);*/
  display: flex;
  height: 250px;
}
.cornerG {
  /*border: solid 5px rgb(146, 255, 146);*/
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  height: auto;
}
.cornerR {
  /*border: solid 5px rgb(255, 132, 132);*/
  display: flex;
  flex-wrap: wrap;
  min-height: 250px;
  height: auto;
}
.box {
  font-size: large;
  cursor: grab;
  margin: 10px 10px 0 0;
  width: 130px;
  height: min-content;
  border: solid 2px;
  background: linear-gradient(#f6c97f, #ca9d4b);
  line-height: 180%;
}
.boxType2 {
  
  cursor: grab;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 10px 0 0;
  width: 300px;
  height: min-content;
  border: solid 2px;
  background: linear-gradient(#f6c97f, #ca9d4b);
}
.word {
  font-size: 20px;
  margin: 20px 20px 0px 0px;
  padding: 6px 12px;
  border-radius: 3px 0 0 3px;
  background: linear-gradient(#0AC8B9, #0397AB);
  border: solid;
}
.first-word {
  font-size: 20px;
  margin: 20px 20px 0px 0px;
  padding: 6px 12px;
  background: linear-gradient(#f6c97f, #ca9d4b);
  border-radius: 3px 0 0 3px;
  border: solid;
  height: 50px;
}
.moveWords {
  height: 100%;
  display: inline-flex;
  margin-right: 20px;
}
.leftArrow {
  cursor: pointer;
  width: 30px;
  height:30px;
  background: url(../../assets/leftArrow.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.cross {
  cursor: pointer;
  width: 30px;
  height:30px;
  scale: 90%;
  background: url(../../assets/cross.png);
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}
.rightArrow {
  cursor: pointer;
  width: 30px;
  height:30px;
  background: url(../../assets/rightArrow.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.iconChamp{
  width: 20px;
}
.selectors{
  min-width: 100px;
}
</style>
