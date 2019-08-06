import axios from 'axios'
import qs from 'qs'

export default function axisohttp(type, url, params = {}) {
	return new Promise((resolve, reject) => {

		if(type.toLowerCase() === 'get') {
			axios.get(url, {
				params
			}).then(res => {
				// console.log(res)
				resolve(res)
			})
		} else {
			axios.post(url, qs.stringify(params)).then(res => {
				// console.log(res)
				resolve(res)
			})
		}

	})
}