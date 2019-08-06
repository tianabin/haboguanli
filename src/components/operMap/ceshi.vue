<template>
	<div>
        <van-area :area-list="areaList" @change="add" v-model="value"/>
    </div>
</template>

<script>
    import axiosHttp from '@/utils/http'
    import apilist from '@/utils/apilist'
    import AreaList from '../../../static/json/data'
	export default {
		data() {
			return {
				areaList:AreaList,
                value:'110000',
                province_id:'',
                city_id:'',
                area_id:'',
                value:'110101'
			}
		},
        created() {
            // this.getList()
            console.log(this.areaList)
        },
		methods: {
            // getList(){
            //     let params = {
			// 		pid:0
			// 	}
			// 	axiosHttp('post',apilist.Province,params).then(res =>{
            //         var citys = {
            //             province_list: {

            //             }
            //         };
            //         res.data.forEach((item)=>{
            //             citys.province_list[item.areacode] = item.areaName;
            //         })
            //         this.areaList = citys;
			// 	})
            // },
            add(picker){
                let val = picker.getValues()
                this.province_id = val[0].code
                this.city_id = val[1].code
                this.area_id = val[2].code
                console.log(this.province_id)
                // let params = {
                //     pid:val[0].code
                // }
                // // console.log(params)
                // // console.log(params)
                //     axiosHttp('post',apilist.Province,params).then(res =>{
                //         // console.log(res)
                //         var citys = {
                //             province_list: this.areaList.province_list,
                //             city_list: {

                //             }
                //         };
                //         res.data.forEach((item)=>{
                //             citys.city_list[item.areacode] = item.areaName;
                //         })
                //         this.areaList = citys;
                //         this.add2(res.data,index)
                //     })
                // })
            },
            add2(item,index){
                var arr = []
                console.log(item)
                // for(let i = 0; i < item.data[0].length;i++){
                //     var  params = {
                //         pid:res.areacode[i]
                //     }
                // }
                // console.log(params)
                var params  = {
                    
                }
                item.forEach((res)=>{
                    arr.push(res)
                })
                for(let i = 0; i < arr.length;i++){
                    params.pid = arr[i].areacode
                    console.log(params)
                }
                // axiosHttp('post',apilist.Province,params).then(res=>{
                //     console.log(res)
                //             var citys = {
                //                 province_list: this.areaList.province_list,
                //                 city_list: this.areaList.city_list,
                //                 county_list:{}
                //             };
                //             res.data.forEach((item)=>{
                //                 citys.county_list[item.areacode] = item.areaName;
                //             })
                //             console.log(citys);
                //             this.areaList = citys;
                //         })
            }
		}
	};
</script>

<style>

</style>
