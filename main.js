import App from "./App";
import pakoRun  from './utils/pakoRun.js'
import templateCom from './components/template.vue'
// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
    const app = createSSRApp(App);
    app.component('templateCom', templateCom)
    app.config.globalProperties.$pakoRun = pakoRun
    return {
         app,
    };
}
// #endif
