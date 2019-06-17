<template>
	<div>
		<div style="position: fixed;top: 0;background: #fff;">
			<ul class="headLibe clear-fix">
				<li v-for="(v,i) in tageList" @click="clickTag(tageList[i].tag_id,i)" :class="v.is_checked==true?'headActive':''">{{v.tag_words}}  {{v.tag_nums}} <div class="delIcon" v-if="i!=0" @click.stop="delFn(v.tag_id)"></div></li><li @click="mask" style="padding: 0.28rem 0.704rem;">+</li>
			</ul>
			<div class="search_warp">
				<div class="switch_city" @click="switchCityClick()">{{city}}</div>
				<div class="search"><div class="iconImg"></div><input type="text" class="searchIpt" value="" v-model="keWords" placeholder="搜索标签/微信昵称" /><div class="searchBtn" @click="search">搜索</div></div>
			</div>
			
			<div class="nav clear-fix" v-if="isNavs==false">
				<div class="navLi1"><span :class="isnav==0?'active':''" @click="changeNav(0)">团长({{groupersNum}}人)</span></div>
				<div class="navLi1"><span :class="isnav==1?'active':''" @click="changeNav(1)">离线人脉({{recommendGroupersNum}}人)</span></div>
			</div>
			<div class="nav clear-fix" v-if="isNavs">
				<div class="navLi"><span :class="isnav==0?'active':''" @click="changeNav(0)">团长({{groupersNum}}人)</span></div>
				<div class="navLi"><span :class="isnav==1?'active':''" @click="changeNav(1)">离线人脉({{recommendGroupersNum}}人)</span></div>
				<div class="navLi"><span :class="isnav==2?'active':''" @click="changeNav(2)">微信群({{groupsNum}}个)</span></div>
			</div>
		</div>
		<div style="height:6.05rem;background: #fff;"></div>
		
		<ul class="pepList" v-if="isnav==0 ">
			<li v-for="(v,i) in groupersList" @click="toGroupers(v.wx_id,v.user_rank)">
				<div><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" alt="" :onerror="$store.state.errorGoodsImg"></div>
				<div>{{v.nickname}}</div>
				<div></div>
				<div>{{v.user_rank}}</div>
				<!-- <div></div> -->
			</li>
			<div class="loadMore" @click="loadMore">{{moreMsg}}</div>
		</ul>
		<ul class="pepList2" v-if="isnav==1">
			 <!-- @click="toGroupers(v.wx_id,v.user_rank)" -->
			<li v-for="(v,i) in recommendGroupersList">
				<div><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img" alt="" :onerror="$store.state.errorGoodsImg"></div>
				<div>{{v.nickname}}</div>
				<div></div>
				<div>{{v.user_rank/10}}</div>
				<!-- <div></div> -->
			</li>
			<div class="loadMore" @click="loadMore">{{moreMsg}}</div>
		</ul>
		<ul class="pepList1" v-if="isnav==2">
			<li v-for="(v,i) in groupsList" @click="toGroup(groupsList[i].room_wxid)">
				<div><img :src="v.head_img==''?$store.state.errorGoodsImg:v.head_img"  :onerror="$store.state.errorGoodsImg"></div>
				<div v-if="v.group_name!=''">{{v.group_name}}</div>
				<div v-else>未设置</div>
				<!-- <div></div> -->
			</li>
			<div class="loadMore" @click="loadMore">{{moreMsg}}</div>
		</ul>
		<div style="height:2rem"></div>
		<Tabnav></Tabnav>
		<div class="maskBg" v-if="maskShow"> <div @click.stop="maskNo" class="clickMask"></div> <div class="masks"><input type="text" class="labe" v-model="labeText" placeholder="请输入标签名"><div class="btnSub g-pointer" @click.stop="btnSubs">提交</div></div></div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import Tabnav from "../tabNav/tebNav"
export default {
  name: "netEng",
  data() {
    return {
		isnav:0,
		lat:'',
		lng:'',
		maskShow:false,
		tageList:[{tag_id:'0',tag_nums:'',tag_words:'全部',is_checked:true}],
		city_id:'',
		groupersList:[],
		groupsList:[],
		page:1,
		labeText:'',
		tag_id:'0',
		type:'1',
		groupersNum:"0",
		groupsNum:"0",
		moreMsg:"加载更多",
		isNavs:false,
		userid:"",
		keWords:"",
		isserch:true,
		city:'',
		cityId:'',
		recommendGroupersList:[],
		recommendGroupersNum:""
    }
  },
  components:{
        Tabnav:Tabnav
  },
  created:function(){
  	//this.onApiLoaded()
  	this.cityId=this.$route.query.cityId;
  	let selectCity=window.localStorage.getItem("selectCity"),
  	    locationCity=window.localStorage.getItem("locationCity");
  	    this.city=selectCity?selectCity:locationCity;
  	let city=this.city?'（'+this.city+'）':''
    if(!this.city && !this.cityId){
  		this.getCityList()
  	}
  	document.title='人脉引擎'+city
	this.userid = window.localStorage.getItem("userMapId");
  	this.getTags()
  	this.getGroupers()
  	// this.getGroups()

  	this.getRecommendGroupers()
  },
  watch:{
  	lat:{
  		handler(newName, oldName) {
  		  this.getCity()
  		}
  	}
  },
  methods:{
  	getCityList(){   //获取城市列表
		let $v=this;
		$v.apiAxios.getCitys().then(res => {
			console.log(res)
			if(res.errcode==0){
				if(!$v.city && !$v.cityId){
					$v.city=res.result[0].city_name
					$v.cityId=res.result[0].city_id
				}
			}
		}).catch(err => {
		  Toast(err.msg)
		})
	},
  	switchCityClick(){     //切换城市点击事件
  		this.$router.push({path:'./switchcity'});
  	},
  	changeNav:function(i){
  		this.isnav=i;
  		this.page=1
		this.moreMsg="加载更多"
  		if(i==0){
  			this.groupersList=[]
  			this.getGroupers()
  			this.type=1
  		}else if(i==1){
			this.recommendGroupersList=[]
  			this.getRecommendGroupers()
  		}else if(i==2){
  			this.groupsList=[]
  			this.getGroups()
  			this.type=2
  		}
  	},
  	onApiLoaded:function(){
  		var $vm=this;
  		var map = new AMap.Map('container', {
  			zoom: 11
  		});
  		map.plugin(["AMap.ToolBar"], function() {
  			map.addControl(new AMap.ToolBar());
  		});
  		map.plugin('AMap.Geolocation', function () {
  			geolocation = new AMap.Geolocation({
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
  			AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
  			AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
  		});
  		function onComplete(data){   //定位成功
  			$vm.lat=data.position.lat
  			$vm.lng=data.position.lng
  		};
  		function onError(data){      //定位失败
  			
  		};
  	},
	//获取顶部标签
  	getTags:function(){
		let $v=this,
		params = {
		  user_id:$v.userid
		};
		$v.apiAxios.getTags(params).then(res => {
		  $v.tageList=$v.tageList.concat(res.result)
		}).catch(err => {
		  //Toast(err.msg)
		})
  	},
	//获取城市暂时没用到用的时候再改
  	getCity:function(){
  		var $vm = this;
  		axios.get(baseUrl + 'connection/get_city', {params: { 'lat': $vm.lat,'lng':$vm.lng }}).then(function(res) {
  			if(res.data.errcode==0){
  				$vm.city_id=res.data.result.city_id
  				document.title = '人脉引擎('+res.data.result.city_name+')'
  				$vm.getGroupers()
  				$vm.getGroups()
  			}
  		})
  	},
  	getGroupers:function(){
		let $v=this,
		params = {city_id:$v.cityId,tag_id:$v.tag_id, page_id:$v.page,page_nums:'10',kew:$v.keWords};
		$v.apiAxios.getGroupers(params).then(res => {
			$v.groupersNum=res.result.count
			$v.groupersList=$v.groupersList.concat(res.result.data)
		}).catch(err => {
		  //Toast(err.msg)
		  $v.moreMsg="已经到底了"
		  if($v.groupersList.length==0){
		  	$v.moreMsg="暂无数据"
		  }
		})
  	},
	getRecommendGroupers:function(){
		let $v=this,
		params = {city_id:'',tag_id:$v.tag_id, page_id:$v.page,page_nums:'10',kew:$v.keWords};
		$v.apiAxios.getRecommendGroupers(params).then(res => {
			$v.recommendGroupersNum=res.result.count
			$v.recommendGroupersList=$v.recommendGroupersList.concat(res.result.data)
		}).catch(err => {
		  //Toast(err.msg)
		  $v.moreMsg="已经到底了"
		  if($v.recommendGroupersList.length==0){
		  	$v.moreMsg="暂无数据"
		  }
		})
	},
  	getGroups:function(){
		let $v=this,
		params = {city_id:$v.cityId,tag_id:$v.tag_id, page_id:$v.page,page_nums:'10',kew:$v.keWords};
		$v.apiAxios.getGroups(params).then(res => {
			$v.groupsNum=res.result.count
			$v.groupsList=$v.groupsList.concat(res.result.data)
		}).catch(err => {
		  //Toast(err.msg)
		  $v.moreMsg="已经到底了"
		  if($v.groupsList.length==0){
		  	$v.moreMsg="暂无数据"
		  }
		})
  	},
  	mask:function(){
  		this.maskShow=true
  	},
  	btnSubs:function(){
		let $v=this,
		params = {tag_words:$v.labeText,user_id:$v.userid};
		$v.apiAxios.addTag(params).then(res => {
			Toast('添加成功')
			$v.maskShow=false
			$v.tageList=[{tag_id:'0',tag_nums:'',tag_words:'全部'}]
			$v.getTags()
		}).catch(err => {
		  Toast(err.errmsg)
		})
  	},
  	maskNo:function(){
  		this.maskShow=false
  	},
  	toGroupers:function(i,s){
  		this.$router.push({path:'./contion',query:{rank:s}});
  		localStorage.setItem('connectid',i)
  	},
  	toGroup:function(i){
  		this.$router.push({path:'./buscen'});
  		localStorage.setItem('group_id',i)
  	},
  	clickTag:function(i,s){
		for(var a=0;a<this.tageList.length;a++){
			this.tageList[a].is_checked=false
		}
		this.tageList[s].is_checked=true
		this.keWords=""
  		this.tag_id=i
		this.page=1
		if(i==0){
			this.isNavs=false
			this.isnav=0
			this.groupersList=[]
			this.getGroupers()
			this.isserch=true
		}else{
			this.isNavs=true
			this.groupersList=[]
			this.recommendGroupersList=[]
			this.groupsList=[]
			this.getGroupers()
			this.getGroups()
			this.getRecommendGroupers()
		}
		this.moreMsg="加载更多"
		
		this.groupersNum="0"
		this.groupsNum="0"
  		
  	},
	loadMore(){
		if(this.moreMsg=="加载更多"){
			this.page++
			if(this.isnav==0){
				this.getGroupers()
			}else{
				this.getGroups()
			}
		}
	},
	search(){
		this.tag_id=0
		this.isNavs=true
		this.isserch=false
		this.groupersNum="0"
		this.groupsNum="0"
		this.moreMsg="加载更多"
		this.groupersList=[]
		this.groupsList=[]
		this.getGroupers()
		this.getGroups()
		for(var i=0;i<this.tageList.length;i++){
			this.tageList[i].is_checked=false
		}
	},
	delFn(i){
		let $v=this,
		params = {tag_id:i,user_id:$v.userid};
		$v.apiAxios.delFn(params).then(res => {
			Toast('删除成功')
			$v.maskShow=false
			$v.tageList=[{tag_id:'0',tag_nums:'',tag_words:'全部'}]
			$v.getTags()
		}).catch(err => {
		  Toast(err.errmsg)
		})
	}
  }
};
</script>

<style type="text/css" scoped="scoped">
	html{font-size: 20px;}
	.headLibe{padding: 0.405333rem 0.426666rem;box-shadow:0px 0.042666rem 0.085333rem 0px rgba(204,204,204,0.2);}
	.headLibe li{font-size: 0.597333rem;color: #3699FF;border: 1px solid #3699FF;min-width: 1.28rem;padding: 0.234666rem 0.704rem;float: left;border-radius:1.066666rem;margin: 0 0.426666rem 0.234666rem 0.426666rem;text-align: center;position: relative;}
	.delIcon{width: 0.64rem;height: 0.64rem;background: url(../../assets/del.png) no-repeat;background-size: 100% 100%;position: absolute;top: -0.2rem;right: -0.2rem;}
	.headActive{color: #fff!important;background: #3699FF!important;}
	.search{padding: 0.426666rem 0.512rem;position: relative;}
	.searchIpt{width: 7.085106rem;height: 1.493333rem;padding-left: 1.493333rem;padding-right: 0.426666rem;background:rgba(246,246,246,1);border-radius:0.746666rem;outline: none;border: none; margin-right: 0.319148rem;}
	.iconImg{width: 0.64rem;height: 0.64rem;background: url(../../assets/scarch.png) no-repeat;background-size: 100% 100%;position: absolute;top: 0.86666rem;left: 1rem;}
	.searchBtn{width:2.553191rem;height:1.493333rem;background:rgba(255,255,255,1);box-shadow:0px 0.042666rem 0.085333rem 0px rgba(54,153,255,0.2);border-radius:0.746666rem;float: right;font-size: 0.597333rem;color: #3699FF;text-align: center;display: flex;justify-content:center;align-items:Center;}
	.nav{font-size: 0.597333rem;color: #999;text-align: center;height: 1.2rem;}
	.nav .navLi{text-align: center;float: left;width: 33.33%;}
	.nav .navLi span{padding-bottom: 0.213333rem;}
	.nav .navLi1{text-align: center;float: left;width: 50%;}
	.nav .navLi1 span{padding-bottom: 0.213333rem;}
	.active{border-bottom: 0.085333rem solid #3699FF;}
	.pepList{margin-top: 0.426666rem;overflow: auto;}
	.pepList li{height: 2.133333rem;padding: 0 0.512rem;font-size: 0.597333rem;color: #333;background: #fff;}
	.pepList li div{float: left;line-height: 2.133333rem;height: 100%;}
	.pepList li div:nth-child(1){width:1.493333rem;height:1.493333rem;border-radius:50%;margin: 0rem 0.512rem 0 0;}
	.pepList li div:nth-child(1) img{width:1.493333rem;height:1.493333rem;border-radius:50%;}
	.pepList li div:nth-child(2){width: 7.637333rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.pepList li div:nth-child(3){width: 0.853333rem;height: 0.853333rem;background: url(../../assets/heat.png) no-repeat;background-size: 100% 100%;margin: 0.53333rem 0.234666rem 0 0;}
	.pepList li div:nth-child(4){width: 3.1rem;}
	.pepList li div:nth-child(5){width: 0.853333rem;height: 0.853333rem;background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;margin: 0.53333rem 0.234666rem 0 0;}
	.pepList2{margin-top: 0.426666rem;overflow: auto;}
	.pepList2 li{height: 2.133333rem;padding: 0 0.512rem;font-size: 0.597333rem;color: #333;background: #fff;}
	.pepList2 li div{float: left;line-height: 2.133333rem;height: 100%;}
	.pepList2 li div:nth-child(1){width:1.493333rem;height:1.493333rem;border-radius:50%;margin: 0rem 0.512rem 0 0;}
	.pepList2 li div:nth-child(1) img{width:1.493333rem;height:1.493333rem;border-radius:50%;}
	.pepList2 li div:nth-child(2){width: 7.637333rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.pepList2 li div:nth-child(3){width: 0.853333rem;height: 0.853333rem;background: url(../../assets/heatGr.png) no-repeat;background-size: 100% 100%;margin: 0.53333rem 0.234666rem 0 0;}
	.pepList2 li div:nth-child(4){width: 3.1rem;}
	.pepList2 li div:nth-child(5){width: 0.853333rem;height: 0.853333rem;background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;margin: 0.53333rem 0.234666rem 0 0;}
	.pepList1{margin-top: 0.426666rem;overflow: auto;}
	.pepList1 li{height: 2.133333rem;padding: 0 0.512rem;font-size: 0.597333rem;color: #333;}
	.pepList1 li div{float: left;line-height: 2.133333rem;height: 100%;}
	.pepList1 li div:nth-child(1){width:1.493333rem;height:1.493333rem;border-radius:50%;margin: 0rem 0.512rem 0 0;}
	.pepList1 li div:nth-child(1) img{width:1.493333rem;height:1.493333rem;border-radius:50%;}
	.pepList1 li div:nth-child(2){width: 11rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
	.pepList1 li div:nth-child(3){float: right;width: 0.853333rem;height: 0.853333rem;background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;margin: 0.53333rem 0.234666rem 0 0;}
	.masks{text-align: center;background: #fff;padding-bottom: 2rem;position: absolute;bottom: 0;width: 100%;}
	.labe{margin-top: 1.5rem;width:11.093333rem;height:1.493333rem;background:rgba(246,246,246,1);border-radius:0.746666rem;outline: none;border: none;padding: 0 0.512rem;color: #333;}
	.btnSub{margin: 0 auto;margin-bottom: 1rem;margin-top: 1rem;width:11.093333rem;height:1.493333rem;text-align: center;line-height: 1.493333rem;font-size: 0.682666rem;background: #3699FF;border-radius: 0.213333rem;padding: 0 0.512rem;color: #fff;}
	.maskBg{position: fixed;width: 100%;height: 100%;top: 0;background: rgba(0,0,0,0.5);}
	.clickMask{width: 100%;height: 21rem;}
	.loadMore{height: 2rem;line-height: 2rem;width: 100%;font-size: 0.597333rem;color: #999;text-align: center;}
	.search_warp{ display: flex;}
	.switch_city{ width: 2.553191rem; color: #3699FF; font-size: 0.595744rem; line-height: 1.489361rem; padding: 0.426666rem 0; padding-left: 0.531914rem;}
</style>
