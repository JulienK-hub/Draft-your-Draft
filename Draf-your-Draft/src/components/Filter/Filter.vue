<template>
  <div>
    <div>
      <div class="active-label" v-for="label in this.labelsFilters">
        <button :id="label.id" v-on:click="deleteLabel($event)">supprimer</button>
        <Label v-bind:Text="label.text"
               v-bind:BGColor="label.colorBG"
               v-bind:TextColor="label.color">

        </Label>
      </div>
    </div>
    <button v-on:click="isAddLabelHidden = !isAddLabelHidden">Ajouter label</button>
    <div v-if="!isAddLabelHidden">
      <div class="label" v-for="label in this.avalaibleLabels">
        <Label v-bind:Text="label.text"
               v-bind:BGColor="label.colorBG"
               v-bind:TextColor="label.color">
        </Label>
        <button :id="label.id" v-on:click="addFilter($event)">+</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapMutations, mapState } from 'vuex'
import Label from '../LabelsPage/Label.vue'

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
    },
    addFilter: function (event) {
      var label = this.$store.getters.getLabelById(event.currentTarget.id)
      this.addFilterLabel(label)
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsFilter(this.labelsFilters)
      this.isAddLabelHidden = !this.isAddLabelHidde;
    },
  },
  components: {
    Label
  }
}
</script>
  
<style scoped>

</style>
  