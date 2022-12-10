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
      <div>
        <div
        id="Pick"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Pick</div>
      
      <div
        id="Ban"
        draggable="true"
        @dragstart="drag($event)"
        class="box">Ban</div>
      </div>
      <div
        id="labelSelector"
        draggable="true"
        @dragstart="drag($event)"
        class="box"
      >
        <v-select @option:selecting="setSelected($event, 'labelSelector')" :options="availableLabels" label="text" >
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
      </div>
      <div style="display: flex">
        <div>
        <div
        id="P1"
        draggable="true"
        @dragstart="drag($event)"
        class="box">P1</div>
      
      <div
        id="P2"
        draggable="true"
        @dragstart="drag($event)"
        class="box">P2</div>
      <div
        id="P3"
        draggable="true"
        @dragstart="drag($event)"
        class="box">P3</div>
      <div
        id="P4"
        draggable="true"
        @dragstart="drag($event)"
        class="box">P4</div>
      <div
        id="P5"
        draggable="true"
        @dragstart="drag($event)"
        class="box">P5</div></div>
        <div>
      <div
        id="B1"
        draggable="true"
        @dragstart="drag($event)"
        class="box">B1</div>
        <div
        id="B2"
        draggable="true"
        @dragstart="drag($event)"
        class="box">B2</div>
        <div
        id="B3"
        draggable="true"
        @dragstart="drag($event)"
        class="box">B3</div>
        <div
        id="B4"
        draggable="true"
        @dragstart="drag($event)"
        class="box">B4</div>
        <div
        id="B5"
        draggable="true"
        @dragstart="drag($event)"
        class="box">B5</div></div>
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
        <div class="word">{{ word.text }}</div>
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
      labelSelected: "",
      rule: [],
      compiled: false,
    };
  },
  methods: {
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
        case "Ban":
        case "Pick":
          this.rule.push({type: 2, text: value});
          break;
        case "labelSelector":
          if(this.labelSelected !== ""){
            this.rule.push({type: 3, text: this.labelSelected});
          }
          break;
        case "alorsAfficher":
          this.rule.push({type: 5, text: value});
          break;
        case "input":
          if( value !== ""){
            this.rule.push({type: 3, text: value});
          }
          break;
        case "Et":
        case "Ou":
          this.rule.push({type: 6, text: value});
          break;
        case "ParentheseO":
        case "ParentheseF":
          this.rule.push({type: 7, text: value});
          break;
        default:
          this.rule.push({type: 4,text: "en position " + value});
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
        console.log("moving element to right")
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
        console.log("moving element to left")
      }
    },
    compile(){
        this.compiled = dll.compiler(this.rule)
    }
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
</style>
