<template>
  <div v-if="isFiltered()">
    <div v-on:click="onClickIcon($event)">
      <img class="champ-icon" :src="champ.image.full" :alt="champ.id" />
    </div>
    <div v-if="!isHidden">
      <div class="label" v-for="label in champLabels">
        <button :id="label.id" v-on:click="deleteLabel($event)">supprimer</button>
        <Label v-bind:Text="label.text"
              v-bind:BGColor="label.colorBG"
              v-bind:TextColor="label.color">
        </Label>
      </div>
      <button v-on:click="isAddLabelHidden = !isAddLabelHidden">Ajouter label</button>
      <div v-if="!isAddLabelHidden">
        <div class="label" v-for="label in avalaibleLabels">
          <Label v-bind:Text="label.text"
                v-bind:BGColor="label.colorBG"
                v-bind:TextColor="label.color">
          </Label>
          <button :id="label.id" v-on:click="addLabel($event)">+</button>
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
      'deleteChampionLabelByLabelId',
      'addChampionLabel',
    ]),
    deleteLabel: function (event) {
      var championLabel = { "championKey": this.champ.key, "idLabel": event.currentTarget.id };
      this.deleteChampionLabelByLabelId(championLabel);
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
      if(!event.ctrlKey){
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

</style>
  