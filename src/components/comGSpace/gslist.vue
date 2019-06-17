<template>
	<div  :style="'background:#eee','height:'+sHeight+'px'" class="bg">
		<div class="arrowleft" @click="back()"><</div>
		<div class="head">{{title}}</div>
		<div class="navList" v-if="$store.state.isFlow==0">
			<div :class="$store.state.isFlow==0?'active':''" @click="clkNav(0)">供应商</div>
			<div :class="$store.state.isFlow==1?'active':''" @click="clkNav(1)">群消息({{messagenum}}条)</div>
		</div>
		<div class="cominfo" v-if="$store.state.isFlow==0">
		<div class="leftNavList" :style="'height:100%'">
			
			<ul >
				<li  class="leftNavList-item" @click="navBotClk()" :class="check==true?'active1':''">全部</li>
				<li  class="leftNavList-item" v-for="(v,i) in tabList" :class="v.checked==true?'active1':''"  @click="navBotClk(v.id,i)" >{{v.name}}</li>
			</ul>
		</div>
		
		<div class="comList" >
			<ul>
				<li class="com-item" v-for="(v,i) in vendorlist" >
					<div>{{v.name}}</div>
					<div>经营品牌：{{v.brand_name}}</div>
					<div>主营类目：{{v.catgory_name}}</div>
					<div class="message-item-">
						<div>{{v.link_name}} | {{v.position}}</div>
						<div @click="call(v.tel)" :style="'color:#169BD5'">打电话</div>
					</div>
	<!-- 				<div>热度：137</div> -->
					<div class="message-item-">
						<div @click="lookmessage(v.wxid,v.name)" :style="'color:#169BD5'">群消息：{{v.message_num}}条</div>
						<div>对接时间：{{v.update_time}}</div>
					</div>
				</li>
				<li class="loadMore" @click="loadMore()">{{loadMoreCount}}</li>
				<li style="height:2rem"></li>
			</ul>
			
		</div>
		</div>
		
		<div class="messageinfo"  v-if="$store.state.isFlow==1">
			<div class="messageList">
				<ul>
					<li class="message-item" v-for="(v,i) in messagelist">
						<img :src="v.wxid_from_info.head_img"/>
						<div class="message-item-div">
							<div class="message-item-">
								<div>{{v.wxid_from_info.nickname}}</div>
								<div>{{v.ctime}}</div>
							</div>
							<div class="message-item-con">{{v.content}}</div>
						</div>
					</li>
					<li class="loadMore" @click="loadMore()">{{loadMoreCount}}</li>
					<li style="height:2rem"></li>
				</ul>
			</div>
			
		</div>
		<div style="font-size: 0.597333rem;text-align: center;color: #999;" v-if="kong">暂无数据</div>
		
	</div>
	
</template>

<script>
	import {
		Toast,
		Indicator
	} from 'mint-ui'
	import Header from "../header/header.vue"
	export default {
	  name: "gslist",
	  data() {
	    return {
			userid:'',
			unionid:'',
			tabList:[],
			kong:false,
			page:1,
			sHeight:"",
			loadMoreCount:"加载更多",
			title:'',
			messagenum:'',
			room_wxid:'',
			vendorlist:'',
			messagelist:'',
			total1:'',
			total2:'',
			total3:'',
			cat_id:'',
			wxid:'',
			check:true,
			isopen:true,
	    }
	  },
	  created:function(){
	    this.$store.commit('changeFoll',0)
	  	this.userid = window.localStorage.getItem("userMapId");
	  	this.unionid = window.localStorage.getItem("unionidUser");
		this.sHeight=document.documentElement.clientHeight;
		this.getData();
		this.getData1();
	  },
	  components:{
	        Header:Header
	  },
	  mounted(){
		mui.back = function() {
			window.history.go(-1);
		}
	  },
	  methods:{
		  getData:function()		  			  //获取群信息(名称及消息数)  
		  {
			  let $v=this,
			  params = {user_id:$v.userid};
			  $v.apiAxios.getGroupInfolxl(params).then(res => {
			    console.log(res)
				$v.messagenum=res.result.group_info.message_num;
				$v.title=res.result.group_info.name;
				$v.room_wxid=res.result.group_info.room_wxid;
				console.log(111111111)
				$v.vendorlist=[];
				$v.getData2();
			  }).catch(err => {
			    console.log(err)
			  })
			  				
		  },
		  getData1:function()		   		  	 //获取主营品类列表
		  {
		  	 let $v=this,
             params = {};
             $v.apiAxios.getCategorylxl(params).then(res => {
               console.log(res)
			   $v.tabList=res.result;
			   for(let i=0;i<$v.tabList.length;i++)
			   {
				   $v.tabList[i].checked=false
			   }
               console.log(2222222222)
             }).catch(err => {
               console.log(err)
             })
		  },
		  getData2:function(id)      //获取供应商列表
		  {   
			  let $v=this,
			  params = {room_wxid:$v.room_wxid,psize:10,pindex:$v.page,cat_id:id};
			  $v.apiAxios.getVendorlistlxl(params).then(res => {
				  if($v.page==1)
				  {
					  $v.vendorlist=[];
				  }
			  	$v.vendorlist=$v.vendorlist.concat(res.result.data)
				$v.total1=res.result.total
			  	console.log(res)
				console.log(3333333333)
			    if(res.result.data.length==0){
					$v.loadMoreCount="已经到底了"
				}
			  }).catch(err => {
			    if($v.vendorlist.length==$v.total){
			  		$v.loadMoreCount="已经到底了"
			    }
			  })
			  
		  },
		  getData3:function(id){    //获取群消息列表
		      console.log(id)
			  let $v=this,
			  params = {room_wxid:$v.room_wxid,v_wx_id:id,pindex:$v.page,psize:5};
			  $v.apiAxios.getMessagelistlxl(params).then(res => {
			  	$v.messagelist=$v.messagelist.concat(res.result)
			  	console.log(res)
				 if(res.result.length==0){
					$v.loadMoreCount="已经到底了"
				}
			  }).catch(err => {
			    if($v.messagelist.length>0){
			  		$v.loadMoreCount="已经到底了"
			    }
			  })
		  },
         navBotClk:function(id,i)  //切换品类
		 {
			 console.log(id)
			 console.log(i)
			 this.page=1;
			 this.vendorlist=[];
			 this.cat_id=id;
			 this.check=false;
			 for(let j=0;j<this.tabList.length;j++)				 
			 {
				 if(i==j) 
				 {
					   this.tabList[j].checked=true;
				 }
				 else{
					   this.tabList[j].checked=false;
				 }
			 }
			 console.log(this.tabList)
	         this.getData2(id);
			 
		 },
		loadMore(id){  //加载更多
			this.page++
			if(this.$store.state.isFlow==0){
				if(this.cat_id)
				{
					this.getData2(this.cat_id)
				}
				else{
							this.getData2();
				}
		
			}else{
				this.getData3(this.wxid);
			}		
		},
		clkNav(i){    
			this.page=1
			this.$store.commit('changeFoll',i)
			this.loadMoreCount="加载更多"
			this.kong=false
			this.vendorlist=[]
			this.messagelist=[]
		    if(i==1)	 //显示全部当前群信息	
			{
				this.title="全部群消息";
	            this.getData3();
			}
			if(i==0)			
			{
               this.getData2();
			}

		},
		lookmessage:function(wxid,name)  //点击某个查看群消息
		{
			 console.log(wxid)
			this.title=name;
			this.wxid=wxid;
			this.$store.commit('changeFoll',1)
			this.kong=false
			this.vendorlist=[]
			this.messagelist=[]
			let $v=this,
			params = {room_wxid:$v.room_wxid,v_wx_id:wxid,pindex:$v.page,psize:10};
			$v.apiAxios.getMessagelistlxl(params).then(res => {
				$v.messagelist=$v.messagelist.concat(res.result)
				console.log(res)
				 if(res.result.length==0){
				$v.loadMoreCount="已经到底了"
			}
			}).catch(err => {
			  if($v.messagelist.length>0){
					$v.loadMoreCount="已经到底了"
			  }
			})
			
			
		},
		call:function(tel){
			console.log(tel)			
            window.location.href = 'tel://'+tel
   
		},
		back()
		{
		if(this.$store.state.isFlow==0){
			  		this.$router.push('/operation')	
		}else{
			this.$store.commit('changeFoll',0)
			this.page=1;
			this.getData();
			this.getData1();
			
		}		
		}
	  }
	};
</script>

<style scoped="scoped">
	.bg{background: #eee;}
	.messageList{margin-top: 2rem;}
	.arrowleft{float: left;line-height: 2rem;margin-left: 10px;color: #999;font-size: 0.6rem;position:fixed;z-index:11;top:0;}
	.navList{width: 100%;display: flex;height: 2.090666rem;color: #333;background: #eee;position: fixed;top:2rem;}
	.navList div{flex: 1;text-align: center;font-size: 0.597333rem;line-height: 2.090666rem;}
	.active{color: #3699FF;border-bottom: 0.085333rem solid #3699FF;}
	.head{width: 100%;height: 2rem;color:#333;font-size: 0.8rem;text-align: center;line-height: 2rem;background: #eee;position:fixed;z-index:1;top:0;}
	.cominfo{display: flex;font-size: 0.6rem;}
	.leftNavList{flex: 0 0 3rem; width:3rem; background: #D7D7D7;height:100%;margin-top: 4rem;}
	.leftNavList-item{display: flex;width: 3rem;height: 2.8rem;line-height: 0.6rem;justify-content: center;align-items: center;color: #333;}
	.leftNavList-item:hover{background: #fff;}
	.leftNavList-item:active{background: #fff;}
	.com-item{height:6rem;line-height: 1rem;box-shadow: 0 0.15rem 0.25rem 0 rgba(0,0,0,.5);background: #fff;padding: 0 0.625rem;box-sizing: border-box;margin-bottom: 0.625rem;}
	.message-item{height: auto ; padding: 0.3rem;font-size: 0.6rem;display: flex;}
	.message-item img{width:1.8rem;height: 1.8rem;margin-right: 0.5rem;border-radius: 10%;}
	.messageinfo{background: #eee;}
	.active1{background: #fff;}
	.message-item-div{width: 14rem;}
	.message-item-{display: flex;justify-content: space-between;color:#666;}
	.comList{width:100%;background: #eee;margin-top: 4rem;}
	.message-item-con{background: #fff;border-radius: 10%;padding: 0.625rem;box-sizing: boxder-box;width: 9.375rem;}
	.loadMore{text-align: center;line-height: 2rem;color: #999!important;font-size: 0.597333rem;}
</style>
