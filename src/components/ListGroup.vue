<template>
  <div class="list">
    <h2>/r/aww</h2>
    <List v-for="(item, i) in results.children" :key="i" :data="item.data" @onShowContent="onShowContent"/>
  </div>
</template>

<script>
import aww from "../assets/aww.jpeg";
import List from '../components/List.vue'
export default {
  name: "ListGroup",
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  components: {
    List
  },
  data() {
    return {
      aww,
    };
  },
  mounted() {
    //
  },
  computed: {
    // 
  },
  methods: {
    onShowContent(boolean) {
      // 
      boolean = !boolean
      console.log(boolean)
    }
  }
};
</script>

<style lang="css" scoped>
.list {
  margin: auto;
}

</style>
