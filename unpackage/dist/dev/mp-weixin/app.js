"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_pakoRun = require("./utils/pakoRun.js");
require("./utils/pako.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/yangchong/Desktop/\u9879\u76EE/dynamicUni_3/App.vue"]]);
const templateCom = () => "./components/template.js";
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.component("templateCom", templateCom);
  app.config.globalProperties.$pakoRun = utils_pakoRun.pakoRun;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
