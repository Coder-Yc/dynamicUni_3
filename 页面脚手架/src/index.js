Page({
    data: {
        counter: 0,
    },
    clickName: function () {
        console.log("-----------clickName点击了");
    },
    scrollClick: function () {
        console.log("-----------scrollClick点击了", this.data.counter);
    },
    scroll(e) {
        console.log(e);
    },
});
