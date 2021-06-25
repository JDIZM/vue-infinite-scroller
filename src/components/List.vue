<template>
  <ul
    v-if="data"
    class="list__ul"
  >
    <!-- post_hint == link -->
    <li class="list__ul__item list__ul__item--thumb">
      <img
        v-if="data.thumbnail === 'default'"
        :src="aww"
        :alt="data.title"
        height="60px"
        width="60px"
        loading="lazy"
      >
      <img
        v-else
        :src="data.thumbnail"
        :alt="data.title"
        height="50px"
        width="60px"
        loading="lazy"
      >
    </li>
    <li class="list__ul__item">
      <a
        :href="'https://reddit.com/' + data.permalink"
        target="_blank"
        rel="noreferrer"
      >{{ data.title }}</a>
    </li>
    <li class="list__ul__item">
      {{ data.ups }} upvotes in {{ data.subreddit_name_prefixed }}
    </li>
    <li class="list__ul__item">
      posted {{ convertTimestamp }}
    </li>
    <button
      v-if="data.post_hint"
      @click="open = !open"
    >
      show more
    </button>
    <li v-if="data.post_hint == 'link' && open">
      <a :href="data.url">{{ data.url }}</a>
    </li>
    <li v-if="data.post_hint === 'image' && open">
      <img
        :src="data.url"
        :alt="data.title"
        width="400px"
        height="400px"
        loading="lazy"
      >
    </li>
    <li v-if="data.post_hint === 'hosted:video' && open">
      <video
        :src="data.media.reddit_video.fallback_url"
        type="video/mp4"
        controls
        muted
      />
    </li>
  </ul>
</template>

<script>
import aww from "../assets/aww.jpeg";
import moment from "moment";
export default {
  name: "List",
  props: {
    data: {
      type: Object,
      required: true,
    },
    // open: {
    //   type: Boolean,
    //   required: false,
    //   default: () => false
    // }
  },
  data() {
    return {
      aww,
      timestamp: null,
      timeAgo: null,
      open: false,
    };
  },
  computed: {
    convertTimestamp() {
      return moment(this.timestamp * 1000).fromNow();
    },
  },
  created() {
    this.timestamp = this.data.created_utc;
    this.timeAgo = moment(this.timestamp * 1000).fromNow();
  },
  methods: {
    showContent() {
      //
      this.$emit("onShowContent", this.open);
    },
  },
};
</script>

<style lang="css" scoped>
video {
  width: 100%;
  min-height: 300px;
  max-width: 600px;
}

img {
  width: 100%;
  max-width: 600px;
}

.list__ul {
  list-style-type: none;
  padding: 1rem 0;
  margin: 1.5rem;
  background: rgb(243, 243, 243);
  border-radius: 0.5rem;
}

.list__ul__item {
  padding: 0;
}

.list__ul__item--thumb > img {
  width: 60px;
  height: 60px;
}

button {
  margin: 1rem 0 0 0;
  background: lightgray;
  cursor: pointer;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 0.25rem;
}
</style>