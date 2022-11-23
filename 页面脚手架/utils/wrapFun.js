let transformFun = function (fn) {
    console.log("111111111111111111", fn);
    switch (fn.trim()) {
        case "bindtap":
            return "@tap";
        case "bindscroll":
            return "@scroll";
        case "bindscrolltoupper":
            return "@scrolltoupper";
        case "bindscrolltolower":
            return "@scrolltolower";
        default:
            break;
    }
};

module.exports = {
    transformFun,
};
