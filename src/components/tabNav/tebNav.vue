<template>
	<div>
		<ul class="navBottom">
			<li v-for="(v,i) in tabList" :class="v.check==true?'active':''" @click="navBotClk(i)">{{v.title}}</li>
		</ul>
	</div>
</template>

<script>
export default {
  name: "tebNav",
  data() {
    return {
  		tabList:[{title:'人脉雷达',check:false,url:"neteng"},{title:'通讯录',check:false,url:"maillist"},{title:'业务中心',check:false,url:"operation"},{title:'我的',check:false,url:"mine"},]
    }
  },
  mounted(){
	if(this.$store.state.isTrue==0){
		this.tabList[0].check=true
	}else if(this.$store.state.isTrue==1){
		this.tabList[1].check=true
	}else if(this.$store.state.isTrue==2){
		this.tabList[2].check=true
	}else if(this.$store.state.isTrue==3){
		this.tabList[3].check=true
	}
  },
  methods:{
  	navBotClk:function(s){
  		this.$router.push({path:this.tabList[s].url});
		this.$store.commit('change',s)
  	}
  }
};
</script>

<style scoped="scoped">
	.navBottom{z-index: 9999;background: #fff;height: 2.090666rem;font-size:0.597333rem;color: #999;display: flex;position: fixed;width: 100%;bottom: 0;}
	.navBottom li{flex: 1;height: 1.664rem;line-height: 1.664rem;text-align: center;}
	.active{font-size: 0.682666rem;color: #333;border-bottom: 0.128rem solid #3699FF;}
</style>
