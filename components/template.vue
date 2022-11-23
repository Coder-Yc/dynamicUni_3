<template>
    <block v-for="(item, index) of data" :key="item">
        <text
            v-if="item['type1'] === 'text'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="clickName(item['@tap'])"
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
            @tap="clickName(item['@tap'])"
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
            @tap="clickName(item['@tap'])"
            :[scrollX]="item['scroll-x']"
            :[scrollY]="item['scroll-y']"
            @scrolltoupper="clickName($event, item['@scrolltoupper'])"
            @scrolltolower="clickName($event, item['@scrolltolower'])"
            @scroll="clickName($event, item['@scroll'])"
        >
            <template v-if="item['children'].length !== 0">
                <templateCom :data="item['children']"></templateCom>
            </template>
        </scroll-view>
    </block>
</template>

<script>
import { onMounted } from "vue";
import bus from "../pages/index/mitt.js";
import { ref, getCurrentInstance, reactive } from "vue";
export default {
    name: "templateCom",
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        method: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    setup(props) {
        // let { proxy } = getCurrentInstance();
        // let _this = proxy

        let scrollY = "scroll-y";
        let scrollX = "scroll-x";
        const clickName = (e, name) => {
            bus.emit(name, e);
        };
        return { clickName, scrollY, scrollX };
    },
};
</script>

<style lang="scss" scoped></style>
