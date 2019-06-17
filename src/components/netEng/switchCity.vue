<template>
   <div class="app" :style="'height:'+sHeight+'px'">
   	   <div class="wrap">
	   	    <div class="content">定位／最近访问</div>
	   	    <div class="city_btn" @click="locationCityClick()">
	   	    	<img src="../../assets/location.png"/>
	   	    	<div>{{city}}</div>
	   	    </div>
	   	    <div class="content">已开通的城市</div>
	   	    <div class="list_wrap">
	   	    	<div @click="selectCityClick(item.city_id,item.city_name)" v-for="(item,index) in cityList">{{item.city_name}}</div>
	   	    </div>
   	   </div>
   </div>
</template>

<script>
	import { Toast,Indicator } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		components:{
		    Tabnav:Tabnav
		},
		data(){
			return {
				user_id:window.localStorage.getItem('userMapId'),
				erp_user_id:window.localStorage.getItem('erp_user_id'),
				city:'',
				selectCity:'',
				cityList:[]
			}
		},
		created(){
			this.sHeight=document.documentElement.clientHeight
			 document.title = '切换城市'
			loadMapApi(()=>{
			    this.getCity()
			})
			Indicator.open('获取定位中...');
			this.getCityList()
			 
		},
		methods:{
			locationCityClick(){  //当前定位城市点击事件
				let _this=this;
				_this.cityList.forEach(function(item,i){
					if(_this.city==item.city_name){
						window.localStorage.setItem('selectCity',item.city_name);
				        _this.$router.push({path:'./neteng',query:{cityId:item.city_id}});
					}
				})
				
			},
			selectCityClick(id,name){  //选择城市点击事件
				window.localStorage.setItem('selectCity',name);
				this.$router.push({path:'./neteng',query:{cityId:id}});
			},
			getCityList(){   //获取城市列表
				let $v=this;
				$v.apiAxios.getCitys().then(res => {
					console.log(res)
					if(res.errcode==0){
						$v.cityList=res.result;
					}
				}).catch(err => {
				  Toast(err.msg)
				})
			},
			getCity(){
				let _this=this;
				  //实例化城市查询类
		        var citysearch = new AMap.CitySearch();
		        //自动获取用户IP，返回当前城市
		        citysearch.getLocalCity(function(status, result) {
		        	Indicator.close();
		            if (status === 'complete' && result.info === 'OK') {
		                if (result && result.city && result.bounds) {
		                    var cityinfo = result.city;
		                    _this.city=result.city
		                    window.localStorage.setItem('locationCity',result.city)
		                }else{
		                	 _this.city='获取失败'
		                }
		            } 
		        });
			}
			
			
		}
	};
function loadMapApi(cb){
    var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving,AMap.CitySearch';
    var jsapi = document.createElement('script');
    jsapi.type = 'text/javascript';
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
    jsapi.onload = cb
  }
</script>

<style scoped="scoped">
   .app{background: #FAFAFA; padding-top: 0.340425rem;}
   input, button, select, textarea {
	outline: none;
	-webkit-appearance: none;
	border-radius: 0;
	border: none;
	}
	::-webkit-input-placeholder{
	     color: #999;
	     font-size: 0.595744rem;
	    line-height: 1.87234rem;
	}
	.content{ color: #666; font-size: 0.595744rem; padding: 0.531914rem;}
	.city_btn{ width: 4.255319rem;  background: #fff; border-radius: 0.212765rem; margin-left: 0.510638rem; font-size: 0.595744rem; color: #333; box-sizing: border-box; display: flex;  }
	.city_btn img{ width: 0.638297rem; height: 0.638297rem; margin: 0.319148rem 0.255319rem 0.319148rem 0.446808rem;}
	.city_btn div{ line-height: 1.276595rem;}
	.list_wrap{ display: flex;  flex-wrap: wrap; padding: 0 0.255319rem; }
	.list_wrap div{  background: #fff;  font-size: 0.595744rem; color: #333; border-radius: 0.212765rem; text-align: center; margin: 0.127659rem; padding: 0.340425rem 0.914893rem; box-sizing: border-box;}
</style>