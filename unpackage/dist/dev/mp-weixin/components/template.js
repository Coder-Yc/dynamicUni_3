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
    dataInfo: {
      type: Object,
      default() {
        return {};
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
    let indicatorDots = "indicator-dots";
    let mini_Data = common_vendor.toRaw(props.dataInfo);
    console.log("==========", mini_Data);
    const clickName = (e, name) => {
      pages_index_mitt.bus.emit(name, e);
    };
    return { clickName, scrollY, scrollX, indicatorDots, mini_Data };
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
        d: "1371f35b-0-" + i0,
        e: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
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
        n: "1371f35b-1-" + i0,
        o: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}, {
        p: item["id"],
        q: common_vendor.n(item["class"]),
        r: common_vendor.s(item["style"]),
        s: common_vendor.o(($event) => $setup.clickName(item["@tap"]))
      }) : item["type1"] === "scroll-view" ? common_vendor.e({
        v: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        w: "1371f35b-2-" + i0,
        x: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}, {
        y: item["id"],
        z: common_vendor.n(item["class"]),
        A: common_vendor.s(item["style"]),
        B: common_vendor.o(($event) => $setup.clickName(void 0, item["@tap"])),
        C: common_vendor.o(($event) => $setup.clickName($event, item["@scrolltoupper"])),
        D: common_vendor.o(($event) => $setup.clickName($event, item["@scrolltolower"])),
        E: common_vendor.o(($event) => $setup.clickName($event, item["@scroll"]))
      }) : item["type1"] === "swiper" ? common_vendor.e({
        G: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        H: common_vendor.f(item["children"], (item2, index2, i1) => {
          return {
            a: "1371f35b-3-" + i0 + "-" + i1,
            b: common_vendor.p({
              data: item2["children"],
              dataInfo: $props.dataInfo
            })
          };
        })
      } : {}, {
        I: item["id"],
        J: common_vendor.n(item["class"]),
        K: common_vendor.s(item["style"]),
        L: $setup.mini_Data["autoplay"],
        M: $setup.mini_Data["interval"],
        N: $setup.mini_Data["duration"],
        O: $setup.mini_Data["indicatorDots"]
      }) : item["type1"] === "swiper-item" ? common_vendor.e({
        Q: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        R: "1371f35b-4-" + i0,
        S: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}, {
        T: item["id"],
        U: common_vendor.n(item["class"]),
        V: common_vendor.s(item["style"])
      }) : item["type1"] === "icon" ? common_vendor.e({
        X: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        Y: "1371f35b-5-" + i0,
        Z: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}, {
        aa: item["id"],
        ab: item["type"],
        ac: item["size"],
        ad: common_vendor.n(item["class"]),
        ae: common_vendor.s(item["style"])
      }) : item["type1"] === "button" ? common_vendor.e({
        ag: common_vendor.t(item["text"]),
        ah: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        ai: "1371f35b-6-" + i0,
        aj: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}, {
        ak: item["id"],
        al: item["type"],
        am: item["size"],
        an: common_vendor.n(item["class"]),
        ao: common_vendor.s(item["style"])
      }) : item["type1"] === "input" ? common_vendor.e({
        aq: item["id"],
        ar: item["type"],
        as: common_vendor.n(item["class"]),
        at: common_vendor.s(item["style"]),
        av: item["placeholder"],
        aw: item["password"],
        ax: item["children"].length !== 0
      }, item["children"].length !== 0 ? {
        ay: "1371f35b-7-" + i0,
        az: common_vendor.p({
          data: item["children"],
          dataInfo: $props.dataInfo
        })
      } : {}) : {}, {
        j: item["type1"] === "view",
        t: item["type1"] === "scroll-view",
        F: item["type1"] === "swiper",
        P: item["type1"] === "swiper-item",
        W: item["type1"] === "icon",
        af: item["type1"] === "button",
        ap: item["type1"] === "input",
        aA: item
      });
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangchong/Desktop/\u9879\u76EE/dynamicUni_3/components/template.vue"]]);
wx.createComponent(Component);
