<template>
  <div id="app">
    <div class="container">
      <h1>REDDIT INFINITE SCROLLER</h1>
      <div
        v-if="loading"
        class="loading"
      >
        Loading data...
      </div>
      <div
        v-if="errorMsg"
        class="error"
      >
        Error {{ errorMsg }}
      </div>
      <div>
        <label for="option-select">Show me: </label>
        <select
          id="option-select"
          name="option-select"
          @change="optionSelect"
        >
          <option
            v-for="(o, i) in options"
            :key="i"
            :value="o"
          >
            {{ o }}
          </option>
        </select>
      </div>
      <ListGroup
        v-if="listResults"
        :results="listResults"
        @onObserveLast="getNextResults(after)"
      />
    </div>
  </div>
</template>
|
<script>
import ListGroup from "./components/ListGroup.vue";
export default {
  name: "App",
  components: {
    ListGroup,
  },
  data() {
    return {
      loading: false,
      errorMsg: null,
      username: import.meta.env.VITE_CLIENT_ID,
      password: "",
      firstResults: null,
      after: null,
      nextResults: [],
      listResults: null,
      access_token: "",
      expires_in: 0,
      option: "hot",
      options: ["hot", "new", "rising", "top"],
    };
  },
  mounted() {
    if (this.access_token === "") {
      // get an access token
      this.getToken();
      // reload the page and refresh token when it expires.
      setTimeout(() => {
        console.log("1 hour reloading page..");
        location.reload();
      }, 3600000);
    }
  },
  methods: {
    optionSelect(e) {
      console.log(e.target.value);
      this.option = e.target.value;
      this.getResults();
    },
    async getToken() {
      this.loading = true;
      await fetch("https://www.reddit.com/api/v1/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + window.btoa(this.username + ":" + this.password),
        },
        body: new URLSearchParams({
          // installed app method, uses no password and doesn't expose the secret key
          grant_type: "https://oauth.reddit.com/grants/installed_client",
          device_id: "DO_NOT_TRACK_THIS_DEVICE",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          // token expires_in 3600 seconds // 1 hour
          this.access_token = json.access_token;
          this.expires_in = json.expires_in;
          this.getResults();
        })
        .catch((err) => console.log(err));
    },
    async getResults() {
      await fetch("https://oauth.reddit.com//r/aww/" + this.option, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "bearer " + this.access_token,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.firstResults = json.data;
          // map only the children to new array so we can manipulate data
          this.listResults = json.data.children.map((item) => item);
          this.after = json.data.after;
          this.loading = false;
        })
        .catch((err) => (this.errorMsg = err));
    },
    async getNextResults(after) {
      if (!after) {
        return null;
      } else {
        // fetch the next 25 results with the after token
        const query = "?after=" + after;
        await fetch("https://oauth.reddit.com//r/aww/" + this.option + query, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "bearer " + this.access_token,
          },
        })
          .then((response) => response.json())
          .then((json) => {
            this.nextResults = json.data;
            this.after = json.data.after;
            this.listResults.push(...json.data.children);
          })
          .catch((err) => (this.errorMsg = err));
      }
    },
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

.container {
  padding: 0.5rem;
  max-width: 770px;
  margin: auto;
}

#option-select {
  padding: 0.5rem;
}
</style>
