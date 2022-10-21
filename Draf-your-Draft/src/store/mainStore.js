import Vue from 'vue'
import Vuex from 'vuex'
import champData from '../assets/champion.json'

Vue.use(Vuex)
// Create a new store instance.
export default new Vuex.Store({
    state: {
      labels : [
        {id: 0, text: "prends un redbull"},
        {id: 1, text: "prends une bite"},
      ],
      championsLabels : [
        {championKey: 266, idLabel: 0},
        {championKey: 103, idLabel: 1},
        {championKey: 84, idLabel: 1},
        {championKey: 84, idLabel: 0}
      ],
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        deleteChampionLabelById (state, championLabel)  {
          for(let i = 0; i < state.championsLabels.length; ++i){
            if(state.championsLabels[i].championKey == championLabel.championKey &&
              state.championsLabels[i].idLabel == championLabel.idLabel){
                state.championsLabels.splice(i, 1);
                return true;
              }
          }
          return false;
        },
        getLastLabelId(){
          return state.labels[labels.length];
        },

        addChampionLabelById (state, championLabel) {
          var newLabelId = getLastLabelId()
          var label = {"id" : newLabelId, "text": championLabel.text}; 
          state.labels.push(label)

          var newChampionLabel = {"championKey": championLabel.championKey, "idLabel": newLabelId}
          state.championsLabels.push(newChampionLabel);
        },
        addChampionLabel (state, championLabel)  {
          state.championsLabels.push(championLabel);
        }

    },
    getters:{

      getLabelsByChampId: (state, getters) => (keyChampion) => {
        var labels = [];
        for(let i = 0; i< state.championsLabels.length; i++){
          if(state.championsLabels[i].championKey == keyChampion){
            labels.push(getters.getLabelById(state.championsLabels[i].idLabel))
          }
        }
        return labels;
      },
    
      getChampionById: (state) => (keyChampion) => {
        for(let i = 0; i < state.champions.length ;i++){
          console.log("looking for keyCHampion : "+ keyChampion +" in store")
           if(state.champions[i].key == keyChampion) {
             console.log(state.champions[i].id);
             return state.champions[i];
           }
         };
       },
    getLabels: state => {
        return state.labels;
    },
    getLabelById: (state) => (idLabel) => {
     for(let i = 0; i < state.labels.length;i++){
       console.log("looking for idLabel : "+ idLabel +" in store")
        if(state.labels[i].id == idLabel) {
          console.log(state.labels[i].text);
          return state.labels[i];
        }
      };
    },
    getAvailableLabels: (state, getters) => (championKey) => {
      var avalaible = state.labels.slice();
      var index = 0
      var championLabels = getters.getLabelsByChampId(championKey);
      for(var i = 0; i < championLabels.length; ++i){
        if( (index = avalaible.findIndex(label => label.id == championLabels[i].id) ) != undefined){
          avalaible.splice(index, 1);
        }
      }
        return avalaible;
    }
    
    }
})


//store example
/*
state: {
    films : [
      {id:1, title: 'HELLRAISER', img:'https://image.posterlounge.fr/images/big/1877175.jpg'},
      {id:2,title: 'DORA LEXPLORATRICE', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDm24T4-YR4qddOzadUBKhJfnJA5oKCwezATmI1LFTMqGUoNI5'},
      {id:3,title: 'BOB LE BRICOLEUR', img:'https://images-na.ssl-images-amazon.com/images/I/51NezhpJXpL._SX384_BO1,204,203,200_.jpg'},
      {id:4,title: 'TINTIN', img:'https://images-na.ssl-images-amazon.com/images/I/61mxp5eeQ0L._SX352_BO1,204,203,200_.jpg'},
      {id:5,title: 'TRANSFORMERS', img:'https://fr.web.img6.acsta.net/c_310_420/medias/nmedia/18/62/81/09/18784915.jpg'},
      {id:6,title: 'TITANIC', img:'https://fr.web.img2.acsta.net/pictures/19/10/25/11/18/5224976.jpg'},
      {id:7,title: 'AVATAR', img:'https://fr.web.img6.acsta.net/medias/nmedia/18/78/95/70/19485155.jpg'},
      {id:8,title: 'MOONFALL', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpnox8ng2wvjLZsbNRAWQOTWV3tPkOkLyG8IBEw-g7yuH4ITOm'},
      {id:9,title: 'MISSION IMPOSSIBLE', img:'https://m.media-amazon.com/images/I/71fE+sq+IYL._AC_SL1200_.jpg'},
      {id:10,title: 'ZOOTOPIA', img:'https://images-na.ssl-images-amazon.com/images/I/91ULSqJF6KL.jpg'},
      {id:11,title: 'RASPOUTINE', img:'https://fr.web.img3.acsta.net/medias/nmedia/18/95/77/09/20427132.jpg'},
      {id:12,title: 'MARIO', img:'https://fr.web.img6.acsta.net/pictures/21/09/27/12/58/1856273.jpg'},
    ],
    activeTheme : "light-theme"
  },
  
  mutations: {
    setTheme(state, value){
      state.activeTheme = value;
    }
  },
  getters:{
    getFilms: state => {
        return state.films;
    },
    getFilmById: (state) => (idFilm) => {
     for(let i = 0; i < state.films.length;i++){
       console.log("looking for idFilm : "+ idFilm +" in store")
        if(state.films[i].id == idFilm) {
          console.log(state.films[i].title);
          return state.films[i];
        }
      };
    },
    getTheme: state => {
      return state.activeTheme;
    }
  }*/
