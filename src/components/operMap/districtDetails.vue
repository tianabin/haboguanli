<template>
	<div class="app" :style="'min-height:'+sHeight+'px'">
		<div class="infoVil clear-fix">
			<div class="title clear-fix">
				<div>{{infoVis.name}}</div>
				<div>
					<p class="p1" v-if="infoVis.is_collection==0" @click="fllow(1)"></p>
					<p class="p2" v-else @click="fllow(2)"></p>
				</div>
				<div @click="navigation(infoVis.lat,infoVis.lng,infoVis.address)">导航</div>
				<div @click="isMaskBlo()">拜访</div>
			</div>
			<div class="address clear-fix">
				<div class="chColor">地址</div>
				<div>{{infoVis.address}}</div>
			</div>
			<div class="clear-fix infolist">
				<div class="chColor">建筑类型</div>
				<div>{{infoVis.type}}</div>
				<div class="chColor">楼栋总数</div>
				<div>{{infoVis.tung}}</div>
			</div>
			<div class="clear-fix infolist">
				<div class="chColor">物业费用</div>
				<div>{{infoVis.wprice}}</div>
				<div class="chColor">房屋总数</div>
				<div>{{infoVis.households}}</div>
			</div>
			<div class="clear-fix infolist">
				<div class="chColor">物业公司</div>
				<div style="width: 11rem;">{{infoVis.property}}</div>
			</div>
			<!-- <div class="clear-fix infolist">
				<div class="chColor">开发公司</div>
				<div style="width: 11rem;">云店互联</div>
			</div> -->
		</div>
		<div class="clear-fix" style="margin-top: 0.341333rem;background: #fff;padding-top: 0.4rem;padding-bottom: 0.4rem;">
			<div class="chColor fl" style="margin-left: 0.512rem;">当前位置</div>
			<div style="width: 11rem;margin-left: 0.5rem;" class="fl">{{address}}</div>
		</div>
		<div class="regCom">
			<div class="regTit">小区团长</div>
			<ul class="clear-fix" style="overflow-y: auto;max-height: 5.8rem;">
				<li v-for="v in have_list" style="margin-bottom: 0.2rem;position: relative;" @click="toInfo(v.id)">
					<div class="delIcon" @click.stop="delIcon(v.id)"></div>
					<img :src="v.header_url==''?$store.state.errorGoodsImg:v.header_url" :onerror="$store.state.errorGoodsImg" alt="">
					<div>{{v.user_name}}</div>
				</li>
			</ul>
		</div>
		<div class="regCom1">
			<div class="regTit1 clear-fix"><div class="fl">附近团长</div><div class="fr" style="color: #3699FF;font-weight: 500;" @click="toAddGroup()">添加团长</div></div>
			<ul style="height: 12rem;overflow-y: auto;">
				<li class="clear-fix" v-for="(v,i) in no_list" @click="isCheck(i)">
					<div class="check"><img src="../../assets/checkTrue.png" v-if="v.is_checked==true"> <div class="iconCheckN" v-else></div> </div>
					<div class="headImg"><img :src="v.header_url==''?$store.state.errorGoodsImg:v.header_url" :onerror="$store.state.errorGoodsImg" alt=""></div>
					<div>
						<p>{{v.user_name}}</p>
						<p class="chColor inAddress">地址：{{v.address}}</p>
					</div>
				</li>
			</ul>
			<div class="submitBtns" @click="setVillageGrouper()">确定</div>
		</div>
		<div class="mask" v-if="isMask" >
			<div class="maskBox">
				<div class="clear-fix list">
					<div class="fl">小区反馈</div>
					<div class="fr">
						<select name="public-choice" v-model="isEff">                                        
							<option :value="v.id" v-for="v in eff" >{{v.name}}</option>                                    
						</select>
					</div>
				</div>
				<div class="clear-fix list">
					<div>反馈详情</div>
				</div>
				<div class="textAre">
					<textarea value="" placeholder="请输入反馈信息" v-model="count"/>
				</div>
				<div style="font-size: 0.597333rem;padding: 0 0.512rem;background: #fff;">
					<div>{{addressMine}}</div>
				</div>
				<div>
					<div class="submitBtn fr" @click="commanderSignIn">提交</div>
					<div class="fl submitBtn1" @click.stop="isMask=false">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var map=null
	import { Toast,Indicator } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		components:{
		    Tabnav:Tabnav
		},
		data(){
			return{
				sHeight:'',
				infoVis:{},
				no_list:[],
				have_list:[],
				vid:"",
				address:"",
				userId:"",
				gidsArr:[],
				isEff:'1',
				eff:[
					{
						id: '1',
						name: '已有团长'
					},
					{
						id: '2',
						name: '跑过暂无'
					},
					{
						id: '3',
						name: '暂时放弃'
					}
				],
				isMask:false,
				count:"",
				addressMine:"",
				lat:"",
				lng:"",
				status:""
			}
		},
		created(){
			this.sHeight=document.documentElement.clientHeight
			this.userId = window.localStorage.getItem("userMapId");
			this.vid=this.$route.query.id
			this.address=this.$route.query.address
			document.title = '小区详情'
			this.getMapVillage()
			this.getVilGrouper()
			loadMapApi()
		},
		methods:{
			getMapVillage(vid){
				let $v=this,
				params = {vid:$v.vid,user_id:$v.userId};
				$v.apiAxios.getMapVillage(params).then(res => {
					$v.infoVis=res.result.info;
					// $v.infoVisList=res.result.list;
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
			getVilGrouper(){
				let $v=this,
				params = {vid:$v.vid,user_id:$v.userId};
				$v.apiAxios.getVilGrouper(params).then(res => {
					$v.no_list=res.result.no_list
					$v.have_list=res.result.have_list
					// $v.infoVisList=res.result.list;
				}).catch(err => {
				 
				}) 
			},
			toAddGroup(){
				this.$router.push({path:'./addhead',query:{id:this.infoVis.id,lat:this.infoVis.lat,lng:this.infoVis.lng,name:this.infoVis.name}});
			},
			isCheck(i){
				this.no_list[i].is_checked=!this.no_list[i].is_checked
				if(this.no_list[i].is_checked){
					this.gidsArr.push(this.no_list[i].id)
				}else{
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
					this.gidsArr.remove(this.no_list[i].id);
				}
			},
			setVillageGrouper(){
				let $v=this,
				params = {vid:$v.vid,gids:$v.gidsArr,user_id:$v.userId};
				$v.apiAxios.setVillageGrouper(params).then(res => {
					Toast('提交成功')
					$v.getVilGrouper()
				}).catch(err => {
				 Toast(err.errmsg)
				}) 
			},
			isMaskBlo(){
				this.mapInit()
			},
			mapInit(){
				Indicator.open({
				  text: '获取定位中...',
				  spinnerType: 'fading-circle'
				});
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
						console.log(data)
						_this.addressMine=data.formattedAddress
						_this.lat=data.position.lat
						_this.lng=data.position.lng
						Indicator.close();
						Toast('定位成功')
						_this.isMask=true
					});//返回定位信息
					AMap.event.addListener(geolocation, 'error', function(data){
						console.log(data)
						Toast('定位失败')
					});      //返回定位出错信息
				});
			},
			commanderSignIn(){
				let $v=this,
				params = {vid:$v.vid,user_id:$v.userId,lng:$v.lng,lat:$v.lat,address:$v.addressMine,msg:$v.count,visittype:$v.isEff};
				$v.apiAxios.setBdVillage(params).then(res => {
					Toast('提交成功')
					$v.isMask=false
				}).catch(err => {
				 Toast(err.errmsg)
				}) 
			},
			setBdCollection(i){
				let $v=this,
				params = {target_id:$v.vid,user_id:$v.userId,type:'2',status:$v.status};
				$v.apiAxios.setBdCollection(params).then(res => {
					if($v.status==1){
						$v.infoVis.is_collection=1
						Toast('收藏成功')
					}else{
						$v.infoVis.is_collection=0
						Toast('取消成功')
					}
					$v.isMask=false
				}).catch(err => {
				 Toast(err.errmsg)
				}) 
			},
			fllow(i){
				this.status=i
				this.setBdCollection()
			},
			toInfo(i){
				this.$router.push({path:'./personalinfo',query:{id:i}});
			},
			delIcon(id){
				let $v=this,
				params = {gid:id};
				$v.apiAxios.cancelVillageGrouper(params).then(res => {
					$v.getVilGrouper()
					Toast('取消成功')
				}).catch(err => {
				 Toast(err.errmsg)
				}) 
			}
		}
	}
	function loadMapApi(cb){
	  var url = 'https://webapi.amap.com/maps?v=1.4.13&key=35bf0bb1d592ea42899c41e2565ca5ac';
	  var jsapi = document.createElement('script');
	  jsapi.charset = 'utf-8';
	  jsapi.src = url;
	  document.head.appendChild(jsapi);
	  jsapi.onload = cb
	}
</script>

<style scoped="scoped">
	.app{background: #F9F9F9;font-size: 0.597333rem;overflow: hidden;}
	.infoVil{margin-top: 0.341333rem;padding: 0 0.512rem;background: #fff;}
	.title{float: left;width: 100%;margin-top: 0.426666rem;}
	.title div:nth-child(1){float: left;font-size: 0.682666rem;color: #333;font-weight:600;width: 6.4rem;line-height: 0.9rem;}
	.title div:nth-child(2){float: right;}
	.title div:nth-child(2) .p1{background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;}
	.title div:nth-child(2) .p2{background: url(../../assets/collectionAc.png) no-repeat;background-size: 100% 100%;}
	.title div:nth-child(2) p{width: 0.853333rem;height: 0.853333rem;margin: 0.25rem 0 0 0.3rem;}
	.title div:nth-child(3){margin-top: 0.085333rem;border-radius: 0.533333rem;float: right;width: 2.56rem;height: 1.066666rem;text-align: center;line-height: 1.066666rem;border: 1px solid #3699FF;font-size: 0.597333rem;color: #3699FF;}
	.title div:nth-child(4){margin-top: 0.085333rem;border-radius: 0.533333rem;float: right;width: 2.56rem;height: 1.066666rem;text-align: center;line-height: 1.066666rem;border: 1px solid #3699FF;font-size: 0.597333rem;color: #3699FF;}
	.title div:nth-child(4){margin-right: 0.512rem;}
	.address{height: 1.28rem;line-height: 1.28rem;}
	.address div{float: left;}
	.chColor{color: #666666;}
	.address div:nth-child(1){width: 2.986666rem;}
	.address div:nth-child(2){width: 11.986666rem;overflow:hidden; /*超出的部分隐藏起来。*/ white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis;/* 支持 IE */}
	.infolist{height: 1.28rem;line-height: 1.28rem;background: #fff;}
	.infolist div{float: left;width: 3rem;}
	.infolist div:nth-child(2){width: 4rem;overflow:hidden; /*超出的部分隐藏起来。*/ white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis;/* 支持 IE */}
	.infolist div:nth-child(4){width: 4rem;}
	.regCom{padding: 0 0.512rem;background: #fff;margin-top: 0.341333rem;padding-bottom: 0.682666rem;}
	.regTit{height: 1.706666rem;line-height: 1.706666rem;font-size: 0.682666rem;font-weight: 600;color: #333;}
	.regCom li{width: 3.44rem;text-align: center;float: left;}
	.regCom li img{width: 1.706666rem;height: 1.706666rem;border-radius: 50%;}
	.regCom li div{margin-top: 0.341333rem;font-size: 0.597333rem;overflow:hidden; /*超出的部分隐藏起来。*/ white-space:nowrap;/*不显示的地方用省略号...代替*/text-overflow:ellipsis;/* 支持 IE */}
	.regCom1{padding: 0 0.512rem;background: #fff;margin-top: 0.341333rem;padding-bottom: 0.682666rem;}
	.regTit1{height: 1.706666rem;line-height: 1.706666rem;font-size: 0.682666rem;font-weight: 600;color: #333;}
	.regCom1 ul li div{float: left;}
	.regCom1 ul li{padding: 0.313333rem 0;}
	.regCom1 ul li .headImg{width: 1.706666rem;height: 1.706666rem;margin-right: 0.341333rem;}
	.regCom1 ul li .headImg img{width: 1.706666rem;height: 1.706666rem;border-radius: 50%;}
	.regCom1 ul li .check{margin-right: 0.341333rem;margin-top: 0.404rem;}
	.regCom1 ul li .check img{width: 0.725333rem;height: 0.725333rem;}
	.iconCheckN{width: 0.65333rem;height: 0.65333rem;border: 1px solid #ccc;border-radius: 50%;margin-top: 0.1rem;}
	.inAddress{width: 11rem;}
	.submitBtns{width:5.546666rem;height:1.493333rem;border-radius:0.746666rem;text-align: center;line-height: 1.493333rem;color: #3699FF;font-size: 0.597333rem;border:1px solid rgba(54,153,255,1);margin: 1rem auto;}
	.mask{width: 100%;height: 100%;background: rgba(0,0,0,0.5);position: fixed;top: 0;}
	.maskBox{width:13.952rem;height:10.922666rem;background:rgba(255,255,255,1);border-radius:0.426666rem;padding: 0.512rem;margin: 0 auto;margin-top: 40%;}
	.list{height: 1.493333rem;line-height: 1.493333rem;font-size: 0.597333rem;padding: 0 0.512rem;background: #fff;}
	select {color: #3699FF;/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/border: none;/*很关键：将默认的select选择框样式清除*/appearance:none;-moz-appearance:none;-webkit-appearance:none;/*在选择框的最右侧中间显示小箭头图片*/background: url(../../assets/jiao.png) no-repeat right 0.170666rem / 0.256rem auto; ;/*为下拉小箭头留出一点位置，避免被文字覆盖*/padding-right: 14px;outline: none;}
	/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
	select::-ms-expand { display: none; }
	.textAre{width: 100%;background: #fff;text-align: center;}
	textarea{width:12.928rem;height:1.962666rem;background:rgba(249,249,249,1);border-radius:0.213333rem;border: none;outline: none;padding: 0.512rem;}
	.submitBtn{margin-right: 1rem;width:5.546666rem;height:1.493333rem;background:rgba(54,153,255,1);border-radius:0.746666rem;margin-top: 1rem;text-align: center;line-height: 1.493333rem;color: #fff;font-size: 0.682666rem;}
	.submitBtn1{margin-left: 1rem;width:5.546666rem;height:1.493333rem;background:#ccc;border-radius:0.746666rem;margin-top: 1rem;text-align: center;line-height: 1.493333rem;color: #fff;font-size: 0.682666rem;}
	.delIcon{width: 0.64rem;height: 0.64rem;background: url(../../assets/del.png) no-repeat;background-size: 100% 100%;position: absolute;top: -0.4rem;right: 0.6rem;}




</style>
