<template>
	<div class="app" :style="'height:'+sHeight+'px'">
		<div class="wrap">
			<div class="herder">
				<div class="header_lf">
					<img :src="data.header_url"/>
				    <div>{{data.wx_name}}</div>
				</div>
				<div class="herder_rit">
					<div @click="toEditInfo">编辑</div>
					<div @click="toVisi">拜访</div>
				</div>
			</div>
			<div class="open_btn">
				<div @click="toQrCode">开通业务</div>
				<div @click="toOpenHub">开通哈勃</div>
				<div style="background: none;width: 2rem;">
					<p class="p1" v-if="data.is_collection==0" @click="fllow(1)"></p>
					<p class="p2" v-else @click="fllow(2)"></p>
				</div>
			</div>
			<div class="info_div"><div>联系人</div><div>{{data.user_name}}</div></div>
			<div class="info_div"><div>联系方式</div><div>{{data.telphone}}</div></div>
			<div class="info_div"><div>小区</div><div>{{data.cummunity_name}}</div></div>
			<div class="info_div" style="margin-bottom: 0.340425rem;"><div>身份</div><div>{{identity}}</div></div>
			
			<div class="info_div"><div>类型</div><div>{{data.type}}</div></div>
			<div class="info_div"><div>店名</div><div>{{data.store_name}}</div></div>
			<div class="info_div" style="margin-bottom: 0.340425rem;"><div>详细地址</div><div>{{data.address}}</div></div>
			<div class="info_div"><div>拜访记录</div><div><img src="../../assets/jiao.png"/></div></div>
			<div class="info_div" ><div>周边信息</div><div><img src="../../assets/jiao.png"/></div></div>
			<div class="info_div" @click="toconnectid" style="margin-bottom: 0.340425rem;"><div>人脉分析</div><div><img src="../../assets/jiao.png"/></div></div>
			<div class="info_div" @click="toxiaoqu"><div style="width: 50%;">团长联盟成员信息采集</div><div><img src="../../assets/jiao.png"/></div></div>
			<div class="info_div" @click="supinfo"><div style="width: 50%;">补充信息</div><div><img src="../../assets/jiao.png"/></div></div>
			<div class="door_photo">
				<div class="door_photo_test">门头照</div>
				<div class="door_photo_img">
					<img   :src="data.logo"/>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import { Toast  } from 'mint-ui'
	import Tabnav from "../tabNav/tebNav"
	export default{
		data(){
			return{
				id:'',
				user_id:window.localStorage.getItem('userMapId'),
				erp_user_id:window.localStorage.getItem('erp_user_id'),
				data:{},
				identity:''
			}
		},
		created(){
			this.id=this.$route.query.id;
			this.sHeight=document.documentElement.clientHeight
			document.title = '团长信息'
			this.getCommanderInfo()
		},
		  mounted(){
			mui.back = function() {
				window.history.go(-1);
			}
		},
		methods:{
			toEditInfo(){  
				this.$router.push({path:'./editpersonalinfo',query:{id:this.id}});
			},
			toxiaoqu(){
				// this.$router.push({path:'./districtdetails',query:{id:i,address:this.formattedAddress}});
				window.location.href='https://btj.yundian168.com/addinfo.php?id='+this.id+'&uid='+this.user_id
			},
			supinfo(){
				console.log(this.data)
				window.location.href='https://btj.yundian168.com/supplement.php?tel='+this.data.telphone
			},
			toconnectid(){
				if(this.data.wxid=='' || this.data.wxid==null){
					Toast('该用户暂未开通人脉分析')
				}else{
					this.$router.push({path:'./contion',query:{rank:this.data.user_rank}});
					localStorage.setItem('connectid',this.data.wxid)
				}
				
			},
			toVisi(){
				this.$router.push({path:'./visitingrecord',query:{id:this.id}});
			},
			toQrCode(){
				if(this.data.open_id=='' || this.data.open_id==null){
					this.$router.push({path:'./qrcode',query:{id:this.id}});
				}else{
					Toast("此用户已经开通")
				}
				
			},
			toOpenHub(){
				if(this.data.open_id=='' || this.data.open_id==null || this.data.union_id=='' || this.data.union_id==null){
					Toast("请先关注公众号")
				}else{
					this.$router.push({path:'./openhub',query:{id:this.id,union_id:this.data.union_id,open_id:this.data.open_id,wx_name:this.data.wx_name}});
				}
				
			},
			getCommanderInfo(){
				let _this=this;
				let params = {user_id:_this.user_id,erp_user_id:_this.erp_user_id,id:_this.id};
				_this.apiAxios.getCommanderInfo(params).then(res => {
					console.log(res)
					if(res.errcode==0){
						if(res.result.logo !=''){
							res.result.logo='https://btjapi.yundian168.com'+res.result.logo
						}
						if(res.result.identity==0){
							_this.identity='团长'
						  }else if(res.result.identity==1){
							_this.identity='店铺'
						  }else if(res.result.identity==2){
							_this.identity='经销商'
						  }else if(res.result.identity==3){
							_this.identity='品牌方'
						  }
						_this.data=res.result
					}
				}).catch(err => {
					Toast(err.errmsg)
				})
			},
			setBdCollection(i){
				let $v=this,
				params = {target_id:$v.data.id,user_id:$v.user_id,type:'3',status:$v.status};
				$v.apiAxios.setBdCollection(params).then(res => {
					if($v.status==1){
						$v.data.is_collection=1
						Toast('收藏成功')
					}else{
						$v.data.is_collection=0
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
			}
			
		}
	}
</script>

<style scoped="scoped">
	div{ box-sizing: border-box; }
	.app{background: #F9F9F9;}
	.herder{ height: 2.425531rem; background: #fff; padding: 0 0.510638rem; display: flex;}
	.herder img{ width: 1.702127rem; height: 1.702127rem; border-radius: 50%; margin-top: 0.340425rem; margin-right: 0.340425rem;}
	.header_lf{ width: 55%; display: flex; font-size: 0.680851rem; color: #333; font-weight: 600; line-height: 2.425531rem; overflow: hidden;}
	.herder_rit{ display: flex;}
	.herder_rit div{ width: 2.978723rem; height: 1.063829rem; text-align: center; line-height: 1.063829rem; font-size: 0.680851rem; color: #3699FF; border:0.042553rem solid rgba(51,153,255,1); border-radius:0.531914rem;  margin: 0 0.255319rem; margin-top: 0.638297rem; }
	.open_btn{display: flex; justify-content: space-around; padding: 0.510638rem;}
	.open_btn div{ width: 5.531914rem; height: 1.489361rem; line-height: 1.489361rem; text-align: center; color: #fff; font-size: 0.680851rem; background:linear-gradient(-10deg,rgba(54,153,255,1) 0%,rgba(33,216,255,1) 100%); border-radius:0.74468rem; }
	.info_div{  line-height: 1.489361rem; background: #fff; color: #333; font-size: 0.595744rem; padding: 0 0.510638rem; display: flex; justify-content: space-between;}
	.info_div div:nth-child(1){ width: 25%;}
	.info_div div:nth-child(2){ width: 75%; text-align: right; overflow:hidden;overflow-wrap: break-word; }
	.info_div img{ width: 0.319148rem; height: 0.680851rem; }
	.door_photo{ padding:0.510638rem; background: #fff;}
	.door_photo_test{ font-size: 0.595744rem; color: #333;}
	.door_photo_img{ margin-top: 0.510638rem;}
	.door_photo_img img{ width: 2.127659rem; height: 2.127659rem; border-radius: 0.212765rem; margin-right: 0.340425rem;}
	.p1{background: url(../../assets/collection.png) no-repeat;background-size: 100% 100%;}
	.p2{background: url(../../assets/collectionAc.png) no-repeat;background-size: 100% 100%;}
	p{width: 0.853333rem;height: 0.853333rem;margin: 0.25rem 0 0 0.3rem;}
</style>