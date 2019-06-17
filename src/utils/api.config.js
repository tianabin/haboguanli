/* axios封装 -- 基础配置
 * @author Dan
 * @2018-12-12
 */
export default {
  method:'post',
  // 基础url前缀
  baseURL:'https://btjapi.yundian168.com/',
	
  // 请求头信息
  headers:{ 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  // 参数
  data:{},
  // 设置超时时间
  timeout: 6000,
  // 返回数据类型
  responseType: 'json',
  // 只适用于 POST,PUT,PATCH，transformRequest` 允许在向服务器发送前，修改请求数据。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformResponse : [function(data){ return data }] 
}