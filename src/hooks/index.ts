import { computed, reactive, ref } from "vue";
import { uiRatio } from "@/config/app";

//  屏幕尺寸改变数据
const clientSize = reactive({
    innerWidth: innerWidth,
    innerHeight: innerHeight
});

const setClientSize = function(callback?: any) {
    clientSize.innerHeight = innerHeight;
    clientSize.innerWidth = innerWidth;

    //  在改变之后，对其进行处理
    callback && callback();
}


export {
    clientSize,
    setClientSize
};



