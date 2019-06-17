<template>
   <div class="app">
   	   <div class="contact">
   	   	   <p>联系人</p>
   	   	   <input type="text" placeholder="请输入联系人" v-model="name" value="" />
   	   </div>
   	   <!--<div class="contact">
   	   	   <p>小区名称</p>
   	   	   <input type="text" placeholder="请输入小区名称"  value="" />
   	   </div>-->
   	   <div class="contact">
   	   	   <p>详细地址</p>
   	   	   <input type="text" placeholder="请输入详细地址" v-model="address"  value="" />
   	   </div>
   	   <div id="map"></div>
   	   <div class="button" @click="submit">提交</div>
   	   <div class="test">请确认地图中的小区定位成功后再提交</div>
   	   <div class="test">提交后自动关注</div>
   	   <!-- <Tabnav></Tabnav> -->
   </div>
</template>

<script>
	let map = null;
	import { Toast } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		components:{
		    Tabnav:Tabnav
		},
		data(){
			return {
				name:'',
				address:'',
				lat:'',
				lng:'',
				user_id:window.localStorage.getItem('userMapId'),
				erp_user_id:window.localStorage.getItem('erp_user_id'),
				id:"",
				disName:""
			}
		},
		created(){
			 document.title = '添加团长'
			 this.id=this.$route.query.id
			 this.lat=this.$route.query.lat
			 this.lng=this.$route.query.lng
			 this.disName=this.$route.query.name
			 loadMapApi(()=>{
			     this.mapInit() 
			   })
			 
		},
	  mounted(){
		mui.back = function() {
			window.history.go(-1);
		}
	},
		methods:{
			submit(){
				let _this=this;
				if(!this.name){
					Toast('请输入联系人')
				}else if(!this.address){
					Toast('请输入详细地址')
				}else if(!this.lat || !this.lng){
					Toast('请等待获取定位信息')
				}else if(!this.user_id || !this.erp_user_id){
					this.$router.push({path:'/'});
				}else{
				   let params = {user_id:_this.user_id,erp_user_id:_this.erp_user_id,user_name:_this.name,address:_this.address,cummunity_id:_this.id};
					_this.apiAxios.createCommander(params).then(res => {
						if(res.errcode==0){
							Toast('创建成功')
							this.$router.push({path:'./personalinfo',query:{id:res.result.id}});
						}
					}).catch(err => {
						Toast(err.errmsg)
					})
				}
			},
			mapInit(){
				 var _this = this
			      map = new AMap.Map('map', {
			        zoom: 14,
//			         center: [116.356898,39.817036],//中心点坐标
			      });
			        map.plugin('AMap.Geolocation', function () {
					   var geolocation = new AMap.Geolocation({
					        enableHighAccuracy: true,//是否使用高精度定位，默认:true
					        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
					        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
					        showButton: true,        //显示定位按钮，默认：true
					        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
					        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
					        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
					        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
					        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					   });
					    map.addControl(geolocation);
					    geolocation.getCurrentPosition();
					    AMap.event.addListener(geolocation, 'complete', function(data){
					    	map.setCenter([_this.lng, _this.lat]);
							var marker1 = [];
							var div = document.createElement('div');
							div.className = 'circle';
							var htmlData='<div class="mark"><img style="width: 1rem;height: 1rem;" src="https://btj.yundian168.com/biz/baseImg/location.png"><div style="width:8rem;font-size:0.6rem;color:#000">'+_this.disName+'</div></div>';
							div.innerHTML = htmlData;
							marker1[0] = new AMap.Marker({
								content: div,
								position: new AMap.LngLat(_this.lng,_this.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
							});
							map.add(marker1);
					    });//返回定位信息
					    AMap.event.addListener(geolocation, 'error', function(data){
					    	console.log(data)
					    });      //返回定位出错信息
					});
			},
		}
	};
	function loadMapApi(cb){
	  var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac';
	  var jsapi = document.createElement('script');
	  jsapi.type = 'text/javascript';
	  jsapi.charset = 'utf-8';
	  jsapi.src = url;
	  document.head.appendChild(jsapi);
	  jsapi.onload = cb
	}
</script>

<style scoped="scoped">
	body{ background: #FAFAFA;}
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
	.amap-geolocation-con{bottom: 0;}
   .contact{  height: 1.87234rem; background: #fff; line-height: 1.87234rem; font-size: 0.595744rem; color: #333; display: flex; justify-content: space-between; padding: 0 0.531914rem; margin-bottom: 0.042553rem;}
   .contact input{ text-align: right; }
   #map{ width: 100%; height: 17.765957rem;}
   .button{ width: 7.234042rem; height: 1.489361rem; line-height: 1.489361rem; text-align: center; margin: 0 auto; margin-top: 0.851063rem; background: #3699FF; color: #fff; font-size: 0.595744rem; border-radius: 0.74468rem; margin-bottom: 0.319148rem; }
   .test{ font-size: 0.595744rem; color: #666; text-align: center;}
   .circle .mark img{width: 1rem;height: 1rem;}
</style>