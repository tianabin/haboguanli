<template>
	<div>
		<ul class="clear-fix">
			<li v-for="(v,i) in shopName" :class="v.check?'active':''" @click="changeId(i,v.id)">{{v.name}}</li>
		</ul>
		<div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
		<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
	</div>
</template>

<script>
	// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'hello',
  data() {
    return {
	  name:[],
	  name1:[],
	  shopName:[{name:'松鼠拼拼',id:'wx6ff407e6b1c1f010',check:true},{name:'十荟团',id:'wxbbdca62c011eeb38',check:false}],
	  listData:[],
		listData1:[],
		appid:"wx6ff407e6b1c1f010"
    }
  },
  created(){
	this.chartUrl()  
  },
  mounted(){
	mui.back = function() {
		window.history.go(-1);
	}
  },
  methods: {
    drawLine() {
		let $v=this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '' },
        tooltip: {},
        xAxis: {
          data: $v.name
        },
        yAxis: {},
        series: [{
          name: '销售指数',
          type: 'bar',
          data:$v.listData
        }]
      });
    },
	drawpie(){
		let $v =this;
		 // 基于准备好的dom，初始化echarts实例
		let myChart1 = echarts.init(document.getElementById('myChart1'))
		// 绘制图表
		myChart1.setOption({
		  title : {
			text: '商品分类',
			x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: $v.name1
			},
			series : [
				{
					name: '品类指数',
					type: 'pie',
					radius : '50%',
					center: ['50%', '60%'],
					data:$v.listData1,
					itemStyle: {
						emphasis: { 
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		});
	},
	chartUrl(){
		let $v=this,
		params = {appid:$v.appid};
		$v.apiAxios.chartUrl(params).then(res => {
			$v.listData1=res.result.product_categorys
			$v.name1=[]
			for(var i=0;i<res.result.product_categorys.length;i++){
				$v.name1.push(res.result.product_categorys[i].name)
			}
			$v.listData=res.result.products
			$v.name=[]
			for(var z=0;z<res.result.products.length;z++){
				$v.name.push(res.result.products[z].name)
			}
			$v.drawLine();
			$v.drawpie()
		}).catch(err => {
		  //Toast(err.msg)
		})
	},
	changeId(z,s){
		for(var i=0;i<this.shopName.length;i++){
			this.shopName[i].check=false;
		}
		this.shopName[z].check=true;
		this.appid=s
		this.chartUrl()
	}
  }
}
</script>

<style scoped="scoped">
	#myChart1,#myChart{margin: 0 auto;}
	#myChart1{margin-top: 0.853333rem;}
	ul{padding: 0.512rem 0.256rem;}
	ul li {font-size: 0.597333rem;float: left;padding: 0.2rem 0.4rem;border: 1px solid #3699FF;color: #3699FF;margin: 0.256rem;}
	.active{color: #fff;background: #3699FF;}
</style>
