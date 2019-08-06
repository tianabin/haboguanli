<template>
	<div class="evaluate">
        <div class="list" v-for="(item,index) in list" :key="index">
            <p>{{item.leader_name}}  {{item.add_time}}</p>
            <p>{{item.content}}</p>
        </div>
        <div class="list2" v-if="show">
            <p >{{this.zanWu}}</p>
        </div>
    </div>
</template>

<script>
import axiosHttp from "@/utils/http";
import apilist from "@/utils/apilist";
	export default {
		data() {
			return {
                uid:'',
                list:{},
                zanWu:'',
                show:false
			}
        },
        created() {
            var _this = this
            _this.uid = localStorage.getItem("userMapId")
            let params = {
                id:_this.uid  //_this.uid 
            }
            axiosHttp('get',apilist.Evaluata,params).then(res =>{
                console.log(res)
                if(res.data.errcode == 0){
                    _this.list = res.data.result
                }else if(res.data.errcode == 1){
                    _this.show = true
                    _this.zanWu = res.data.errmsg
                }
            })
        },
	};
</script>

<style>
.evaluate{
    width: 100%;
    height: 100%;
}
.list{
    width: 90%;
    height: auto;
    margin:  auto;
    margin-top: .65rem;
    font-size: .78rem;
}
.list p{
    margin-top: .43rem;
}
.list2{
    width: 90%;
    height: auto;
    margin:  auto;
    margin-top: .65rem;
    font-size: .78rem;
}
.list2 p{
    margin-top: .43rem;
}
</style>
