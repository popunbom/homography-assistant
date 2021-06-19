import Vue from "vue"
import App from "./App.vue"

import VueKonva from "vue-konva"

import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import plaintext from "highlight.js/lib/languages/plaintext"
import vuePlugin from "@highlightjs/vue-plugin"

hljs.registerLanguage("json", json)
hljs.registerLanguage("plaintext", plaintext)

Vue.use(VueKonva)
Vue.use(vuePlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount("#app")
