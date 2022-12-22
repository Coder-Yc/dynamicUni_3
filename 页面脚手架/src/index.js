Page({
    data: {
        counter: 0,
        background: ["demo-text-1", "demo-text-2", "demo-text-3"],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
    },
    clickName: function () {
        console.log("-----------clickName点击了", this);
    },
    scrollClick: function () {
        console.log("-----------scrollClick点击了", this);
    },
    scroll(e) {
        console.log(e);
    },
});
