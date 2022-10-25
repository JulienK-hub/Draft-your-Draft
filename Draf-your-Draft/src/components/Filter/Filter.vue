<template>
  <div>
    <div>
      <div class="active-label" v-for="label in this.labelsFilters">
        <button :id="label.id" v-on:click="deleteLabel($event)">supprimer</button>
        <p>{{label.text}}</p>
      </div>
    </div>
    <button v-on:click="isAddLabelHidden = !isAddLabelHidden">Ajouter label</button>
    <div v-if="!isAddLabelHidden">
      <div class="label" v-for="label in this.avalaibleLabels">
        <p>{{label.text}}</p>
        <button :id="label.id" v-on:click="addFilter($event)">+</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: "FilterVue",
  data() {
    return {
      isAddLabelHidden: true,
      labelsFilters: this.$store.getters.getFilterLabels(),
      avalaibleLabels: this.$store.getters.getLabels()
    }
  },
  methods: {
    ...mapMutations([
      'addFilterLabel'
    ]),
    deleteLabel: function (event) {
      var index = this.labelsFilters.findIndex(label => label.id == event.currentTarget.id)
      this.labelsFilters.splice(index, 1)
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsFilter(this.labelsFilters)
      this.$store.dispatch('updateChampionsByLabelsFilter')
    },
    addFilter: function (event) {
      var label = this.$store.getters.getLabelById(event.currentTarget.id)
      this.addFilterLabel(label)
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsFilter(this.labelsFilters)
      this.$store.dispatch('updateChampionsByLabelsFilter')
      this.isAddLabelHidden = !this.isAddLabelHidde;
    },
  },
}
</script>
  
<style scoped>

</style>
  