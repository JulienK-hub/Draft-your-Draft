<template>
  <div>
    <v-select class="style-chooser" @option:deselecting="deleteLabel" @option:selecting="addFilter" multiple :options="avalaibleLabels" label="text" >
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
    deleteLabel: function (label1) {
      var index = this.labelsFilters.findIndex(label => label.id == label1.id)
      this.labelsFilters.splice(index, 1)
      this.avalaibleLabels = this.$store.getters.getAvailableLabelsFilter(this.labelsFilters)
    },
    addFilter: function (label) {
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
  