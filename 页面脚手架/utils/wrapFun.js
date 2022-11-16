let transformFun = function (fn) {
    console.log("111111111111111111", fn);
    switch (fn.trim()) {
        case "bindtap":
            return "@tap";
        default:
            break;
    }
};

module.exports = {
    transformFun,
};
