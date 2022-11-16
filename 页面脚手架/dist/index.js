/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
function runCode() {
  var Page = function Page(page) {
    return page;
  };
  return Page({
    onLoad: function onLoad(options) {
      options = this.options;
      this.setdata({});
    },
    setdata: function setdata(dictData) {
      for (var i in dictData) {
        this.data[i] = dictData[i];
      }
      var a = function a($data) {
        'use strict';

        $data = $data || {};
        var $out = '',
          $line = [0, 0];
        try {
          $out += "<view  class='contain'>  <text  class='text' @tap='clickName' style='color: blue;'> test  </text> <view >  <text > 1231e2  </text>  </view>  </view> ";
        } catch (error) {
          throw {
            name: 'RuntimeError',
            path: null,
            message: error.message,
            line: $line[0] + 1,
            column: $line[1] + 1,
            source: "<view  class='contain'>  <text  class='text' @tap='clickName' style='color: blue;'> test  </text> <view >  <text > 1231e2  </text>  </view>  </view> ",
            stack: error.stack
          };
        }
        return $out;
      };
      var html = a(this.data);
      //console.log("------", html);
      this.html = this.parse(html);
      //console.log('----------------build', JSON.stringify(this.html, null, 2))
    },

    data: {
      counter: 0
    },
    clickName: function clickName() {
      console.log("-----------点击了");
    }
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map