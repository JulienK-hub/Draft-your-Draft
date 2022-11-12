<template lang="">
    <div >
        <button class="button actions" v-on:click="unselectAll()">Unselect all</button>
        <div class="champList">
            <div v-on:click.ctrl="unselectChampion(champion)" v-on:click.shift="addOrRemoveUnderSelectedChamp(champion)" 
            v-for="champion in selectedChampions">
                <LolChamp :id="champion.key" v-bind:champ="champion" v-bind:isInSelectedList="true" v-bind:isUnderSelected="isUnderSelected(champion.key)" >
                </LolChamp>
            </div>
        </div>
        <v-select class="style-chooser" @option:deselecting="deleteActiveLabel" @option:selecting="addActiveLabel" multiple :options="availableLabels" label="text" >
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
            <div class="config-selected">
                <!-- 
                <div class="tg">                    
                    <button class="button actions"  v-on:click="isAddLabelHidden = !isAddLabelHidden">
                        Choisir label
                        </button>
                    <div class="active-label" v-for="label in activeLabels">                        
                        <Label v-bind:Text="label.text"
                                v-bind:BGColor="label.colorBG"
                                v-bind:TextColor="label.color">
                        </Label>
                        <button :id="label.id" v-on:click="deleteActiveLabel(label)">-</button>
                    </div>
                </div>

                <div class="addLabels" v-if="!isAddLabelHidden">
                    <div class="label" v-for="label in availableLabels">
                        <Label v-bind:Text="label.text"
                                v-bind:BGColor="label.colorBG"
                                v-bind:TextColor="label.color">
                        </Label>
                        <button :id="label.id" v-on:click="addActiveLabel(label)">+</button>
                    </div>
                </div> -->
                <div class="columnButtons">
                    <div class="rowButtons">
                    <button class="button selection" v-on:click="addActivesLabelsToChampions(underSelectedChamp)">Add label to selection</button>
                    <button class="button selection" v-on:click="deleteActivesLabelsToChampions(underSelectedChamp)">Remove label from selection</button>
                    </div>
                     <div class="rowButtons">
                    <button class="button all" v-on:click="addActivesLabelsToChampions(selectedChampions)">Add label to all</button>
                    <button class="button all" v-on:click="deleteActivesLabelsToChampions(selectedChampions)">Remove label from all</button>
                    </div>
                </div>
                

                <!--<button v-on:click="unselectAllUnderSelection()">Unselect all</button> pour déselectionner la sous-selection -->
                
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
            'deleteChampionLabel',
            'addChampionLabel',
            'addSelectedChamp',
            'deleteSelectedChamp',
            'addChampionLabel',
            'deleteChampionLabel',
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
        addActivesLabelsToChampions: function (champions) {
            champions.forEach(champion => {
                var championLabels = this.$store.getters.getLabelsByChampId(champion.key)
                this.activeLabels.forEach(label => {
                    if (!championLabels.find(l => l.id == label.id)) {
                        console.log("On ajoute le label \"" + label.text + "\" au champion " + champion.id)
                        this.addChampionLabel({ "championKey": champion.key, "idLabel": label.id })
                    }
                })
            })
        },
        deleteActivesLabelsToChampions: function (champions) {
            champions.forEach(champion => {
                var championLabels = this.$store.getters.getLabelsByChampId(champion.key)
                this.activeLabels.forEach(label => {
                    if ((championLabels.find(l => l.id == label.id))) {
                        console.log("On lève le label \"" + label.text + "\" au champion " + champion.id)
                        this.deleteChampionLabel({ "championKey": champion.key, "idLabel": label.id })
                    }
                })
            })
        },
        unselectAll: function () {
            this.underSelectedChamp.splice(0, this.underSelectedChamp.length)
            this.EmptySelectedChamps()
        },
        unselectAllUnderSelection: function () {
            this.underSelectedChamp.forEach(champ => {
                document.getElementById(champ.key).removeAttribute('class')

            })
            this.underSelectedChamp.splice(0, this.underSelectedChamp.length)

        },
        isUnderSelected: function (championKey){
            return this.underSelectedChamp.some(champion => champion.key == championKey)
        }
    },
    computed: {
        ...mapState({
            selectedChampions: 'selectedChamps'
        }),
        availableLabels() {
            return this.$store.getters.getAvailableLabelsFilter(this.activeLabels)
        },
        
    },
    components: {
        LolChamp,
        Label
    }

}
</script>

<style scoped>
.addLabels {
    border: solid;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 2%;
}

.tg {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.active-label {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.columnButtons {
    display: flex;
    flex-direction: row;
}

.champList {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    border: 4mm ridge #C8AA6E;
    margin: 5px;
    padding: 5px;
    height: 400px;
    overflow: auto;
    text-align: justify;
    background: url(../../assets/assassinIcon.png);
    background-blend-mode: lighten;
    background-color: rgb(255, 255, 255,0.1);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 60%;
}

.selectedChamps {
    border: 7px ridge #0397AB
}

/* https://github.com/doceazedo/hextech-css/blob/master/LICENSE */
.button {
    font-family: 'Beaufort';
    text-transform: uppercase;
    font-size: 18px;
    color: #242731;
    padding: .45rem 2rem;
    margin-bottom: 5px;
}

/* ACTION TO SELECTION
   ====================== */

.button.selection {
    border: 3px solid;
    border-radius: 0;
    background: linear-gradient(#0AC8B9, #0397AB);
    border-image: #242731;
    transition: all ease .25s;
}

.button.selection:not([disabled]):hover {
    box-shadow: 0 0 5px 2px rgba(192, 252, 253, .4), inset 0 0 5px 2px rgba(192, 252, 253, .3);
    border: 3px solid #CDFAFA;
    color: #CDFAFA;
    cursor: pointer;
}
/* ACTION TO ALL
   ================*/
.button.all {
    border: 3px solid;
    border-radius: 0;
    background: linear-gradient(#f6c97f, #ca9d4b);
    border-image: #242731;
    transition: all ease .25s;
}

.button.all:not([disabled]):hover {
    box-shadow: 0 0 5px 2px rgba(192, 252, 253, .4), inset 0 0 5px 2px rgba(192, 252, 253, .3);
    border: 3px solid #eee2cc;
    color: #eee2cc;
    cursor: pointer;
}
</style>