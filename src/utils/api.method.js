/* axios封装
 * @author Dan
 * @2018-12-12
 */
import axios 	from 'axios';
import config 	from './api.config';
import router 	from '@/router'
// import {Toast}from 'element-ui'
import { Toast } from 'mint-ui'

const _config = config;

export default function axiosFun(options) {
	return new Promise((resolve, reject) => {
		const _axios = axios.create({
			baseURL : _config.baseURL,
			headers	: _config.headers,
			timeout : _config.timeout,
			transformResponse : _config.transformResponse
		})
		// request 请求 拦截器
		_axios.interceptors.request.use(
			config => {
				
		    	if (_config.method != 'post') { // 非post请求需要更换content-Type
		    		 _config.headers = { 'Content-Type' : 'application/json;charset=UTF-8' };
		    	}
		        return config
		    },
		    error => {
		    	Toast('请求超时!'); // 还可以做更详细的处理，不过这样写，已经足够了
		        return Promise.reject(error);	// 在调用的那边可以拿到(catch)你想返回的错误信息
		    }
		)
		// response 响应 拦截器
	    _axios.interceptors.response.use(
	      response => {
	        let data;
	        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
	        if (response.data == undefined) {
	          data = JSON.parse(response.request.responseText)
	        } else {
	          data = JSON.parse(response.data)
	        }
	        /*
	         *	本系统中接口正确的标识是 根据成功后的返回参数来校验的。
	         * 	可以根据自己系统校验，正确的 return data; 错误的 return Promise.reject(data); 
	         * 	正确的 return data;
	         * 	错误的 return Promise.reject(data); 该错误会在 catch 里返回
	         * */
	        let _resp = data;
	        if(_resp.errcode == 0 || _resp.error == 0){
	        	return data; 
	        }
// 			else if(_resp.ErrCode == 201){
// 	        	_resp.IsShow == 1 ? Toast( _resp.ErrMsg ) : Toast( '自定义异常');
// 	        }else if(_resp.ErrCode == 203){
// 	        	_resp.IsShow == 1 ? Toast(_resp.ErrMsg ) : Toast('系统内部错误');
// 	        }else if(_resp.ErrCode == 204){
// 	        	_resp.IsShow == 1 ? Toast( _resp.ErrMsg ) : Toast('其他错误');
// 	        }else{
// 	        	Toast('系统内部错误');
// 	        }
	        return Promise.reject(data);
	      },
	      err => { // 可以根据自己的需求来处理，也就是也可以跳转对应的页面，例如404页面
//	      	if (err.response.status == 504||err.response.status == 404) {
//			    Toast( '服务器被吃掉了哦⊙﹏⊙∥');
//			} else if (err.response.status == 403) {
//			    Toast( '权限不足,请联系管理员!');
//			}else if (err.response.status == 400) {
//			    
//			}else {
//			    Toast( '未知错误!');
//			}
			return Promise.reject(err);
	      }
	    )
		
		// 请求处理
	    _axios(options).then(res => {
	      resolve(res)
	      return false
	    }).catch(error => {
	      reject(error)
	    })
	    
    })
}