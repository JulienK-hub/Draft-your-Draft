<template>
  <div v-if="isFiltered()" class="central">
    <div v-on:click="onClickIcon($event)">
      <img class="champ-icon" :src="champ.image.full" :alt="champ.id" />
    </div>
    <div class="scrollBarDiv" v-if="!isHidden">
      <div class="label" v-for="label in champLabels">
        <div  class="minus" :id="label.id" v-on:click="deleteLabel($event)"></div>
        <Label v-bind:Text="label.text"
              v-bind:BGColor="label.colorBG"
              v-bind:TextColor="label.color">
        </Label>
      </div>
      <button class="showLabel" v-on:click="isAddLabelHidden = !isAddLabelHidden">labels</button>  
      <div v-if="!isAddLabelHidden">
        <div class="label" :id="label.id" v-on:click="addLabel($event)" v-for="label in avalaibleLabels">
          <Label v-bind:Text="label.text"
                v-bind:BGColor="label.colorBG"
                v-bind:TextColor="label.color">
          </Label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Label from '../LabelsPage/Label.vue'

export default {
  name: 'LolChamp',
  props: {
    champ: Object,
    isInSelectedList: Boolean
  },
  data() {
    return {
      isHidden: true,
      isAddLabelHidden: true,
    }
  },
  computed: {
    ...mapState([
      'labels',
      'filterLabels'
    ]),
    avalaibleLabels(){
        return this.$store.getters.getAvailableLabelsChamp(this.champ.key)
    },
    champLabels(){
      return this.$store.getters.getLabelsByChampId(this.champ.key)
    }

  },

  methods: {
    ...mapMutations([
      'deleteChampionLabel',
      'addChampionLabel',
    ]),
    deleteLabel: function (event) {
      console.log("abc")
      var championLabel = { "championKey": this.champ.key, "idLabel": event.currentTarget.id };
      this.deleteChampionLabel(championLabel);
      this.champLabels = this.$store.getters.getLabelsByChampId(this.champ.key);
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsChamp(this.champ.key)
    },
    addLabel: function (event) {
      var championLabel = { "championKey": this.champ.key, "idLabel": event.currentTarget.id };
      this.addChampionLabel(championLabel);
      this.champLabels = this.$store.getters.getLabelsByChampId(this.champ.key);
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsChamp(this.champ.key)
      this.isAddLabelHidden = !this.isAddLabelHidde;
    },
    isFiltered: function () {
      if(this.isInSelectedList)
        return true;

      var isCorrespondingToLabels = true;
      for (var j = 0; j < this.filterLabels.length; ++j) {
        if (!this.champLabels.find(championLabel => championLabel.id == this.filterLabels[j].id)) {
          isCorrespondingToLabels = false;
          break;
        }
        else {
          isCorrespondingToLabels = true;
        }
      }
      return isCorrespondingToLabels;
    },
    onClickIcon: function(event){
      if(!event.ctrlKey && !event.shiftKey){
        this.isHidden = !this.isHidden
      }
        

    }
  },
  components: {
    Label
  }
}
</script>
  
<style scoped>
.champ-icon{
  height: 100px;
  width: 100px;
}
.scrollBarDiv {
  margin:5px;
  padding:5px;
  background-color: transparent;
  width: 80px;
  height: auto;
  overflow: auto;
}
.deleteBtn{
  color: black;
  border-radius: 50%;
}
.label{
  display: flex;
}
.minus { 
  min-width: 20px;
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(../../assets/minus.png);
}
.showLabel{
  position: center;
  margin-bottom: 5px;
}

</style>
  