<template>
  <div>
    <h1>Rules gestion</h1>
    <button v-on:click="goToPage('/LabelsPage')">Labels gestion</button>
    <button v-on:click="goToPage('/DraftPage')">Draft</button>

    <div class="corner">
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
        <v-select  @option:selecting="setSelected($event, 'labelSelector')" :options="availableLabels" label="text" >
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
        class="box">alors afficher</div>
    </div>
    
    <div
      id=""
      class="corner"
      @drop="drop($event)"
      @dragover.prevent
      @dragenter.prevent
    > SI
      <div v-for="(word,index) in rule" :key="index">
        <div class="word">{{ word.text }}</div>
        <div class="moveWords">
          <div class="leftArrow" @click="moveLeft(index)"></div>
          <div class="cross" @click="deleteCurrent(index)"></div>
          <div class="rightArrow" @click="moveRight(index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Label from '../LabelsPage/Label.vue'
export default {
  name: "RulesPage",
  render: function (createElement) {},
  data() {
    return {
      labelSelected: "",
      rule: [],
    };
  },
  methods: {
    goToPage(pageURL) {
      this.$router.push(pageURL);
    },

    drag(event) {
      event.dataTransfer.setData("itemID", event.target.id);
    },

    drop(event) {
      var data = event.dataTransfer.getData("itemID");
      switch (data) {
        case "Moi":
          this.rule.push({type: 1, text: data});
          break;
        case "Ennemi":
          this.rule.push({type: 1, text: data});
          break;
        case "Pick":
          this.rule.push({type: 2, text: data});
          break;
        case "Ban":
          this.rule.push({type: 2, text: data});
          break;
        case "labelSelector":
          this.rule.push({type: 3, text: this.labelSelected});
          break;
        case "alorsAfficher":
          this.rule.push({type: 3, text: data});
          break;
        default:
          this.rule.push({type: 4,text: "en position " + data});
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
    }
  },
  computed: {
        availableLabels() {
          console.log(this.$store.state.labels)
            return this.$store.state.labels
        },
        
    },
  components: {
      Label
  }
};
</script>

<style scoped>
.corner {
  border: solid 5px blue;
  display: flex;
  height: 250px;
}
.box {
  margin: 10px 10px 0 0;
  width: 200px;
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
