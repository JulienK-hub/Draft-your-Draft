<template lang="">
    <div>
        <div class="selected-champion-list">
            <div v-on:click.ctrl="unselectChampion(champion)" v-on:click.shift="addOrRemoveUnderSelectedChamp(champion)" v-for="champion in selectedChampions">
                <LolChamp v-bind:champ="champion">
                </LolChamp>
            </div>
        </div>
            <div class="config-selected">
                <div class="active-label" v-for="label in activeLabels">
                    <button :id="label.id" v-on:click="deleteActiveLabel(label)">supprimer</button>
                    <Label v-bind:Text="label.text"
                            v-bind:BGColor="label.colorBG"
                            v-bind:TextColor="label.color">
                    </Label>
                </div>
          
                <button v-on:click="isAddLabelHidden = !isAddLabelHidden">Ajouter label</button>
                <div v-if="!isAddLabelHidden">
                    <div class="label" v-for="label in availableLabels">
                        <Label v-bind:Text="label.text"
                                v-bind:BGColor="label.colorBG"
                                v-bind:TextColor="label.color">
                        </Label>
                        <button :id="label.id" v-on:click="addActiveLabel(label)">+</button>
                    </div>
                </div>
                <button v-on:click="addActivesLabelsToChampions(underSelectedChamp)">Add label to selection</button>
                <button v-on:click="deleteActivesLabelsToChampions(underSelectedChamp)">Retrieve label from selection</button>

                <button v-on:click="addActivesLabelsToChampions(selectedChampions)">Add label to all</button>
                <button v-on:click="deleteActivesLabelsToChampions(selectedChampions)">Retrieve label from all</button>

                <button v-on:click="unselectAllUnderSelection()">Unselect all</button>
                <button v-on:click="unselectAll()">Empty</button>
            </div>
    </div>
</template>
<script>
import LolChamp from '../LolChamp/LolChamp.vue';
import Label from '../LabelsPage/Label.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SelectedChamp',
    data() {
        return {
            underSelectedChamp: [],
            activeLabels: [],
            isAddLabelHidden: true
        }
    },
    methods: {
        ...mapMutations([
            'deleteChampionLabelByLabelId',
            'addChampionLabel',
            'addSelectedChamp',
            'deleteSelectedChamp',
            'addChampionLabel',
            'deleteChampionLabelByLabelId',
            'EmptySelectedChamps'
        ]),
        unselectChampion: function (champion) {
            console.log("add " + champion.id + " unselected")
            this.removeUnderSelectedChamp(champion.key)
            this.deleteSelectedChamp(champion.key)
        },
        addOrRemoveUnderSelectedChamp: function (champion) {
            if (!this.removeUnderSelectedChamp(champion.key)) {
                console.log("add " + champion.id + " to under selected champions")
                this.underSelectedChamp.push(champion)
            }
        },
        removeUnderSelectedChamp: function (championKey) {
            var index = 0
            if ((index = this.underSelectedChamp.findIndex(champ => champ.key == championKey)) != -1) {
                console.log("Champion " + championKey + " under unselected")
                this.underSelectedChamp.splice(index, 1)
                return true
            }
            return false
        },
        addActiveLabel: function (label) {
            if (this.activeLabels.find(l => l.id == label.id))
                return
            console.log("Add label \"" + label.text + "\" to active labels")
            this.activeLabels.push(label)
        },
        deleteActiveLabel: function (label) {
            var index = 0
            if ((index = this.activeLabels.findIndex(l => l.id == label.id)) != -1) {
                this.activeLabels.splice(index, 1)
                console.log("Delete label \"" + label.text + "\" to active labels")
            }
        },
        addActivesLabelsToChampions: function (champions){
            champions.forEach(champion => {
                var championLabels = this.$store.getters.getLabelsByChampId(champion.key)
                this.activeLabels.forEach(label =>{
                    if( !championLabels.find(l => l.id == label.id)){
                        console.log("On ajoute le label \"" + label.text + "\" au champion " + champion.id)
                        this.addChampionLabel({ "championKey": champion.key, "idLabel": label.id})
                    }
                })
            })
        },
        deleteActivesLabelsToChampions: function (champions){
            champions.forEach(champion => {
                var championLabels = this.$store.getters.getLabelsByChampId(champion.key)
                this.activeLabels.forEach(label => {
                    if( (championLabels.find(l => l.id == label.id)) ){
                        console.log("On lève le label \"" + label.text + "\" au champion " + champion.id)
                        this.deleteChampionLabelByLabelId({ "championKey": champion.key, "idLabel": label.id})
                    }
                })
            })
        },
        unselectAll: function (){
            this.underSelectedChamp.splice(0, this.underSelectedChamp.length)
            this.EmptySelectedChamps()
        },
        unselectAllUnderSelection: function() {
            this.underSelectedChamp.splice(0, this.underSelectedChamp.length)
        }
    },
    computed: {
        ...mapState({
            selectedChampions: 'selectedChamps'
        }),
        availableLabels() {
            return this.$store.getters.getAvailableLabelsFilter(this.activeLabels)
        }
    },
    components: {
        LolChamp,
        Label
    }

}
</script>
<style lang="">
    
</style>