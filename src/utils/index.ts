/**
 * fn 是需要执行的函数
 * wait 是时间间隔
 */
export const throttle = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0
  // 将 throttle 处理结果当作函数返回
  return (...args) => {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date()
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now
      fn(args)
    }
  }
}

/**
 * 
 * @param dateTime  new Date()
 * @returns {}
 */
export const formatterDay = (dateTime?: Date) => {
  let now: Date = dateTime || new Date();
  let year = now.getFullYear();
  let month = (now.getMonth() + 1 < 10 ? '0' : '') + `${now.getMonth() + 1}`;
  let day = (now.getDate() < 10 ? '0' : '') + `${now.getDate()}`;
  let current = now.toLocaleTimeString();
  let week = now.getDay();
  let weekStr = '星期';
  switch (week) {
    case 0:
      weekStr += '日';
      break;
    case 1:
      weekStr += '一';
      break;
    case 2:
      weekStr += '二';
      break;
    case 3:
      weekStr += '三';
      break;
    case 4:
      weekStr += '四';
      break;
    case 5:
      weekStr += '五';
      break;
    case 6:
      weekStr += '六';
      break;
  }
  return { day: `${year}.${month}.${day}`, week: weekStr }
}

/**
 * 
 * @param dateTime  new Date()
 * @returns string
 */
export const formatterTime = (dateTime?: Date) => {
  let now: Date = dateTime || new Date();
  return now.toLocaleTimeString()
}


/**
 * 
 * @param orig Object
 * @returns new Objec
 */
export const deepClone = (orig: any) => {
  let copy: any = Object.create(Object.getPrototypeOf(orig))
  Object.getOwnPropertyNames(orig)
    .forEach(ele => {
      // 获取到每个属性的所有描述，然后重新定义对象的属性并返回此对象。
      let desc: any = Object.getOwnPropertyDescriptor(orig, ele);
      Object.defineProperty(copy, ele, desc)
    });
  return copy;
}

/**
 * 图片转base64
 * @param url 图片链接
 * @param height 图片高度
 * @param callback 回调Fn
 */
export const imgToBase64 = (url: string, height: number, callback: any) => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let img = new Image();
  let HEIGHT = height;
  img.crossOrigin = 'Anonymous';
  img.src = url;
  img.onload = () => {
    let WIDTH = HEIGHT * img.width / img.height;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
    let dataURL = canvas.toDataURL('image/png');
    callback.call(this, dataURL); // 回调函数获取Base64编码
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    img = null;
    WIDTH = null;
  };
}