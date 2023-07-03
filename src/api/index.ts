import request from '@/utils/request';


/**
 * @description 值班民警
 */
export function dutyPolice(query?: any = {}) {
  return request({
    url: 'dashboard/dutyPolice',
    method: 'GET',
    data: query
  })
}

/**
 * @description 警情列表
 */
export function caseList(query?: any = {}) {
  return request({
    url: 'dashboard/caseList',
    method: 'GET',
    data: query
  })
}

/**
 * @description 警情列表统计
 */
export function caseStatistics(query?: any = {}) {
  return request({
    url: 'dashboard/caseStatistics',
    method: 'GET',
    data: query
  })
}

/**
 * @description 过车数量统计
 */
export function carTrackStatistics(query?: any = {}) {
  return request({
    url: 'dashboard/carTrackStatistics',
    method: 'GET',
    data: query
  })
}

/**
 * @description 高发警情
 */
export function highIncidenceInstanceList(query?: any = {}) {
  return request({
    url: 'dashboard/highIncidenceInstanceList',
    method: 'GET',
    data: query
  })
}
/**
 * @description 高发案件
 */
export function highIncidenceCaseList(query?: any = {}) {
  return request({
    url: 'dashboard/highIncidenceCaseList',
    method: 'GET',
    data: query
  })
}

/**
 * @description 警力分布
 */
export function policeResource(query?: any = {}) {
  return request({
    url: 'dashboard/policeResource',
    method: 'GET',
    data: query
  })
}