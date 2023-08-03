import MainStore from './main';

import { defineStore } from "pinia";

export const mainStore = defineStore('main', MainStore);






/**
 * 公共方法 - 监听 actions 方法
 * @param actionFnName actions方法名
 * @param callback 回调函数
 */
export const watchStore = (actionFnName: string, callback: object) => {
  const store = mainStore();

  store.$onAction(({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    if (name === actionFnName) {
      after((reject) => {
        //这里可以执行一些操作
        callback(store)
      })
    }
    onError((error) => {
      console.log(error)
    })
  })
}

