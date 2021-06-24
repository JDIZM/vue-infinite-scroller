<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 2 + Vite" />
  </div>
</template>
|<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      //
      title: "example",
    };
  },
};
</script>

<style lang="css" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
