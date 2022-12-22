
    <template>
        <templateCom :data="html" :dataInfo="dataInfo"></templateCom>
    </template>

    <script>
    import { onLoad, onReady } from "@dcloudio/uni-app";
    import { ref, getCurrentInstance } from "vue";
    import templateCom from "../../components/template.vue";
	import bus from "./mitt.js"
    export default {
        components: {
            templateCom,
        },
        setup() {
            let html = ref([]);
            let dataInfo = ref({});
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
							bus.on(key, (message) => {
								method[key](message)
								// console.log(2, (_this.data))
							
							});
                            _this[key] = method[key];
                        }
                        dataInfo.value = method["data"];
                        _this.onLoad();
                        // console.log(this);
                    } catch (err) {
                        console.log(err);
                    }
                }
            });
            return { tychange, parseTag, parse, html,dataInfo };
        },
    };
    </script>

    <style lang="scss" scoped></style>
    