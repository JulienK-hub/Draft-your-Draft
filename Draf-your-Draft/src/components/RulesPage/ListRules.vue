<template>
<div>
    <div class="linearTransition"/>
    <div class="listRules">
      <h2>LISTE DES RÈGLES</h2>
      
      <div class="list" v-for="rule in allRules" :key="rule.id">
        <button v-on:click="deleteRule(rule.id)" class="delete-button">
          x
        </button>
        <div  @click="displayRuleEvent(rule)">
        <Label  class="labelMargin"
        v-bind:Text="rule.id"
        v-bind:BGColor="rule.ruleSide === 'Both' ? 'grey' : rule.ruleSide.toLowerCase()"
        v-bind:TextColor="'white'"
      /></div>
    </div>
    </div>
</div>
</template>
<script>
import Label from '../LabelsPage/Label.vue'
export default {
  name: "ListRules",
  data() {
    return {
      allRules: this.$store.state.rules,
    };
  },
  methods: {
    deleteRule(id){  
      this.$store.commit("deleteRule", id);
    },

    displayRuleEvent(rule){
    this.$emit('clicked', rule);
}
  },
  computed: {
        
    },
  components: {
    Label
  }
};
</script>

<style scoped>
.delete-button {
    color: black;
    border-radius: 50%;
  }
  .delete-button:hover {
    background-color: gray; /* Green */
    color: black;
  }
.listRules{
    position: left;
    background: url(../../assets/motifCubesV1.png);
    background-size: 100%;
    margin-bottom: 80px;
    min-height: 200px;
  }
  .listRules:hover{
    background-color: rgb(255, 255, 255,0.5);
      background-blend-mode: lighten;
  }
  .linearTransition{
    margin-top: 50px;
    height: 100px;
    background: url(../../assets/epee2.png);
    background-size: 50%;
    position: top;
    background-repeat: repeat-x;
  }
  .list {
    cursor: pointer;
    display: inline-flex;
    margin-left: 50px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }
</style>