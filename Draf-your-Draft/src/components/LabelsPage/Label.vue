<template>
    <div class="label" 
    :style="{'background-color':BGColor, color: TextColor}">
        {{Text}}
  </div>
  </template>
  
  <script>
  export default {
  props: ['Text','BGColor','TextColor'],
    name: 'Label',
  }
  </script>
  
  <style scoped>
  .label {
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 0.4em;
    padding: 0.12em 0.4em 0.14em;
    margin: 0 0.42em;
    text-align: center;
    font-size: 0.80em;
    font-weight: 700;
    line-height: 1;
    display: inline;
    white-space: nowrap;
    vertical-align: baseline;
    position: relative;
     }
  </style>
  