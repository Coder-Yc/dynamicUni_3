"use strict";
var common_vendor = require("../common/vendor.js");
const templateCom = () => Promise.resolve().then(function() {
  return L1VzZXJzL3lhbmdjaG9uZy9EZXNrdG9wL2R5bmFtaWNVbmlfMy9jb21wb25lbnRzL3RlbXBsYXRlLnZ1ZQ;
});
const _sfc_main = {
  name: "templateCom",
  components: { templateCom },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup() {
    return {};
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
        i: common_vendor.o(item["@tap"])
      }) : item["type1"] === "view" ? common_vendor.e({
        k: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        l: "64fd18e1-1-" + i0,
        m: common_vendor.p({
          data: item["children"]
        })
      } : {}, {
        n: item["id"],
        o: common_vendor.n(item["class"]),
        p: common_vendor.s(item["style"]),
        q: common_vendor.o(item["@tap"])
      }) : {}, {
        j: item["type1"] === "view",
        r: item
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangchong/Desktop/dynamicUni_3/components/template.vue"]]);
wx.createComponent(Component);
var L1VzZXJzL3lhbmdjaG9uZy9EZXNrdG9wL2R5bmFtaWNVbmlfMy9jb21wb25lbnRzL3RlbXBsYXRlLnZ1ZQ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
