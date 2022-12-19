<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    increment() {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    }
  },  

}
</script>

<style>
#app {
  font-family: 'beaufort';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin-top: 60px;
}
@font-face {
  font-family: "spiegel";
  src: local("spiegel"),
   url(./fonts/spiegel.ttf) format("truetype");
}
@font-face {
  font-family: "spiegel-bold";
  src: local("spiegel-bold"),
   url(./fonts/spiegel-bold.ttf) format("truetype");
}
</style>
