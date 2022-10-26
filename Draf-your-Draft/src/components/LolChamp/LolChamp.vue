<template>
  <div v-if="isFiltered()">
    <div v-on:click="isHidden = !isHidden">
      <img class="champ-icon" :src="champ.image.full" :alt="champ.id" />
    </div>
    <div v-if="!isHidden">
      <div class="label" v-for="label in champLabels">
        <button :id="label.id" v-on:click="deleteLabel($event)">supprimer</button>
        <p>{{label.text}}</p>
      </div>
      <button v-on:click="isAddLabelHidden = !isAddLabelHidden">Ajouter label</button>
      <div v-if="!isAddLabelHidden">
        <div class="label" v-for="label in avalaibleLabels">
          <p>{{label.text}}</p>
          <button :id="label.id" v-on:click="addLabel($event)">+</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

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
  }
}
</script>
  
<style scoped>

</style>
  