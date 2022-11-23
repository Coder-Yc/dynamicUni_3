"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_index_mitt = require("./mitt.js");
const templateCom = () => "../../components/template.js";
const _sfc_main = {
  components: {
    templateCom
  },
  setup() {
    let html = common_vendor.ref("undefind");
    let { proxy } = common_vendor.getCurrentInstance();
    let _this = proxy;
    const tychange = (typeofData) => {
      return typeof typeofData === "object" ? JSON.stringify(typeofData) : typeofData;
    };
    const parseTag = (tag) => {
      let res = {
        type1: "tag",
        name: "",
        voidElement: false,
        children: []
      };
      let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
      if (tagMatch) {
        res.type1 = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
          res.voidElement = true;
        }
      }
      let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);
      if (classList) {
        let style = "";
        for (let i = 0; i < classList.length; i++) {
          let c = classList[i].split("=");
          c[0] = c[0].replace(/\s*/g, "");
          var lengthc = 2;
          for (lengthc; lengthc < c.length; lengthc++) {
            c[1] += "=" + c[lengthc];
          }
          let p = c[1].substring(1, c[1].length - 1);
          try {
            p = JSON.parse(c[1].substring(1, c[1].length - 1));
          } catch (e) {
          }
          if (c[1]) {
            if (c[0] === " style") {
              style = p + style;
              res[c[0]] = style;
            } else {
              res[c[0]] = p;
            }
          }
        }
      }
      console.log(JSON.parse(JSON.stringify(res, null, 2)));
      return res;
    };
    const parse = (html2) => {
      var that = _this;
      let result = [];
      let current;
      let level = -1;
      let arr = [];
      let tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
      html2.replace(tagRE, function(tag, index) {
        let isOpen = tag.charAt(1) !== "/";
        let start = index + tag.length;
        let text = html2.slice(start, html2.indexOf("<", start));
        let parent;
        if (isOpen) {
          level++;
          current = that.parseTag(tag);
          if (!current.voidElement && text.trim()) {
            current["text"] = text;
          }
          if (level === 0) {
            result.push(current);
          }
          parent = arr[level - 1];
          if (parent) {
            parent.children.push(current);
          }
          arr[level] = current;
        }
        if (!isOpen || current.voidElement) {
          level--;
        }
      });
      return result;
    };
    common_vendor.onLoad(() => {
      let { pakoRun } = proxy.$pakoRun;
      let args = {
        code: `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`
      };
      if (args) {
        try {
          let onLoad = pakoRun(args, args.code);
          let method = onLoad();
          for (const key in method) {
            pages_index_mitt.bus.on(key, (message) => {
              method[key](message);
            });
            _this[key] = method[key];
          }
          _this.onLoad();
        } catch (err) {
          console.log(err);
        }
      }
    });
    return { tychange, parseTag, parse, html };
  }
};
if (!Array) {
  const _component_templateCom = common_vendor.resolveComponent("templateCom");
  _component_templateCom();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      data: $setup.html
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/yangchong/Desktop/dynamicUni_3/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
