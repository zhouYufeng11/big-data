import request from '@/utils/request';


/**
 * @description 获取小区列表
 */
export function getAllVillage(query?: any = {}) {
  return request({
    url: 'dept/getAllVillage',
    method: 'GET',
    data: query
  })
}

/**
 * @description 获取监控设备列表
 * @param page: 1 页数
 * @param limit: 10 条数
 * @param villageId: '1539529676529627138'
 */
export function getMonitorList(query?: any = {}) {
  return request({
    url: 'deviceinfo/preview',
    method: 'POST',
    data: query
  })
}
