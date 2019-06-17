/* axios封装 
 * @ author Dan
 * @ 2018-12-12
 * @ GET方法中，参数url和参数拼接
 * @ 例如： 
 * @ let url = 'api/test'; let param = { id : 1 }
 * @ urlParams(url,param) 结果为 api/test?id=1
 * @ 例如： 
 * @ let url = 'api/test?name=2'; let param = { id : 1 }
 * @ urlParams(url,param) 结果为 api/test?name=2&id=1
 */
export default function urlParams(url, params) {
	var url = url.indexOf('?') !== -1 ? url + '&' : url + '?'; 
    for(var item in params) {
        if ('' !== params[item]) {
            url += item + '=' + params[item] + '&';
        }
    }
    return url.substring(0,url.length-1);
}