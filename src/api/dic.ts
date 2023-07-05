import request from '@/utils/request';


/**
 * @description 值班民警 - 值班类型
 */
export function dic_PoliceType(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/biz_duty_police_type',
    method: 'GET',
    data: query
  })
}

/**
 * @description 案件类型
 */
export function dic_Category(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/biz_case_category',
    method: 'GET',
    data: query
  })
}

/**
 * @description 高发警情类型
 */
export function dic_HighCategory(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/biz_high_incidence_instance_category',
    method: 'GET',
    data: query
  })
}

/**
 * @description 高发案件类型
 */
export function dic_HighCaseList(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/biz_high_incidence_case_category',
    method: 'GET',
    data: query
  })
}

/**
 * @description 车辆类型
 */
export function dic_CarType(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/stat_car_type',
    method: 'GET',
    data: query
  })
}

/**
 * @description 警务资源 - 警力类型
 */
export function dic_ResourceType(query?: any = {}) {
  return request({
    url: 'dashboard/dict/data/type/biz_police_resource_type',
    method: 'GET',
    data: query
  })
}
