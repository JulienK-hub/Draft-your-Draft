<template>
  <div>
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
        <div class="label" v-for="label in this.avalaibleLabels">
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
      champLabels: this.$store.getters.getLabelsByChampId(this.champ.key),
      avalaibleLabels: this.$store.getters.getAvailableLabelsChamp(this.champ.key)
    }
  },
  computed: {
    ...mapState([
      'labels'
    ])
  },

  methods: {
    ...mapMutations([
      'deleteChampionLabelByLabelId',
      'addChampionLabel'
    ]),
    deleteLabel: function (event) {
      var championLabel = { "championKey": this.champ.key, "idLabel": event.currentTarget.id };
      this.deleteChampionLabelByLabelId(championLabel);
      this.champLabels = this.$store.getters.getLabelsByChampId(this.champ.key);
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsChamp(this.champ.key)
      this.$store.dispatch('updateChampionsByLabelsFilter')
    },
    addLabel: function (event) {
      var championLabel = { "championKey": this.champ.key, "idLabel": event.currentTarget.id };
      this.addChampionLabel(championLabel);
      this.champLabels = this.$store.getters.getLabelsByChampId(this.champ.key);
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsChamp(this.champ.key)
      this.$store.dispatch('updateChampionsByLabelsFilter')
      this.isAddLabelHidden = !this.isAddLabelHidde;
    },
  }
}
</script>
  
<style scoped>

</style>
  