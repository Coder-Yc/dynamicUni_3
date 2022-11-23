"use strict";
var common_vendor = require("../common/vendor.js");
var pages_index_mitt = require("../pages/index/mitt.js");
const _sfc_main = {
  name: "templateCom",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    method: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    let scrollY = "scroll-y";
    let scrollX = "scroll-x";
    const clickName = (name) => {
      pages_index_mitt.bus.emit(name);
    };
    return { clickName, scrollY, scrollX };
  }
};
if (!Array) {
  const _component_templateCom = common_vendor.resolveComponent("templateCom");
  _component_templateCom();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.data, (item, index, i0) => {
      return common_vendor.e({
        a: item["type1"] === "text"
      }, item["type1"] === "text" ? common_vendor.e({
        b: common_vendor.t(item["text"]),
        c: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        d: "64fd18e1-0-" + i0,
        e: common_vendor.p({
          data: item["children"]
        })
      } : {}, {
        f: item["id"],
        g: common_vendor.n(item["class"]),
        h: common_vendor.s(item["style"]),
        i: common_vendor.o(($event) => $setup.clickName(item["@tap"]))
      }) : item["type1"] === "view" ? common_vendor.e({
        k: item["text"]
      }, item["text"] ? {
        l: common_vendor.t(item["text"])
      } : {}, {
        m: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        n: "64fd18e1-1-" + i0,
        o: common_vendor.p({
          data: item["children"]
        })
      } : {}, {
        p: item["id"],
        q: common_vendor.n(item["class"]),
        r: common_vendor.s(item["style"]),
        s: common_vendor.o(($event) => $setup.clickName(item["@tap"]))
      }) : item["type1"] === "scroll-view" ? common_vendor.e({
        v: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        w: "64fd18e1-2-" + i0,
        x: common_vendor.p({
          data: item["children"]
        })
      } : {}, {
        y: item["id"],
        z: common_vendor.n(item["class"]),
        A: common_vendor.s(item["style"]),
        B: common_vendor.o(($event) => $setup.clickName(item["@tap"])),
        C: common_vendor.o(($event) => $setup.clickName(item["@scrolltoupper"])),
        D: common_vendor.o(($event) => $setup.clickName(item["@scrolltolower"])),
        E: common_vendor.o(($event) => $setup.clickName(item["@scroll"]))
      }) : {}, {
        j: item["type1"] === "view",
        t: item["type1"] === "scroll-view",
        F: item
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangchong/Desktop/dynamicUni_3/components/template.vue"]]);
wx.createComponent(Component);
