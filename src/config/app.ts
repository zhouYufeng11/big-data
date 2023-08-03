
const uiWidth = 2520,
      uiHeight = 1080;

const uiRatio = uiHeight / uiWidth;

const dpr = window.devicePixelRatio;

//  基础数据，只需要获取一次的
const baseSize = {
    width: screen.availWidth * dpr,
    height: screen.availWidth * uiRatio * dpr
};


export {
    uiWidth,
    uiHeight,
    uiRatio,
    dpr,
    baseSize
};