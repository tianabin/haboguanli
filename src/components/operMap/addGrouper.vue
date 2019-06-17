<template>
	<div>
		<div id="container"></div>
		<div id="myPageTop">
			<table>
			    <tr>
			        <td>
			            <label>请输入联系人：</label>
			        </td>
			    </tr>
			    <tr>
			        <td>
			            <input id="userName" v-model="userName"/>
			        </td>
			    </tr>
			</table>
		    <table>
		        <tr>
		            <td>
		                <label>请输入小区名称：</label>
		            </td>
		        </tr>
		        <tr>
		            <td>
		                <input id="tipinput"/>
		            </td>
		        </tr>
		    </table>
			<table>
			    <tr>
			        <td>
			            <label>请输入详细地址：</label>
			        </td>
			    </tr>
			    <tr>
			        <td>
			            <input id="tipinputs" v-model="address"/>
			        </td>
			    </tr>
			</table>
			<table>
			    <tr>
			        <td>
			            <div class="btnInfo g-pointer" @click="subMit()">提交</div>
			        </td>
			    </tr>
			</table>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: "tebNav",
  data() {
    return {
		xiaoQName:"",
		userName:"",
		address:"",
		lat:'',
		lng:'',
		user_id:window.localStorage.getItem('userMapId'),
		erp_user_id:window.localStorage.getItem('erp_user_id'),
		formattedAddress:''
    }
  },
  created(){
	loadMapApi(()=>{
	    this.initMap()
	})  
  },
  mounted(){
	const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'https://cache.amap.com/lbs/static/main1119.css'
    document.head.appendChild(link)
  },
  mounted(){
	mui.back = function() {
		window.history.go(-1);
	}
  },
  methods:{
  	initMap(){
		let $v=this;
		//地图加载
		var map = new AMap.Map("container", {
		    resizeEnable: true
		});
		//输入提示
		var autoOptions = {
		    input: "tipinput"
		};
		var auto = new AMap.Autocomplete(autoOptions);
		var placeSearch = new AMap.PlaceSearch({
		    map: map
		});  //构造地点查询类
		AMap.event.addListener(auto, "select", function(e){
			// console.log(e.poi.name)
			var keywords = e.poi.name;
			AMap.plugin('AMap.PlaceSearch', function(){
				var autoOptions = {
					city: '全国'
				}
				var placeSearch = new AMap.PlaceSearch(autoOptions);
				placeSearch.search(keywords, function(status, result) {
					AMap.plugin('AMap.Geocoder', function() {
					  var geocoder = new AMap.Geocoder({
						// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
						city: '全国'
					  })
					 
					  var lnglat = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]

					  geocoder.getAddress(lnglat, function(status, result1) {
						if (status === 'complete' && result.info === 'OK') {
							// result为对应的地理位置详细信息
							$v.formattedAddress=result1.regeocode.formattedAddress
						}
					  })
					})
					console.log(result)
					$v.xiaoQName=result.poiList.pois[0].name
					// 搜索成功时，result即是对应的匹配数据
					var marker1 = [];
					marker1[0] = new AMap.Marker({
						icon: new AMap.Icon({            
							image:'https://btj.yundian168.com/biz/baseImg/location.png',
							size: new AMap.Size(52, 52),  //图标大小
							imageSize: new AMap.Size(36,36)
						}),
						position: new AMap.LngLat(result.poiList.pois[0].location.lng,result.poiList.pois[0].location.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
						title: ''
					});
					// 将创建的点标记添加到已有的地图实例：
					map.clearMap();
					map.add(marker1);
					$v.lat=result.poiList.pois[0].location.lat
					$v.lng=result.poiList.pois[0].location.lng
					map.setCenter([result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]);
					map.setZoom(18);
				})
			})
		});//注册监听，当选中某条记录时会触发
	},
	subMit(){
		let _this=this;
		if(!this.xiaoQName){
			Toast('请输入联系人')
		}else if(!this.address){
			Toast('请输入详细地址')
		}else if(!this.lat || !this.lng){
			Toast('请等待获取定位信息')
		}else if(!this.user_id || !this.erp_user_id){
			this.$router.push({path:'/'});
		}else{
		   let params = {user_id:_this.user_id,erp_user_id:_this.erp_user_id,user_name:_this.userName,address:_this.formattedAddress+_this.address,cummunity_name:_this.xiaoQName};
			_this.apiAxios.createCommander(params).then(res => {
				if(res.errcode==0){
					Toast('创建成功')
					this.$router.push({path:'./personalinfo',query:{id:res.result.id}});
				}
			}).catch(err => {
				Toast(err.errmsg)
			})
		}
	}
  }
};
function loadMapApi(cb){
    var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving,AMap.Geocoder';
    var jsapi = document.createElement('script');
    jsapi.type = 'text/javascript';
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
    jsapi.onload = cb
  }
</script>

<style>
	.btnInfo{width: 6.6rem;height: 1rem;text-align: center;line-height: 1rem;background-color: #1aad19;color: #fff;}
</style>
