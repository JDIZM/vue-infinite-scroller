<template>
  <div id="app">
    <div class="container">
      <h1>REDDIT INFINITE SCROLLER</h1>
      <div v-if="loading" class="loading">Loading data...</div>
      <div v-if="errorMsg" class="error">Error {{ errorMsg }}</div>
      
      <ListGroup v-if="results" :results="results" />
    </div>
  </div>
</template>
|
<script>
import ListGroup from "./components/ListGroup.vue";
export default {
  name: "App",
  components: {
    ListGroup
  },
  data() {
    return {
      //
      title: "example",
      results: null,
      access_token: '-9HJKQTBB6tDHDbR0p9N3feGyUDkU2g',
      loading: false,
      errorMsg: null
    };
  },
  mounted() {
    // get data with fetch api
    fetch("https://oauth.reddit.com//r/aww/hot", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "bearer " + this.access_token,
      },
    })
      // returns a promise containing the response object
      .then((response) => response.json())
      // This is just an HTTP response, not the actual JSON.
      // To extract the JSON body content from the response, we use the json() method
      // (defined on the Body mixin, which is implemented by both the
      // Request and Response objects.)
      .then((json) => {
        console.log(json)
        this.results = json.data
      })
      .catch((err) => this.errorMsg = err);
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
