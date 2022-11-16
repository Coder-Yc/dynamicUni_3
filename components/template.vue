<template name="templateCom">
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
            <template v-if="item['children'].length !== 0">
                <templateCom :data="item['children']"></templateCom>
            </template>
        </view>
    </block>
</template>

<script>
import templateCom from "./template.vue";
//import { onLoad } from "@dcloudio/uni-app";
// import {  getCurrentInstance, toRefs,reactive,onMounted } from "vue";

export default {
    name: "templateCom",
    components: { templateCom },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        }
		
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
