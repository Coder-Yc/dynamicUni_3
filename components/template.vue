<template >
    <block v-for="(item, index) of data" :key="item">
        <text
            v-if="item['type1'] === 'text'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="item['@tap']"
        >
            {{ item["text"] }}
            <template v-if="item['children'].length !== 0">
                <templateCom :data="item['children']"></templateCom>
            </template>
        </text>
        <view
            v-else-if="item['type1'] === 'view'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="item['@tap']"
        >
            <text v-if="item['text']">{{ item["text"] }}</text>
            <template v-if="item['children'].length !== 0">
                <templateCom :data="item['children']"></templateCom>
            </template>
        </view>

        <scroll-view
            v-else-if="item['type1'] === 'scroll-view'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            scroll-y="true"
        >
            <template v-if="item['children'].length !== 0">
                <templateCom :data="item['children']"></templateCom>
            </template>
        </scroll-view>
    </block>
</template>

<script>

export default {
    name: "templateCom",
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    setup() {
        // let { proxy } = getCurrentInstance();
        // let _this = proxy
        // let arr = ['data', 'onLoad','setdata']
        // onMounted(() => {
        // 	let dataM = props.methods
        // 	if(dataM.dataM){
        // 		let methods = dataM.dataM
        // 		for(let i in methods) {
        // 			console.log(i)
        // 			if(!arr.includes(i)) {
        // 				_this[i] = methods[i]
        // 			}
        // 		}
        // 		console.log(_this)
        // 	}
        // })
        return {};
    },
};
</script>

<style lang="scss" scoped></style>


