let transformFun = function (fn) {
    // console.log("111111111111111111", fn);
    switch (fn.trim()) {
        case "bindtap":
            return "@tap";
        case "bindscroll":
            return "@scroll";
        case "bindscrolltoupper":
            return "@scrolltoupper";
        case "bindscrolltolower":
            return "@scrolltolower";
        case "autoplay":
            return "autoplay";
        case "interval":
            return "interval";
        case "duration":
            return "duration";
        case "indicator-dots":
            return "indicator-dots";
        default:
            break;
    }
};

module.exports = {
    transformFun,
};
