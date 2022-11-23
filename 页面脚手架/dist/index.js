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
          $out += "<view  class='contain'>  <text  class='text' @tap='clickName' style='color: blue;'> test  </text> <scroll-view  scroll-y='true' class='scroll-Y' @tap='scrollClick' @scroll='scroll' style='height: 300rpx;'>  <view  id='demo1' class='scroll-view-item uni-bg-red' style='background-color: red; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> A  </view> <view  id='demo2' class='scroll-view-item uni-bg-green' style='background-color: blue; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> B  </view> <view  id='demo3' class='scroll-view-item uni-bg-blue' style='background-color: pink; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> C  </view>  </scroll-view>  </view> ";
        } catch (error) {
          throw {
            name: 'RuntimeError',
            path: null,
            message: error.message,
            line: $line[0] + 1,
            column: $line[1] + 1,
            source: "<view  class='contain'>  <text  class='text' @tap='clickName' style='color: blue;'> test  </text> <scroll-view  scroll-y='true' class='scroll-Y' @tap='scrollClick' @scroll='scroll' style='height: 300rpx;'>  <view  id='demo1' class='scroll-view-item uni-bg-red' style='background-color: red; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> A  </view> <view  id='demo2' class='scroll-view-item uni-bg-green' style='background-color: blue; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> B  </view> <view  id='demo3' class='scroll-view-item uni-bg-blue' style='background-color: pink; font-size: 36rpx; height: 300rpx; line-height: 300rpx; text-align: center;'> C  </view>  </scroll-view>  </view> ",
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
      console.log("-----------clickName点击了");
    },
    scrollClick: function scrollClick() {
      console.log("-----------scrollClick点击了", this.data.counter);
    },
    scroll: function scroll(e) {
      console.log(e);
    }
  });
}
module.exports = runCode;
/******/ })()
;
//# sourceMappingURL=index.js.map