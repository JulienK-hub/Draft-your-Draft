import Vue from 'vue'
import Vuex from 'vuex'
import champData from '../assets/champion.json'

function isFiltered (champLabels, filterLabels)  {
  var isCorrespondingToLabels = true;
  for (var j = 0; j < filterLabels.length; ++j) {
    if (!champLabels.find(championLabel => championLabel.id == filterLabels[j].id)) {
      isCorrespondingToLabels = false;
      break;
    }
    else {
      isCorrespondingToLabels = true;
    }
  }
  return isCorrespondingToLabels;
}

function getChampsNameAndImg(){
  var res = []
  champData.forEach(champion => {
    res.push({Name: champion.name, Img: champion.image.full}) 
  })
  return res;
}

Vue.use(Vuex)
// Create a new store instance.
export default new Vuex.Store({
  state: {
    labelsCount:5,
    labels: [{"id":0,"text":"adc","colorBG":"#fb00ff","color":"white"},{"id":1,"text":"top","colorBG":"#753838","color":"white"},{"id":2,"text":"mid","colorBG":"#00ff04","color":"black"},{"id":3,"text":"supp","colorBG":"#006eff","color":"white"},{"id":4,"text":"jgl","colorBG":"#fff700","color":"black"}],
    championsLabels: [{"championKey":"96","idLabel":0},{"championKey":"22","idLabel":0},{"championKey":"523","idLabel":0},{"championKey":"51","idLabel":0},{"championKey":"81","idLabel":0},{"championKey":"119","idLabel":0},{"championKey":"202","idLabel":0},{"championKey":"222","idLabel":0},{"championKey":"145","idLabel":0},{"championKey":"429","idLabel":0},{"championKey":"236","idLabel":0},{"championKey":"21","idLabel":0},{"championKey":"895","idLabel":0},{"championKey":"360","idLabel":0},{"championKey":"15","idLabel":0},{"championKey":"18","idLabel":0},{"championKey":"67","idLabel":0},{"championKey":"110","idLabel":0},{"championKey":"29","idLabel":0},{"championKey":"498","idLabel":0},{"championKey":"221","idLabel":0},{"championKey":"266","idLabel":1},{"championKey":"166","idLabel":1},{"championKey":"164","idLabel":1},{"championKey":"31","idLabel":1},{"championKey":"122","idLabel":1},{"championKey":"36","idLabel":1},{"championKey":"86","idLabel":1},{"championKey":"41","idLabel":1},{"championKey":"114","idLabel":1},{"championKey":"150","idLabel":1},{"championKey":"79","idLabel":1},{"championKey":"887","idLabel":1},{"championKey":"74","idLabel":1},{"championKey":"420","idLabel":1},{"championKey":"39","idLabel":1},{"championKey":"24","idLabel":1},{"championKey":"126","idLabel":1},{"championKey":"43","idLabel":1},{"championKey":"10","idLabel":1},{"championKey":"85","idLabel":1},{"championKey":"240","idLabel":1},{"championKey":"57","idLabel":1},{"championKey":"54","idLabel":1},{"championKey":"82","idLabel":1},{"championKey":"75","idLabel":1},{"championKey":"2","idLabel":1},{"championKey":"516","idLabel":1},{"championKey":"80","idLabel":1},{"championKey":"78","idLabel":1},{"championKey":"133","idLabel":1},{"championKey":"58","idLabel":1},{"championKey":"107","idLabel":1},{"championKey":"92","idLabel":1},{"championKey":"68","idLabel":1},{"championKey":"113","idLabel":1},{"championKey":"13","idLabel":1},{"championKey":"102","idLabel":1},{"championKey":"98","idLabel":1},{"championKey":"875","idLabel":1},{"championKey":"27","idLabel":1},{"championKey":"14","idLabel":1},{"championKey":"72","idLabel":1},{"championKey":"50","idLabel":1},{"championKey":"17","idLabel":1},{"championKey":"48","idLabel":1},{"championKey":"23","idLabel":1},{"championKey":"77","idLabel":1},{"championKey":"6","idLabel":1},{"championKey":"106","idLabel":1},{"championKey":"19","idLabel":1},{"championKey":"157","idLabel":1},{"championKey":"777","idLabel":1},{"championKey":"83","idLabel":1},{"championKey":"103","idLabel":2},{"championKey":"84","idLabel":2},{"championKey":"166","idLabel":2},{"championKey":"34","idLabel":2},{"championKey":"1","idLabel":2},{"championKey":"136","idLabel":2},{"championKey":"268","idLabel":2},{"championKey":"63","idLabel":2},{"championKey":"69","idLabel":2},{"championKey":"42","idLabel":2},{"championKey":"245","idLabel":2},{"championKey":"3","idLabel":2},{"championKey":"105","idLabel":2},{"championKey":"74","idLabel":2},{"championKey":"43","idLabel":2},{"championKey":"38","idLabel":2},{"championKey":"30","idLabel":2},{"championKey":"55","idLabel":2},{"championKey":"7","idLabel":2},{"championKey":"127","idLabel":2},{"championKey":"99","idLabel":2},{"championKey":"90","idLabel":2},{"championKey":"518","idLabel":2},{"championKey":"61","idLabel":2},{"championKey":"246","idLabel":2},{"championKey":"13","idLabel":2},{"championKey":"147","idLabel":2},{"championKey":"50","idLabel":2},{"championKey":"517","idLabel":2},{"championKey":"134","idLabel":2},{"championKey":"163","idLabel":2},{"championKey":"91","idLabel":2},{"championKey":"18","idLabel":2},{"championKey":"4","idLabel":2},{"championKey":"110","idLabel":2},{"championKey":"112","idLabel":2},{"championKey":"711","idLabel":2},{"championKey":"161","idLabel":2},{"championKey":"45","idLabel":2},{"championKey":"101","idLabel":2},{"championKey":"8","idLabel":2},{"championKey":"238","idLabel":2},{"championKey":"777","idLabel":2},{"championKey":"157","idLabel":2},{"championKey":"115","idLabel":2},{"championKey":"26","idLabel":2},{"championKey":"142","idLabel":2},{"championKey":"12","idLabel":3},{"championKey":"32","idLabel":3},{"championKey":"22","idLabel":3},{"championKey":"432","idLabel":3},{"championKey":"53","idLabel":3},{"championKey":"201","idLabel":3},{"championKey":"3","idLabel":3},{"championKey":"74","idLabel":3},{"championKey":"40","idLabel":3},{"championKey":"43","idLabel":3},{"championKey":"99","idLabel":3},{"championKey":"117","idLabel":3},{"championKey":"89","idLabel":3},{"championKey":"111","idLabel":3},{"championKey":"25","idLabel":3},{"championKey":"267","idLabel":3},{"championKey":"555","idLabel":3},{"championKey":"888","idLabel":3},{"championKey":"526","idLabel":3},{"championKey":"497","idLabel":3},{"championKey":"235","idLabel":3},{"championKey":"147","idLabel":3},{"championKey":"16","idLabel":3},{"championKey":"37","idLabel":3},{"championKey":"223","idLabel":3},{"championKey":"50","idLabel":3},{"championKey":"44","idLabel":3},{"championKey":"412","idLabel":3},{"championKey":"161","idLabel":3},{"championKey":"350","idLabel":3},{"championKey":"26","idLabel":3},{"championKey":"200","idLabel":4},{"championKey":"131","idLabel":4},{"championKey":"28","idLabel":4},{"championKey":"60","idLabel":4},{"championKey":"245","idLabel":4},{"championKey":"9","idLabel":4},{"championKey":"104","idLabel":4},{"championKey":"427","idLabel":4},{"championKey":"59","idLabel":4},{"championKey":"30","idLabel":4},{"championKey":"141","idLabel":4},{"championKey":"64","idLabel":4},{"championKey":"203","idLabel":4},{"championKey":"121","idLabel":4},{"championKey":"876","idLabel":4},{"championKey":"62","idLabel":4},{"championKey":"11","idLabel":4},{"championKey":"57","idLabel":4},{"championKey":"2","idLabel":4},{"championKey":"20","idLabel":4},{"championKey":"56","idLabel":4},{"championKey":"76","idLabel":4},{"championKey":"80","idLabel":4},{"championKey":"78","idLabel":4},{"championKey":"246","idLabel":4},{"championKey":"421","idLabel":4},{"championKey":"33","idLabel":4},{"championKey":"107","idLabel":4},{"championKey":"113","idLabel":4},{"championKey":"35","idLabel":4},{"championKey":"102","idLabel":4},{"championKey":"72","idLabel":4},{"championKey":"91","idLabel":4},{"championKey":"48","idLabel":4},{"championKey":"77","idLabel":4},{"championKey":"254","idLabel":4},{"championKey":"234","idLabel":4},{"championKey":"106","idLabel":4},{"championKey":"19","idLabel":4},{"championKey":"5","idLabel":4},{"championKey":"238","idLabel":4},{"championKey":"154","idLabel":4},{"championKey":"143","idLabel":"3"}],
    filterLabels: [],
    selectedChamps: [],
    rules: [],
    champsNameAndImg: getChampsNameAndImg(),
  },
  mutations: {
    createLabel(state, { newText, newColorBG, newColor }) {
      var label = { id: state.labelsCount, text: newText, colorBG: newColorBG, color: newColor }
      state.labels.push(label);
      state.labelsCount++;
      console.log("label created:", state.labels[state.labels.length - 1])
    },
    deleteLabel(state,id){
      let index = state.labels.findIndex(element => element.id == id);
      console.log("delete label: ",id,"from index",index)
      state.labels.splice(index,1);
      this.commit('deleteChampionLabelByLabelId', id);
    },
    deleteChampionLabelByLabelId(state, id) {
      for(let i = 0; i < state.championsLabels.length; i++) {
        const element = state.championsLabels[i];
        if(element.idLabel == id){
          console.log("delete champLabel: ",id,"from champID",element.championKey)
          state.championsLabels.splice(i,1);
          i--;
        }
      }
    },
    deleteChampionLabel(state, championLabel) {
      for (let i = 0; i < state.championsLabels.length; ++i) {
        if (state.championsLabels[i].championKey == championLabel.championKey &&
          state.championsLabels[i].idLabel == championLabel.idLabel) {
          state.championsLabels.splice(i, 1);
          return true;
        }
      }
      return false;
    },
    getLastLabelId() {
      return state.labels[labels.length];
    },

    addChampionLabelById(state, championLabel) {
      var newLabelId = getLastLabelId()
      var label = { "id": newLabelId, "text": championLabel.text };
      state.labels.push(label)

      var newChampionLabel = { "championKey": championLabel.championKey, "idLabel": newLabelId }
      state.championsLabels.push(newChampionLabel);
    },
    addChampionLabel(state, championLabel) {
      state.championsLabels.push(championLabel);
    },
    addFilterLabel(state, label) {
      state.filterLabels.push(label)
    },

    addRule(state,newRule){
      console.log("adding rule",newRule);
      state.rules.push(newRule);
      console.log("liste rules",state.rules);
    },

    deleteRule(state,id){
      let index = state.rules.findIndex(rule => rule.id === id);
      state.rules.splice(index,1);
    },
    addSelectedChamp(state, champion){
      if(state.selectedChamps.find(champ => champ.key == champion.key)){
        console.log("Champion " + champion.id + " already selected")
      }
      else{
        state.selectedChamps.push(champion)
        console.log("add " + champion.id + " to selected champs")
      }
    },
    deleteSelectedChamp(state, championKey){
      let index = state.selectedChamps.findIndex(champ => champ.key == championKey)
      state.selectedChamps.splice(index, 1)
    },
    EmptySelectedChamps(state){
      var length = state.selectedChamps.length
      state.selectedChamps.splice(0, length)
      console.log("All champions unselected")
    },
    selectChampions(state, champions){
      state.selectedChamps = champions.slice();
    },
  },
  getters: {
    getFilteredChampions: (state, getters) => () =>{ 
      var filteredChampions = []
      state.selectedChamps = champData.slice();
      champData.forEach(champion => {
        var labels = getters.getLabelsByChampId(champion.key)
        if(isFiltered(labels, state.filterLabels)){
          filteredChampions.push(champion)
        }
      })
      return filteredChampions;
    },
    getSelectedChamps: (state) => () => {
      return state.selectedChamps;
    },

    getFilterLabels: (state) => () => {
      return state.filterLabels;
    },
    
    getLabelsFromChampName : (state, getters) => (championName) => {
      let champId = getters.getChampbyChampName(championName).key;
      let labels = getters.getLabelsByChampId(champId);
      let res = [];
      labels.forEach(label => {
        res.push(label.text);
      })
      return res;
      
    },
    getChampbyChampName: (state) => (championName) =>{
      for (let i = 0; i < champData.length; i++) {
        if (champData[i].name == championName) {
          return champData[i];
        }
      };
    },
    getLabelsByChampId: (state, getters) => (keyChampion) => {
      var labels = [];
      for (let i = 0; i < state.championsLabels.length; i++) {
        if (state.championsLabels[i].championKey == keyChampion) {
          console.log("Pour le champion : " + keyChampion + " On trouve le label : " + state.championsLabels[i].idLabel)
          labels.push(getters.getLabelById(state.championsLabels[i].idLabel))
        }
      }
      return labels;
    },

    getChampionById: (state) => (keyChampion) => {
      for (let i = 0; i < champData.length; i++) {
        console.log("looking for keyCHampion : " + keyChampion + " in store")
        if (champData[i].key == keyChampion) {
          return champData[i];
        }
      };
    },
    getLabels: (state) => () => {
      return state.labels;
    },
    getLabelById: (state) => (idLabel) => {
      for (let i = 0; i < state.labels.length; i++) {
        console.log("looking for idLabel : " + idLabel + " in store")
        if (state.labels[i].id == idLabel) {
          console.log(state.labels[i].text);
          return state.labels[i];
        }
      };
    },
    getAvailableLabelsChamp: (state, getters) => (championKey) => {
      var avalaible = state.labels.slice();
      var index = 0
      var championLabels = getters.getLabelsByChampId(championKey);
      for (var i = 0; i < championLabels.length; ++i) {
        if ((index = avalaible.findIndex(label => label.id == championLabels[i].id)) != undefined) {
          avalaible.splice(index, 1);
        }
      }
      return avalaible;
    },

    getAvailableLabelsFilter: (state, getters) => (usedLabels) => {
      var avalaible = state.labels.slice();
      var index = 0
      for (var i = 0; i < usedLabels.length; ++i) {
        if ((index = avalaible.findIndex(label => label.id == usedLabels[i].id)) != undefined) {
          avalaible.splice(index, 1);
        }
      }
      return avalaible;
    },
  }
})