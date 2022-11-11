<template>
    <div id="text" class="label" 
    :style="{'background-color':BGColor, color: TextColor}">
        {{Text}}
  </div>
</template>
  
  <script>
  export default {
    name: 'Label',
    props: {Text : String,  
        BGColor: String,
        TextColor: String},
    
    data: function () {
    return {
        counter: this.Text
    }
    },
    methods:{
    }
  }
  </script>
  
  <style scoped>
  .label {
    border-radius: 0.4em;
    text-align: center;
    font-weight: 700;
    display: inline;
    white-space: nowrap;  
    font-family: 'spiegel';
    padding: 0.12em 0.4em 0.14em;
     }
  </style>
  