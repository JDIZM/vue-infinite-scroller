<template>
  <div class="list-group">
    <h2>/r/aww</h2>
    <List
      v-for="(item, i) in results"
      :key="i"
      :ref="results.length === i + 1 ? 'list--last' : null"
      :data="item.data"
      :class="results.length === i + 1 ? 'list--last' : null"
    />
  </div>
</template>

<script>
  import aww from "../assets/aww.jpeg";
  import List from "../components/List.vue";
  export default {
    name: "ListGroup",
    components: {
      List,
    },
    props: {
      results: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        aww,
        observer: null,
      };
    },
    updated() {
      // attach the oberver to the "new" last element in the array when updated
      this.observer.observe(this.$refs["list--last"][0].$el);
    },
    mounted() {
      // create the observer to watch the last element
      this.observer = new IntersectionObserver(this.onObserveCallback, {
        // root: this.$el, // watch viewport by setting root to null
        rootMargin: "0px",
        threshold: 1.0,
        // not supported on all browsers.
        // trackVisibility: true,
        // delay: 100
      });
      this.observer.observe(this.$refs["list--last"][0].$el);
    },
    methods: {
      onObserveCallback(entries) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          // isVisible not supported on all browsers.
          if (entry.isIntersecting) {
            // element is visible
            // stop watching the element, it's no longer the last item
            this.observer.unobserve(entry.target);
            this.$emit("onObserveLast");
          }
        });
      },
    },
  };
</script>

<style lang="css" scoped>
  .list-group {
    margin: auto;
  }
</style>
