// import vue from "@vitejs/plugin-vue";
// vite.config.js
const { createVuePlugin } = require("vite-plugin-vue2");
// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })
module.exports = {
  plugins: [createVuePlugin(/*options*/)],
};
