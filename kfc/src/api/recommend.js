import jsonp from 'common/js/jsonp'
const axios = require('axios')
// import axios from ''

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  return jsonp(url, {
    _: 1553084578304,
    g_tk: 5381,
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  }, {param: 'jsonpCallback'})
}
export function getSongList() {
  const data = {
    g_tk: 5381,
    uin: 0,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }
  return axios.get('/api/getSongList', {
    params: data
  }).then((response) => {
    // 前端发送ajax请求 response中包括headers/data
    return Promise.resolve(response.data)
  })
}
