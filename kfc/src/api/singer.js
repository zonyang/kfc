import jsonp from 'common/js/jsonp'

// const axios = require('axios')
// const ERR_OK = 0
export function getSingers() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  // 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
  const data = {
    g_tk: '5381',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    needNewCode: 0,
    platform: 'yqq'
  }
  // const data = {
  //   '-': 'getUCGI5304022430090465',
  //   g_tk: '5381',
  //   loginUin: 0,
  //   hostUin: 0,
  //   format: 'json',
  //   inCharset: 'utf8',
  //   outCharset: 'utf-8',
  //   notice: 0,
  //   platform: 'yqq.json',
  //   needNewCode: 0,
  //   data: {'comm': {'ct': 24, 'cv': 0},
  //     'singerList':
  //       {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}}}
  // }
  return jsonp(url, data, {param: 'jsonpCallback'})
  // return axios.get('/api/getSingers', {
  //   params: data
  // }).then((response) => {
  //   if (response.data.code === ERR_OK) {
  //     return Promise.resolve(response.data.singerList)
  //   }
  // })
}
