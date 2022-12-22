const fs = require("fs");
const { exec, execSync } = require("child_process");
var inlineCss = require("inline-css");
const mineType = require("mime-types");
const path = require("path");
const { transformFun } = require("./utils/wrapFun");
var arguments = process.argv.splice(2);

// base图片转64
var base64img = function (file) {
    let filePath = path.resolve(file);
    let data = fs.readFileSync(path.resolve(filePath));
    data = new Buffer(data).toString("base64");
    return "data:" + mineType.lookup(filePath) + ";base64," + data;
};

// 运行转译过程
function AstRead(html, css, js, otherCss, darkCss) {
    // console.log(html);
    css = css ? css : ".page{}";
    // html = html.replaceAll(`"`, `'`);
    let options = {
        url: "index.css",
    };
    html = `<style>${css}</style>${html}`;
    html = html.replace(/input/g, `input1`);

    inlineCss(html, options).then(function (html) {
        html = html.replace(/<!--(.*?)-->/g, "");
        let htmlAst = parse(html);
        const change = (htmlAst, item = "", index = "") => {
            htmlAst.forEach((htmlNode) => {
                Object.keys(htmlNode).forEach((eKey) => {
                    item = htmlNode[" wx:for-item"] || item || "item";
                    index = htmlNode[" wx:for-index"] || index || "index";

                    if (htmlNode[eKey]) {
                        if (eKey === " class") {
                            let a = "";
                            let splitMatch = htmlNode[eKey].match(/'(.*?)'/g);
                            if (splitMatch) {
                                for (let dd of splitMatch) {
                                    let dz = dd.match(/'(.*?)'/)[1];
                                    if (dz) {
                                        for (let dd of otherCss) {
                                            if (Object.keys(dd)[0] === dz) {
                                                htmlNode[eKey] = htmlNode[
                                                    eKey
                                                ].replaceAll(
                                                    dz,
                                                    dd[Object.keys(dd)[0]]
                                                );
                                                htmlNode[" style"] +=
                                                    ";" +
                                                    htmlNode[eKey].replaceAll(
                                                        "{{",
                                                        ";{{"
                                                    );
                                            }
                                        }
                                    }
                                }
                            }

                            for (let dd of darkCss) {
                                if (htmlNode[eKey].match(Object.keys(dd)[0])) {
                                    a = dd[Object.keys(dd)[0]];
                                }
                            }

                            if (a) {
                                htmlNode[" style"] +=
                                    ";" +
                                    "{{dark === 'dark' ? '" +
                                    a +
                                    "' : ''}}";
                            }
                        } else if (eKey === " src") {
                            try {
                                let src1;

                                if (htmlNode[eKey].match(/\.\.\//)) {
                                    src1 = htmlNode[eKey].replace("../", "./");
                                } else {
                                    src1 = htmlNode[eKey].replace(
                                        "./",
                                        `./${arguments[0] || "src"}/`
                                    );
                                }
                                let img01 = base64img(src1);
                                img01 = img01.replace(/[\n]/g, "");
                                img01 = img01.replace(/\s+/g, "");
                                htmlNode[eKey] = img01;
                            } catch (e) {}
                        }
                    }
                });
                if (htmlNode.children.length > 0) {
                    change(htmlNode.children, item, index);
                }
            });
        };
        change(htmlAst);
        let newHtml = "";
        // 转回html
        const nodeReturn = (htmlNode) => {
            noInKey = [
                "type",
                "name",
                "voidElement",
                "text",
                "children",
                " wx:if",
                " wx:for",
                " wx:else",
                " wx:elif",
            ];
            return Object.keys(htmlNode).map((eKey) => {
                if (noInKey.includes(eKey)) {
                    return "";
                } else {
                    return `${eKey}="${htmlNode[eKey]}"`;
                }
            });
        };
        const parsehtml = (htmlAst) => {
            html = "";
            htmlAst.forEach((htmlNode, index) => {
                let forBoolean = false;
                let ifBoolean = false;
                if (htmlNode[" wx:if"]) {
                    htmlNode[" wx:if"] = htmlNode[" wx:if"].replaceAll(
                        "{{",
                        ""
                    );
                    htmlNode[" wx:if"] = htmlNode[" wx:if"].replaceAll(
                        "}}",
                        ""
                    );
                    html = html + `{{if ${htmlNode[" wx:if"]} }}`;
                    ifBoolean = true;
                } else if (htmlNode[" wx:elif"]) {
                    htmlNode[" wx:elif"] = htmlNode[" wx:elif"].replaceAll(
                        "{{",
                        ""
                    );
                    htmlNode[" wx:elif"] = htmlNode[" wx:elif"].replaceAll(
                        "}}",
                        ""
                    );
                    html = html + `{{else if ${htmlNode[" wx:elif"]} }}`;
                    ifBoolean = true;
                } else if (htmlNode[" wx:for"]) {
                    let item = htmlNode[" wx:for-item"] || "item";
                    let index = htmlNode[" wx:for-index"] || "index";
                    htmlNode[" wx:for"] = htmlNode[" wx:for"].replaceAll(
                        "{{",
                        ""
                    );
                    htmlNode[" wx:for"] = htmlNode[" wx:for"].replaceAll(
                        "}}",
                        ""
                    );
                    {
                        html =
                            html +
                            `{{each ${htmlNode[" wx:for"]} ${item} ${index}}}`;
                        forBoolean = true;
                    }
                }
                html =
                    html +
                    `<${htmlNode.type} ${nodeReturn(htmlNode).join("")}> ${
                        htmlNode.text || ""
                    } ${
                        htmlNode.children.length > 0
                            ? parsehtml(htmlNode.children)
                            : ""
                    } </${htmlNode.type}> `;
                if (htmlAst[index + 1] && htmlAst[index + 1][" wx:elif"]) {
                    html = html + `{{else if ${htmlNode[" wx:else"]} }}`;
                } else if (
                    (htmlAst[index + 1] && htmlAst[index + 1][" wx:else"]) ||
                    ifBoolean
                ) {
                    html = html + `{{/if}}`;
                } else if (forBoolean) {
                    html = html + `{{/each}}`;
                }
            });
            return html;
        };
        newHtml = parsehtml(htmlAst);
        newHtml = newHtml.replace(/input1/g, `input`);
        var template = require("art-template");
        // console.log(newHtml);
        var a = template.compile(newHtml);

        let str = "";

        str += js.toString();
        str = str.replace(/const/g, "var");
        str = str.replace(/let/g, "var");
        str = str.replace(/setData/g, "setdata");

        let onload = /onLoad:(.*)function(.*)\((.*?)\)(.*){/;
        let onloadJS = str.match(onload);
        if (!onloadJS) {
            onload = /(.*)onLoad(.*)\((.*?)\)(.*){/;
            onloadJS = str.match(onload);
        }
        if (onloadJS) {
            str = str.replace(
                onloadJS[0],
                onloadJS[0] +
                    "options = this.options; this.data.dark =wx.getSystemInfoSync().theme; wx.onThemeChange(e => {console.log(e.theme);this.setdata({dark: e.theme})}); this.setdata();"
            );
        }

        str = str.replace(
            "Page({",
            `  
    function runCode(){
        var Page = function(page){
          return page
        }
        return Page({
  ${
      onloadJS
          ? ""
          : `
  onLoad: function (options) {
    options = this.options;
    this.setdata({})
  },
  `
  }
 
      

setdata: function setdata(dictData) {
  
  for(var i in dictData){
    this.data[i] = dictData[i]
  }
  const a = ${a};


  var html = a(this.data);
  //console.log("------", html);
  this.html = this.parse(html)
  //console.log('----------------build', JSON.stringify(this.html, null, 2))
},
  `
        );
        str = str.replace(/\\n/g, "");
        str = str.replace(/\\"/g, "'");
        str += `
}
  window.exports = runCode;
  `;
        // console.log(str);
        fs.writeFile("./dist/index.js", str, (err) => {
            if (err) throw err;

            // execSync("npm run pack");
            // console.log(err);
        });
    });
}

let SPECIAL_PROPERTIES = [
    "bindtap",
    "bindscroll",
    "bindscrolltoupper",
    "bindscrolltolower",
    "autoplay",
    "interval",
    "duration",
    "indicator-dots ",
    "wx:for",
    "wx:if",
];

function parseTag(tag) {
    let res = {
        type: "tag",
        name: "",
        voidElement: false,
        children: [],
    };
    let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
    if (tagMatch) {
        // 标签名称为正则匹配的第2项
        res.type = tagMatch[1];
        if (tag.charAt(tag.length - 2) === "/") {
            // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
            res.voidElement = true;
        }
    }
    // 匹配所有的标签正则
    let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);

    if (classList) {
        let style = "";
        // console.log(classList);
        for (let i = 0; i < classList.length; i++) {
            // 去空格再以= 分隔字符串  得到['属性名称','属性值']
            let c = classList[i].split("=");
            c[0] = c[0].replace(/\\s*/g, "");
            // 循环设置属性
            var lengthc = 2;
            for (lengthc; lengthc < c.length; lengthc++) {
                c[1] += "=" + c[lengthc];
            }
            let p = c[1].substring(1, c[1].length - 1);

            if (c[1]) {
                if (c[0] === "style") {
                    style = p + style;
                    res[c[0]] = style;
                } else {
                    res[c[0]] = p;
                }
                let test = c[0];
                if (SPECIAL_PROPERTIES.includes(test.replace(" ", ""))) {
                    let name = transformFun(test);
                    //删除原本的key
                    delete res[c[0]];

                    let match_res = c[1].match(/\{\{(.+?)\}\}/);
                    let FORIF = ["wx:for", "wx:if"];
                    if (!match_res) {
                        res[` ${name}`] = c[1]
                            .replace('"', "")
                            .replace('"', "");
                    } else if (FORIF.includes(c[0])) {
                        console.log("!!!!!!!!!!!!!!");
                    } else {
                        res[` ${name}`] = match_res[0]
                            .slice(2, -2)
                            .replace('"', "")
                            .replace('"', "");
                    }
                }
                console.log("@@@@@@@@@@@@@", res);
            }
        }
    }

    if (tag.match(/wx:else/)) {
        res["wx:else"] = "";
    }
    // console.log(JSON.parse(JSON.stringify(res, null, 2)));
    return res;
}

function parse(html) {
    let result = [];
    let current;
    let level = -1;
    let arr = [];
    let tagRE = /<[a-zA-Z\\-\\!\\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
    html.replace(tagRE, function (tag, index) {
        // 判断第二个字符是不是'/'来判断是否open
        let isOpen = tag.charAt(1) !== "/";
        // 获取标签末尾的索引
        let start = index + tag.length;
        // 标签之前的文本信息
        let text = html.slice(start, html.indexOf("<", start));

        let parent;
        if (isOpen) {
            level++;
            // 设置标签属性
            current = parseTag(tag);
            // 判断是否为文本信息，是就push一个text children  不等于'  '
            if (!current.voidElement && text.trim()) {
                current["text"] = text;
            }
            // 如果我们是根用户，则推送新的基本节点
            if (level === 0) {
                result.push(current);
            }
            // 判断有没有上层，有就push当前标签
            parent = arr[level - 1];
            if (parent) {
                parent.children.push(current);
            }
            // console.log(current)
            arr[level] = current;
        }
        // 如果不是开标签，或者是空元素：</div><img>
        if (!isOpen || current.voidElement) {
            // level--
            level--;
        }
    });
    // console.log(JSON.stringify(result, null, 2));
    return result;
}

fs.readFile(`${arguments[0] || "src"}/index.js`, (err, js) => {
    //第一步，读src/index.js
    if (err) {
        //报错
        console.log(err);
    } else {
        js = js.toString();
        fs.readFile(`${arguments[0] || "src"}/index.wxml`, (err, html) => {
            html = html.toString();
            if (err) {
                //报错
                console.log(err);
            } else {
                fs.readFile(
                    `${arguments[0] || "src"}/index.css`,
                    (err, css) => {
                        css = css.toString();
                        css1 = css.replace(/[\n\r]/g, "");

                        let darkCss = css1.match(/dark\s*\)\s*{(.*?)}\s*}/g);
                        darkCss = darkCss
                            ? darkCss[0].match(/\.(.*?)(.*?){(.*?)}/g)
                            : darkCss;
                        var regexp = /\.(.*?)(.*?){(.*?)}/g;
                        allcss = css1.match(regexp);
                        let otherCss = new Set();

                        for (i in allcss) {
                            var regexp = /\.(.*?)(.*?){(.*?)}/;
                            let p = allcss[i].match(regexp);
                            otherCss.add({
                                [p[2].split(/\s+/)[0]]: p[3],
                            });
                        }

                        let darks = new Set();
                        for (i in darkCss) {
                            var regexp = /\.(.*?)(.*?){(.*?)}/;
                            let p = darkCss[i].match(regexp);
                            darks.add({
                                [p[2].split(/\s+/)[0]]: p[3],
                            });
                        }
                        if (err) {
                            //报错
                            console.log(err);
                        } else {
                            let tagRE = /<[^>]*>/g;

                            // parser.parseComplete(html);
                            let html3 = html.match(tagRE);
                            for (i in html3) {
                                let a = html3[i].match(/\s*(.*?)\s*\/>/);
                                if (a) {
                                    b = html3[i].replace("\\>", ">");
                                    a[1] = a[1].replace("<", "");
                                    html = html.replace(
                                        html3[i],
                                        b + "</" + a[1] + ">"
                                    );
                                }
                            }

                            AstRead(html, css, js, otherCss, darks);
                        }
                    }
                );
            }
        });
    }
});
