<template>
	<div>
		<div class="header">
			<div><img :src="wx_user.head_img"/></div>
			<p>{{wx_user.nickname}}</p>
		</div>
		<div class="network-value-wrap">
			<div class="network-value-title">人脉分析</div>
			<div class="network-value">人脉值<span>{{user_stat_str.a6/10}}</span></div>
			<div class="decorate"></div>
			<div class="excellent-img"><img  v-if="(user_stat_str.a6/10)>2000" src="../../assets/you.png"/><img v-if="600 < (user_stat_str.a6/10) &&(user_stat_str.a6/10) < 2000" src="../../assets/liang.png"/><img  v-if="(user_stat_str.a6/10)<600" src="../../assets/pu.png"/></div>
			<div class="one-connections-wrap">
				<div class="one-connections">
					<div class="one-connections-icon"><img src="../../assets/iconPres.png"/></div>
					<div class="one-connections-text">
						<p>一度人脉<span>{{user_stat_str.a4/10}}</span></p>
						<p>好友数量<span>{{user_stat_str.a1}}</span></p>
						<p>作为群主的群，成员数量<span>{{user_stat_str.a2}}</span></p>
					</div>
				</div>
				<div class="one-connections">
					<div class="one-connections-icon"><img src="../../assets/iconPres.png"/></div>
					<div class="one-connections-text">
						<p>二度人脉<span>{{user_stat_str.a5/10}}</span></p>
						<p>不是群主的群，成员数量<span>{{user_stat_str.a3}}</span></p>
					</div>
				</div>
				<div class="explain" v-if="(user_stat_str.a6/10)>2000">人脉值大于<span>2000</span>，评估结果为<span>优秀</span>，在本地生活中有一定影 响力，比较适合做团长。</div>
				<div class="explain" v-if="600 < (user_stat_str.a6/10) &&(user_stat_str.a6/10) < 2000">人脉值大于<span>600</span>，评估结果为<span>良好</span>，在本地生活中有一定影 响力，比较适合做团长。</div>
				<div class="explain" v-if="(user_stat_str.a6/10)<600">人脉值低于<span>600</span>，评估结果为<span>普通</span>，在本地生活中影响力较低，不推荐做团长。</div>
			</div>
		</div>
		<div class="group-list-wrap">
			<div class="group--list-title">大于50人的群数量</div>
			<div class="decorate"></div>
			<div class="group-list" v-for="v in preGorLis" @click="togrouper(v.group_id)">
				<img :src="v.head_img==null?$store.state.errorGoodsImg:v.head_img"  :onerror="$store.state.errorGoodsImg"/>
				<div>{{v.nickname==null?'未设置':v.nickname}}（{{v.member_count}}人)</div>
			</div>
			<div class="add" @click="loadMore">{{loadMoreCount}}</div>
		</div>
		
	</div>
</template>

<script>
export default {
  name: "pres",
  data() {
    return {
		user_stat_str:{},
		imgsrc:"",
		wxid:"",
		wx_user:{},
		preGorLis:[],
		page:1,
		loadMoreCount:"加载更多"
    }
  },
  created(){
	this.getGrouperParse()
	this.getPreGorList()
  },
  methods:{
  	getGrouperParse(){
		this.wxid=this.$route.query.wxid
		let $v=this,
		params = {wx_id:this.wxid};
		$v.apiAxios.getGrouperParse(params).then(res => {
			$v.user_stat_str=res.result.user_stat_str
			$v.wx_user=res.result.wx_user
		}).catch(err => {})
	},
	getPreGorList(){
		let $v=this,
		params = {wx_id:this.wxid,page_id:$v.page,page_nums:20,member_count_nums:"50"};
		$v.apiAxios.getPreGorList(params).then(res => {
			$v.preGorLis=$v.preGorLis.concat(res.result)
		}).catch(err => {
			if($v.preGorLis.length>0){
				$v.loadMoreCount="已经到底了"
			}
		})
	},
	loadMore(){
		if(this.loadMoreCount="加载更多"){
			this.page++
			this.getPreGorList()
		}
	},
	togrouper(i){
		console.log(1)
		this.$router.push({path:'./buscen'});
		localStorage.setItem('group_id',i)
	}
  }
};
</script>

<style type="text/css">
	html{ font-size: 20px;}
	div{ box-sizing: border-box; }
	.decorate{ width: 0.127659rem; height: 0.638297rem; background: #3699FF; position: absolute; left: 0; top: 0.531914rem;} 
	.header{ height: 2.553191rem; background: #fff; padding: 0.425531rem 0.510638rem; box-sizing: border-box; display: flex;}
	.header img{ width: 1.702127rem; height: 1.702127rem; border-radius: 50%; padding-right: 0.340425rem;}
	.header p{ font-size: 0.680851rem; color: #333; line-height: 1.702127rem}
	.network-value-wrap{  background: #fff; margin-top: 0.340425rem;color: #333; position: relative; }
	.network-value-title{font-size: 0.680851rem;  height: 1.702127rem; line-height: 1.702127rem; padding-left: 0.489361rem; }
	.network-value{ height: 1.276595rem; line-height: 1.276595rem; font-size: 0.595744rem; padding-left: 0.531914rem;}
	.network-value span{ color: #3699FF; font-size: 0.553191rem; margin-left: 0.446808rem; font-weight:600;}
	.excellent-img{ width: 1.702127rem; height: 1.702127rem; position: absolute; top: 0.425531rem; right: 0.425531rem;} 
	.excellent-img img{ width: 100%; height: 100%;}
	.one-connections-wrap{ background: #fff; padding-bottom: 0.680851rem; }
	.one-connections{ margin: 0.212765rem 0.510638rem 0.340425rem 0.510638rem; border-radius: 0.425531rem; display: flex;  }
	.one-connections-icon{ width: 1.489361rem; height: 1.489361rem; border-radius: 0.425531rem; margin-top: 0.595744rem; margin-left: 0.361702rem; margin-right: 0.829787rem;}
	.one-connections-icon img{ width: 100%; height: 100%;}
	.one-connections-text p{ font-size: 0.595744rem; color: #333; }
	.one-connections-text p span{ font-size: 0.765957rem; color: #3699FF; margin-left: 0.659574rem; font-weight: 600;}
	.one-connections-text p:nth-child(1){ margin-top: 0.680851rem;}
	.explain{ background: #fff; font-size: 0.553191rem; color: #666;  margin: 0.489361rem 0.87234rem 0 0.510638rem;}
	.explain span{ color: #3699FF;}
	.group-list-wrap{ margin-top: 0.340425rem; position: relative;background: #fff;}
	.group--list-title{ height: 1.702127rem;  font-size: 0.680851rem; color: #333; line-height: 1.702127rem; font-weight: 600; padding-left: 0.489361rem; }
	.group-list{ height: 2.127659rem; line-height: 2.127659rem; padding: 0 0.510638rem; display: flex; font-size: 0.595744rem; color: #333;}
	.group-list img{ width: 1.489361rem; height: 1.489361rem; border-radius: 0.425531rem; margin-top: 0.319148rem; margin-right: 0.531914rem;}
	.add{ height: 1.276595rem; line-height: 1.468085rem; text-align: center; font-size: 0.510638rem; color: #999; text-decoration: underline;} 
</style>
