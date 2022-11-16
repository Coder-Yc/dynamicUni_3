import App from "./App";
import pakoRun  from './utils/pakoRun.js'
// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
    const app = createSSRApp(App);

    app.config.globalProperties.$pakoRun = pakoRun
    return {
         app,
    };
}
// #endif
