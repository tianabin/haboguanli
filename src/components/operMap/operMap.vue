<template>
  <div class="m-map">
	<div id="search">
		<div class="scarchIcon"></div>
		<input id="tipinput" class="seInput"/>
		<!-- <div class="secBtn">搜索</div> -->
	</div>
	<!-- <div class="btnList">
		<div class="wiring" :class="isFlg==true?'btnActive':''" @click.stop="wiring">排线模式</div>
	</div> -->

	<!-- <div class="btnList-screen">
				平台筛选 
				<div
					class="btnList-screen-platform"
					@click="switchPlatform()"
				>
					<p :class="[platformNum != false ? 'num' : '']">
						 平台 
						<span v-if = "platformtext == ''">平台</span>
						<span v-else>{{platformtext}}</span>
					</p>
					<div
						class="btnList-screen-platform-list"
						v-show = "platformNum != false"
						v-for="(data,list) in platforms_data"
						:key="list"
						@click="platformBtn(data.p_platform_id,data.p_name)"
					>
						{{data.p_name}}
					</div>
				</div>-->
				<!-- <div
					class="btnList-screen-platform"
					@click="switchCustomer()"
				>
					<p :class="[customerNum != false ? 'num' : '']">
						<span v-if = "custypetext == ''">客户</span>
						<span v-else>{{custypetext}}</span>
					</p>
					<div
						class="btnList-screen-platform-list"
						v-show = "customerNum != false"
						v-for="(data,list) in client_data"
						:key="list"
						@click="platformsBtn(data.id,data.text)"
					>
						{{data.text}}
					</div>
				</div> 
			</div> -->

	<div class="btnList2">
		<!-- <div class="workPlan" @click="toWorkrec">工作计划</div> -->
		<div class="finishLine" @click="finishLine" v-if="isFlg">完成排线</div>
	</div>
    <div id="js-container" class="map" :style="'height:'+sHeight+'px'" @click.stop="isinfo=false,isinfoVis=false"></div>

  <div class="visiting-record-model" v-if="isinfoVis">
		 <div class="visiting-record-model-title">{{infoVis.name}}</div>
		 <div class="visiting-record-model-address"><div>地址</div> <span>{{infoVis.address}}</span></div>
		 <div class="building-type">
		 	  <div>建筑类型<span>{{infoVis.type}}</span></div>
		 	  <div>楼栋总数<span>{{infoVis.tung}}</span></div>
		 </div>
		 <div class="building-type">
		 	  <div>物业费用<span>{{infoVis.wprice}}</span></div>
		 	  <div>房屋总数<span>{{infoVis.households}}</span></div>
		 </div>
		 <div class="visiting-record-model-address"><div>物业公司</div> <span>{{infoVis.property}}</span></div>
		 <!-- <div class="visiting-record-model-address"><div>开发公司</div> <span>{{infoVis.property}}</span></div> -->
		 <!-- <div>无拜访记录</div>
		 <div class="visiting-record-model-time"><div>2019-03-30</div><span>XXXX</span></div>
		 <div>小区好屌</div> -->
		 <div class="visiting-record-model-btn" @click.stop="toDetil(infoVis.id)">查看详情</div>
		 <div class="navigation-btn g-pointer" @click.stop="navigation(infoVis.lat,infoVis.lng,infoVis.address)">导航</div>
	</div>
	<div class="visiting-record-model" v-if="isinfo">
		 <div class="visiting-record-model-title">{{info.user_name}}<div v-if="info.is_status==1">未捡入</div><div v-if="info.is_status==2">已捡入</div><div v-if="info.is_status==3">已安装</div></div>
		 <div class="visiting-record-model-address"><div>地址</div> <span>{{info.address}}</span></div>
		 <div v-if="infoList.length==0">无拜访记录</div>
		 <div v-if="infoList.length>0" v-for="v in infoList">
			 <div class="visiting-record-model-time"><div>{{v.create_time}}</div><span>{{v.name}}</span></div>
			 <div>{{v.content}}</div>
		 </div>
		 <div class="visiting-record-model-btn" @click="toInfoPar(info.id)">查看详情</div>
		 <div class="navigation-btn g-pointer" @click.stop="navigation(info.latitude,info.longitude,info.address)">导航</div>
	</div>
	<div class="addGroups" @click="toAddGrouper"></div>
	<Tabnav></Tabnav>
  </div>
</template>
<script>
  var map = null
	var driving=null
  import { Toast } from 'mint-ui'
  import Tabnav from "../tabNav/tebNav"
  import remoteLoad from '@/utils/remoteLoad.js'
  export default {
    data () {
      return {
        mapKey: '74c5bb25d70b21242db8c1b4810df723', //高德地图的key
        mapCityName: '北京',
        AMap: null,
		sHeight:"",
		lat: '',
		lng: '',
		village_data:[],
		resQuar:[],
		planRouteArr:[],
		startingPoint:null,
		end:null,
		approachPointArr:[],
		driving:null,
		resQuarId:[],
		isFlg:false,
		userId:"",
		isinfo:false,
		info:{},
		infoList:[],
		isinfoVis:false,
		infoVis:{},
		infoVisList:[],
		formattedAddress:"",
		timer:null,
		platformNum: false,
		customerNum: false,
		platforms_data: [],
		platformid: '',
		custype: '',
		platformtext: '',
		custypetext: '',
		client_data: [
			{
				id : 1,
				text : "联盟意向客户",
			},{
				id : 2,
				text : "社区派意向客户",
			},{
				id : 3,
				text : "双意向客户",
			}
		]
      }
    },
    watch: {

    },
	components:{
	      Tabnav:Tabnav
	},
	created(){
// 		loadMapApi(()=>{
// 			if($v.lat==''){
// 				$v.timer=setTimeout(function(){
// 					$v.initMap()
// 				},5000)
// 			}else{
// 				clearInterval($v.timer)
// 			}
//
// 		})
	},
	mounted () {
		this.userId = window.localStorage.getItem("userMapId");
		this.sHeight=document.documentElement.clientHeight
		loadMapApi(()=>{
		    this.initMap()

		})
		mui.back = function() {
			window.history.go(-1);
		}
		this.getPlatforms();
	},
    methods: {
      	// 搜索
      	handleSearch () {
        	if (this.searchKeyVal) {
          	this.placeSearch.search(this.searchKeyVal)
        	}
      	},
	  	//平台筛选按钮
		switchPlatform () {
 			this.platformNum =! this.platformNum;
		},
		//用户筛选按钮
		switchCustomer () {
			this.customerNum =! this.customerNum;
		},
	  toAddGrouper(){
		this.$router.push({path:'./addgrouper'});
	  },
	  toDetil(i){
		 this.$router.push({path:'./districtdetails',query:{id:i,address:this.formattedAddress}});
	  },
		toWorkrec(){
			this.$router.push({path:'./workplan'});
		},
		toInfoPar(i){
			this.$router.push({path:'./personalinfo',query:{id:i}});
		},
		//平台筛选往后台发送id
		platformBtn(id,text){
			this.platformid = id
			this.platformtext = text
			let $v=this,
			params = {lng:$v.lng,lat:$v.lat,user_id:$v.userId,platformid:$v.platformid,custype:$v.custype};
			$v.apiAxios.getMapData(params).then(res => {
				console.log(res);
				map.clearMap();
				$v.village_data=res.result.village_data
				$v.customer_data=res.result.customer_data
				$v.setPoints(res.result.customer_data,res.result.village_data)

			}).catch(err => {
				Toast('暂无')
			})
		},
		//客户筛选往后台发送id
		platformsBtn(id,text){
			this.custype = id
			this.custypetext = text
			let $v=this,
			params = {lng:$v.lng,lat:$v.lat,user_id:$v.userId,platformid:$v.platformid,custype:$v.custype};
			$v.apiAxios.getMapData(params).then(res => {
				console.log(res);
				map.clearMap();
				$v.village_data=res.result.village_data
				$v.customer_data=res.result.customer_data
				$v.setPoints(res.result.customer_data,res.result.village_data)

			}).catch(err => {
				Toast('暂无')
			})
		},
		//筛选获取列表
		getPlatforms () {
			let $v=this,
			params = {lng:$v.lng,lat:$v.lat,user_id:$v.userId};
			$v.apiAxios.getPlatforms(params).then(res => {
				$v.platforms_data=res.result
			}).catch(err => {

			})
		},
		navigation(i,s,t){
			wx.openLocation({
				latitude: parseFloat(i), // 纬度，浮点数，范围为90 ~ -90
				longitude: parseFloat(s), // 经度，浮点数，范围为180 ~ -180。
				name: t, // 位置名
				address: '', // 地址详情说明
				scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
				infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
			});
			event.stopPropagation();
		},
		getMapCustomer(gid){
			let $v=this,
			params = {gid:gid};
			$v.apiAxios.getMapCustomer(params).then(res => {
				$v.isinfo=true
				$v.info=res.result.info;
				$v.infoList=res.result.list;
			}).catch(err => {

			})
		},
		getMapVillage(vid){
			let $v=this,
			params = {vid:vid};
			$v.apiAxios.getMapVillage(params).then(res => {
				$v.isinfoVis=true
				$v.infoVis=res.result.info;
				// $v.infoVisList=res.result.list;
			}).catch(err => {

			})
		},
	  getMapData(){
			let $v=this,
			params = {lng:$v.lng,lat:$v.lat,user_id:$v.userId};
			$v.apiAxios.getMapData(params).then(res => {
				$v.village_data=res.result.village_data
				$v.customer_data=res.result.customer_data
				$v.setPoints(res.result.customer_data,res.result.village_data)
			}).catch(err => {

			})
	  },
	makePoints(i){
		console.log(i);
		let $v=this;
		var marker = new AMap.Marker({
			icon: new AMap.Icon({
				image:i.img_status,
				size: new AMap.Size(52, 52),  //图标大小
				imageSize: new AMap.Size(20,20)
			}),
			position: new AMap.LngLat(i.longitude,i.latitude),
			offset: new AMap.Pixel(-12,-12)
		});
		marker.on('click', function(e){
			console.log(i)
			$v.getMapCustomer(i.id)
		})
		return marker
	},
	  makePointsResQua(i){
			let $v=this;
		  var div = document.createElement('div');
		  div.className = 'circle';
			div.style.backgroundColor = '#3072F6';
		  var htmlData='<div>'+i.name+'</div>';
		  div.innerHTML = htmlData;
	  		var marker = new AMap.Marker({
	  		    content: div,
	  		    title:i.name,
	  		    position: new AMap.LngLat(i.lng,i.lat),
	  		    offset: new AMap.Pixel(-24, 5)
	  		});
			marker.on('click', function(e){
				if($v.isFlg){
					var div = e.target.getContent();
					if(div.style.backgroundColor=='rgb(242, 44, 44)'){
						div.style.backgroundColor = 'rgb(48,114,246)';
						Array.prototype.indexOf = function(val) {
							for (var i = 0; i < this.length; i++) {
								if (this[i] == val) return i;
							}
							return -1;
						};
						Array.prototype.remove = function(val) {
							var index = this.indexOf(val);
							if (index > -1) {
								this.splice(index, 1);
							}
						};
						$v.resQuarId.remove(i.id);
						$v.resQuar.remove(i);
					}else{
						$v.resQuar.push(i)
						$v.resQuarId.push(i.id)
						div.style.backgroundColor = 'rgb(242,44,44)';
					}
					e.target.setContent(div);
				}else{
					$v.getMapVillage(i.id)
				}

			})
	  		return marker
	  },
	  setPoints(data,data1){
		  console.log(data)
		var markers = []
		data.forEach(item => {
			var mark = this.makePoints(item)
			markers.push(mark)
		})
		data1.forEach(item => {
			var mark1 = this.makePointsResQua(item)
			markers.push(mark1)
		})
		map.add(markers)
		map.setFitView(markers);
	  },
	  wiring(){
		let $v=this;
		map.clearMap();
		if($v.isFlg){
			$v.isFlg=false;
			$v.setPoints($v.customer_data,$v.village_data)
		}else{
			$v.isFlg=true;
			$v.setPoints([],$v.village_data)
		}

	  },
		//数组转化规划路线
		planRoute(){
			let $v=this;
			$v.resQuar.forEach(item => {
				let planObj=new AMap.LngLat(item.lng,item.lat)
				$v.planRouteArr.push(planObj)
				$v.startingPoint=$v.planRouteArr[0]
				$v.end=$v.planRouteArr[$v.planRouteArr.length-1]
			})
		},
		//完成排线
		finishLine(){
			let $v=this;
			console.log($v.resQuarId)
			$v.planRoute()
			$v.approachPointArr=$v.planRouteArr.slice(1)
			$v.approachPointArr=$v.approachPointArr.slice(0,$v.approachPointArr.length-1)
			map.clearMap();
			// 根据起终点经纬度规划驾车导航路线
			driving.search($v.startingPoint, $v.end,{
					waypoints:$v.approachPointArr
			}, function(status, result) {
				if (status === 'complete') {
					$v.isFlg=false;
					let params = {user_id:$v.userId,vids:$v.resQuarId};
					$v.apiAxios.setLinePlan(params).then(res => {
						Toast("提交成功!")
					}).catch(err => {
					  Toast(err.errmsg)
					})
					console.log('绘制驾车路线完成')
				} else {
					console.log('获取驾车数据失败：' + result)
				}
			});

		},

      // 实例化地图
      initMap () {
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        // let AMap = this.AMap = window.AMap
        let $this = this
		 map = new AMap.Map('js-container', {});
        map.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           // 定位结果缓存0毫秒，默认：0
            convert: true,           // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        // 显示定位按钮，默认：true
            buttonPosition: 'LB',    // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true ,     // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			zoom: 6,
			resizeEnable: true,
          })

			map.addControl(geolocation)
			geolocation.getCurrentPosition()
			AMap.event.addListener(geolocation, 'complete', function (data) {
			console.log(data)
			$this.formattedAddress=data.formattedAddress
			$this.lat=data.position.lat
			$this.lng=data.position.lng
			$this.$store.commit('changelat',data.position.lat)
			$this.$store.commit('changelng',data.position.lng)
			$this.getMapData()

          }) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', function (data) {
			  if(AMap.UA.ios){
				location.reload()
			  }
            console.log(data)
          }) // 返回定位出错信息
        })
		var autoOptions = {
			input: "tipinput"
		};
		var auto = new AMap.Autocomplete(autoOptions);
		// console.log(auto)

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
					map.setCenter([result.poiList.pois[0].location.lng, result.poiList.pois[0].location.lat]);
					$this.lat=result.poiList.pois[0].location.lat
					$this.lng=result.poiList.pois[0].location.lng
					$this.getMapData()
				})
			})
		});//注册监听，当选中某条记录时会触发
		//构造路线导航类
		driving = new AMap.Driving({
				map: map
		})
      }
    }
  }
  	function loadMapApi(cb){
		var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Driving';
		var jsapi = document.createElement('script');
		jsapi.type = 'text/javascript';
		jsapi.charset = 'utf-8';
		jsapi.src = url;
		document.head.appendChild(jsapi);
		jsapi.onload = cb
	}
</script>

<style lang="css">
  .m-map{ min-height: 400px; position: relative; }
  .m-map .map{ width: 100%!important; }
  .amap-geolocation-con{bottom: 4.28rem!important;}
  .circle div{font-size: 0.469333rem;padding: 0.170666rem 0.341333rem;color: #fff;min-width: 4.266666rem;text-align: center;border-radius: 0.64rem;}
  .amap-logo{display: none!important;}
  .amap-copyright{display: none!important;}
	#search{position: absolute;width: 100%;height: 1.877333rem;background: #fff;z-index: 1;}
	#search #tipinput{width:13.6rem;height:1.493333rem;border-radius:0.746666rem;background:rgba(246,246,246,1);outline: none;border: none;margin-top: 0.213333rem;padding-left: 1.493333rem;margin-left: 0.512rem;}
	.scarchIcon{width: 0.64rem;height: 0.64rem;background: url(../../assets/scarch.png) no-repeat;background-size: 100% 100%;position: absolute;top: 0.66rem;left: 1rem;}
	.secBtn{width:3.413333rem;height:1.493333rem;background:rgba(255,255,255,1);box-shadow:0px 0.042666rem 0.085333rem 0px rgba(54,153,255,0.2);border-radius:0.746666rem;color: #3699FF;font-size: 0.597333rem;text-align: center;line-height: 1.493333rem;position: absolute;right: 0.4rem;top: 0.2rem;}
	.btnList{position: absolute;top: 4rem;font-size: 0.597333rem;z-index: 1;color: #3699FF;padding: 0 0.512rem;}
	.num{background-color: blue; color: #fff;}
	.btnList-screen{width: 100%;height: 1.877333rem;font-size: 0.8rem;line-height: 1.877333rem;position: absolute;top: 1.877333rem;z-index: 1;display: flex;justify-content: space-around;}
	.btnList-screen-platform{width: 40%;height: 1.877333rem;color: #3699FF;text-align: center;background-color: #fff}
	.btnList-screen-customer{width: 40%;height: 1.877333rem;color: #3699FF;text-align: center;background-color: blue}
	.btnList-screen-platform-list{background-color: #fff;height: 1.277333rem;line-height:  1.277333rem;font-size: 0.597333rem;border-bottom: 0.01rem #000 solid}
	.wiring{text-align: center;line-height: 1.49333rem;width:4.266666rem;height:1.493333rem;background:rgba(255,255,255,1);box-shadow:0px 0.128rem 0.128rem 0px rgba(54,153,255,0.2);border-radius:0.746666rem;}
	.btnActive{background:rgba(54,153,255,1);color: #fff;border-radius:0.213333rem;}
	.btnList2{position: absolute;bottom: 2.2rem;font-size: 0.597333rem;z-index: 1;color: #3699FF;padding: 0 0.512rem;}
	.workPlan{width:4.266666rem;height:1.493333rem;box-shadow:0px 0.128rem 0.128rem 0px rgba(54,153,255,0.2);text-align: center;line-height: 1.493333rem;color: #3699FF;background: #fff;float: left;margin-right: 1.088rem;}
	.finishLine{width:4.266666rem;height:1.493333rem;background:rgba(54,153,255,1);box-shadow:0px 0.128rem 0.128rem 0px rgba(54,153,255,0.2);border-radius:0.746666rem;text-align: center;line-height: 1.493333rem;color: #fff;float: left;}
	.visiting-record-model{ width: 100%; background: #fff; position: fixed; bottom: 2.090666rem; left: 0; z-index: 99999; padding: 0.723404rem 0.531914rem 0.851063rem 0.553191rem; box-sizing: border-box; border-radius:0.426666rem 0.426666rem 0px 0px; font-size: 0.595744rem; color: #333; }
 	.visiting-record-model-title{ font-size: 0.680851rem; color: #333; font-weight: 600; margin-bottom:0.382978rem; display: flex;}
 	.visiting-record-model-address{ color: #666;display: flex; margin-bottom: 0.553191rem;}
 	.visiting-record-model-address>div{ width: 2.553191rem; margin-right: 0.553191rem;}
 	.visiting-record-model-address>span{color: #333;}
 	.building-type{ display: flex; margin-bottom: 0.553191rem;}
 	.building-type>div{ width: 50%;}
 	.building-type>div>span{ margin-left: 0.765957rem;}
 	.visiting-record-model-time{ display: flex; margin: 0.340425rem 0;}
 	.visiting-record-model-time span{ margin-left: 0.553191rem;}
 	.visiting-record-model-btn{ width: 5.531914rem; height: 1.489361rem; line-height: 1.489361rem; text-align: center; margin: 0 auto; border:0.042553rem solid rgba(54,153,255,1); border-radius:35px; color: #3699FF; margin-top: 0.851063rem; }
 	.navigation-btn{ width: 2.553191rem; height: 1.063829rem; line-height: 1.063829rem; border:0.042553rem solid rgba(54,153,255,1); border-radius:25px; color: #3699FF; text-align: center; position: absolute; top: 0.531914rem; right: 0.510638rem;}
 	.visiting-record-model-title>div{  color: #999; border:1px solid rgba(153,153,153,1); border-radius:8px; text-align: center; font-size: 0.255319rem; font-weight: 400; margin-left: 0.510638rem; padding: 0.042553rem 0.148936rem;}
	.addGroups{width: 1.633rem;height: 1.633rem;background: url(../../assets/add.png) no-repeat;background-size: 100% 100%;bottom: 3rem;right: 1rem;position: absolute;}


</style>
