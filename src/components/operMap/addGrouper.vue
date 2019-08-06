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
			            <label>请输入手机号：</label>
			        </td>
			    </tr>
			    <tr>
			        <td>
			            <input id="phone" v-model="phone"/>
			        </td>
			    </tr>
			</table>
			<table class="tab">
			    <tr>
			        <td>
			            <label>请选择省市区:</label>
			        </td>
			    </tr>
			    <tr>
			        <td>
			        <div class="xuanze">
						<div class="sheng" @click="shenghui">
							{{this.sheng}}
						</div>
						<ul :class="disply?'xianshi':'yincang'">
								<li v-for="(item,index) in areaList" :key="index" @click="xuangze(item)">{{item.areaName}}</li>
						</ul>
						<div class="sheng2" @click="shenghui2">
							{{this.sheng2}}
						</div>
						<ul :class="disply2?'xianshi2':'yincang2'">
								<li v-for="(item,index) in areaList2" :key="index" @click="xuangze2(item)">{{item.areaName}}</li>
						</ul>

						 <div class="sheng3" @click="shenghui3">
							{{this.sheng3}}
						</div>
						<ul :class="disply3?'xianshi3':'yincang3'">
								<li v-for="(item,index) in areaList3" :key="index" @click="xuangze3(item)">{{item.areaName}}</li>
						</ul>
					</div>
			        </td>
			    </tr>
			</table>
			<table class="dizhi">
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
			<table class="btn">
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
	import axiosHttp from '@/utils/http'
	import apilist from '@/utils/apilist'
export default {
  name: "tebNav",
  data() {
    return {
		xiaoQName:"",
		userName:"",
		address:"",
		lat:'',
		lng:'',
		id:'',
		user_id:window.localStorage.getItem('userMapId'),
		erp_user_id:window.localStorage.getItem('erp_user_id'),
		formattedAddress:'',
		phone:'',
		sheng:'请选择省',
		sheng2:"请选择市",
		sheng3:'请选择区',
		disply:false,
		disply2:false,
		disply3:false,
		province_id:'',
		city_id:'',
		area_id:'',
		areaList:{},
		areaList2:{},
		areaList3:{}
    }
  },
  created(){
	// loadMapApi(()=>{
	//     this.initMap()
	// })  
  },
  mounted(){
	// const link = document.createElement('link')
    // link.type = 'text/css'
    // link.rel = 'stylesheet'
    // link.href = 'https://cache.amap.com/lbs/static/main1119.css'
    // document.head.appendChild(link)
  },
  mounted(){
	mui.back = function() {
		window.history.go(-1);
	}
  },
  methods:{
  	// initMap(){
	// 	let $v=this;
	// 	//地图加载
	// 	var map = new AMap.Map("container", {
	// 	    resizeEnable: true
	// 	});
	// 	//输入提示
	// 	var autoOptions = {
	// 	    input: "tipinput"
	// 	};
	// 	var auto = new AMap.Autocomplete(autoOptions);
	// 	var placeSearch = new AMap.PlaceSearch({
	// 	    map: map
	// 	});  //构造地点查询类
	// 	AMap.event.addListener(auto, "select", function(e){
	// 		// console.log(e.poi.name)
	// 		var keywords = e.poi.name;
	// 		AMap.plugin('AMap.PlaceSearch', function(){
	// 			var autoOptions = {
	// 				city: '全国'
	// 			}
	// 			var placeSearch = new AMap.PlaceSearch(autoOptions);
	// 			placeSearch.search(keywords, function(status, result) {
	// 				AMap.plugin('AMap.Geocoder', function() {
	// 				  var geocoder = new AMap.Geocoder({
	// 					// city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
	// 					city: '全国'
	// 				  })
					 
	// 				  var lnglat = [result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]

	// 				  geocoder.getAddress(lnglat, function(status, result1) {
	// 					if (status === 'complete' && result.info === 'OK') {
	// 						// result为对应的地理位置详细信息
	// 						$v.formattedAddress=result1.regeocode.formattedAddress
	// 					}
	// 				  })
	// 				})
	// 				console.log(result)
	// 				$v.xiaoQName=result.poiList.pois[0].name
	// 				// 搜索成功时，result即是对应的匹配数据
	// 				var marker1 = [];
	// 				marker1[0] = new AMap.Marker({
	// 					icon: new AMap.Icon({            
	// 						image:'https://btj.yundian168.com/biz/baseImg/location.png',
	// 						size: new AMap.Size(52, 52),  //图标大小
	// 						imageSize: new AMap.Size(36,36)
	// 					}),
	// 					position: new AMap.LngLat(result.poiList.pois[0].location.lng,result.poiList.pois[0].location.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
	// 					title: ''
	// 				});
	// 				// 将创建的点标记添加到已有的地图实例：
	// 				map.clearMap();
	// 				map.add(marker1);
	// 				$v.lat=result.poiList.pois[0].location.lat
	// 				$v.lng=result.poiList.pois[0].location.lng
	// 				map.setCenter([result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]);
	// 				map.setZoom(18);
	// 			})
	// 		})
	// 	});//注册监听，当选中某条记录时会触发
	// },
	subMit(){
		let _this=this;
		if(this.userName== ""){
			Toast('请输入联系人')
		}else if(this.address == ""){
			Toast('请输入详细地址')
		}else if(!this.user_id || !this.erp_user_id){
			this.$router.push({path:'/'});
		}else{
		   let params = {
			   				user_name:_this.userName,
							telphone:_this.phone,
							address:_this.address,
							province_id:_this.province_id,
							city_id:_this.city_id,
							area_id:_this.area_id,
							uid:_this.user_id,
						};
						console.log(params)
				axiosHttp('post',apilist.seedUser,params).then(res =>{
					console.log(res)
					if(res.data.errcode == 0){
						Toast('创建成功')
						this.$router.push({path:'/opermap'});
					}else if(res.data.errcode == 1){
						Toast(res.data.errmsg)
					}
				})
		}
		// _this.apiAxios.createCommander(params).then(res => {
			// 	if(res.errcode==0){
			// 		Toast('创建成功')
			// 		this.$router.push({path:'./personalinfo',query:{id:res.result.id}});
			// 	}
			// }).catch(err => {
			// 	Toast(err.errmsg)
			// })
	},
	shenghui(){
				if(this.disply){
					this.disply = false
				}else{
					this.disply = true
				}
				let params = {
					pid:0
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList = res.data
					console.log(this.areaList)
				})
			},

			xuangze(item){
				this.sheng = item.areaName
				this.province_id = item.areacode
				this.disply = false
				// console.log(item)
				let params = {
					pid:item.areacode
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList2 = res.data
					// console.log(this.areaList2)
				})
			},
			//市
			shenghui2(){
				if(this.disply2){
					this.disply2 = false
				}else{
					this.disply2 = true
				}
			},
			xuangze2(item){
				this.disply2 = false
				this.sheng2 = item.areaName
				this.city_id = item.areacode
				let params = {
					pid:item.areacode
				}
				axiosHttp('post',apilist.Province,params).then(res =>{
					this.areaList3 = res.data
					// console.log(this.areaList3)
				})
			},
			//区
			shenghui3(){
				if(this.disply3){
					this.disply3 = false
				}else{
					this.disply3 = true
				}
			},
			xuangze3(item){
				this.disply3 = false
				this.sheng3 = item.areaName
				this.area_id = item.areacode
			},
  }
};
// function loadMapApi(cb){
//     var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving,AMap.Geocoder';
//     var jsapi = document.createElement('script');
//     jsapi.type = 'text/javascript';
//     jsapi.charset = 'utf-8';
//     jsapi.src = url;
//     document.head.appendChild(jsapi);
//     jsapi.onload = cb
//   }
</script>

<style>
	.btnInfo{width: 6.6rem;height: 1rem;text-align: center;line-height: 1rem;background-color: #1aad19;color: #fff;}
	.btn{
		margin-top: 1.43rem;
	}
	.sheng{
		color:black;
		height: 3.91rem;
		position: relative;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
}
.dizhi{
	margin-top: 1.2rem;
}
table{
	width: 90%;
	margin: auto;
}
.xuanze{
	width: 100%;
	display: flex;
}
.xuanze div{
	flex: 1;
	margin-left: .43rem;
	margin-top: .43rem;
}
.yincang{
	position:absolute;
	top:9.9rem;
	left: 0px;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	  display: none;
}
.yincang li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang::-webkit-scrollbar{
	display: none;
}
.xianshi{
	display: block;
	position:absolute;
	top:9.9rem;
	left: 1.3rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 3.17rem;
}
.xianshi li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi::-webkit-scrollbar{
	display: none;
}
.sheng2{
	color:black;
	height: 3.91rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang2{
	position:absolute;
	top:9.9rem;
	left: 3.5rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;
	  display: none;
}
.yincang2 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang2::-webkit-scrollbar{
	display: none;
}
.xianshi2{
	position:absolute;
	top:9.9rem;
	left: 6rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 3.17rem;
	  display: block
}
.xianshi2 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi2::-webkit-scrollbar{
	display: none;
}
.sheng3{
	color:black;
	height: 3.91rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang3{
	display: none;
	position: absolute;
	top:9.9rem;
	right:1.09rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 2.17rem;

}
.yincang3 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.yincang3::-webkit-scrollbar{
	display: none;
}
.xianshi3{
	position: absolute;
	top:9.9rem;
	right:2.09rem;
	height: 3.91rem;
	overflow: scroll;
	border: 1px solid #cccccc;
	/* white-space: pre-wrap;
  	word-break: normal; */
	  font-size: 12px;
	  width: 3.17rem;
	display: block;
}
.xianshi3 li{
	width: 100%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.xianshi3::-webkit-scrollbar{
	display: none;
}
.xuanze{
	display: flex;
}
.xuanze div{
	flex: 1;
}
</style>
