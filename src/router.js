import Vue from "vue";
import Router from "vue-router";
 
Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
			component: (resolve) => require(['./components/login.vue'],resolve)
    },
		{
		  path: "/operation",
		  name: "operation",
			component: (resolve) => require(['./components/operMap/operation.vue'],resolve)
		},
    {
      path: "/neteng",
      name: "neteng",
			component: (resolve) => require(['./components/netEng/netEng.vue'],resolve)
    },
		{
		  path: "/maillist",
		  name: "maillist",
			component: (resolve) => require(['./components/mailList/mailList.vue'],resolve)
		},
		{
		  path: "/pres",
		  name: "pres",
			component: (resolve) => require(['./components/mailList/pres.vue'],resolve)
		},
		{
		  path: "/buscen",
		  name: "buscen",
			component: (resolve) => require(['./components/netEng/businessCenter.vue'],resolve)
		},
		{
		  path: "/contion",
		  name: "contion",
			component: (resolve) => require(['./components/netEng/connections.vue'],resolve)
		},
		{
		  path: "/mine",
		  name: "mine",
			component: (resolve) => require(['./components/mine/mine.vue'],resolve)
		},
		{
		  path: "/opermap",
		  name: "opermap",
			component: (resolve) => require(['./components/operMap/operMap.vue'],resolve)
		},
		{
		  path: "/addhead",
		  name: "addhead",
			component: (resolve) => require(['./components/operMap/addHead.vue'],resolve)
		},
		{
		  path: "/workplan",
		  name: "workplan",
			component: (resolve) => require(['./components/operMap/workPlan.vue'],resolve)
		},
		{
		  path: "/workrecord",
		  name: "workrecord",
			component: (resolve) => require(['./components/operMap/workRecord.vue'],resolve)
		},
		{
		  path: "/headinfo",
		  name: "headinfo",
			component: (resolve) => require(['./components/operMap/headInfo.vue'],resolve)
		},
		{
		  path: "/businessdistrictfilter",
		  name: "businessdistrictfilter",
			component: (resolve) => require(['./components/operMap/businessDistrictFilter.vue'],resolve)
		},
		{
		  path: "/personalinfo",
		  name: "personalinfo",
			component: (resolve) => require(['./components/operMap/personalInfo.vue'],resolve)
		},
		{
		  path: "/editpersonalinfo",
		  name: "editpersonalinfo",
			component: (resolve) => require(['./components/operMap/editPersonalInfo.vue'],resolve)
		},
		{
		  path: "/districtdetails",
		  name: "districtdetails",
	      component: (resolve) => require(['./components/operMap/districtDetails.vue'],resolve)
		},
		{
			path: "/visitingrecord",
			name: "visitingrecord",
			component: (resolve) => require(['./components/operMap/visitingRecord.vue'],resolve)
		},
		{
			path: "/qrcode",
			name: "qrcode",
			component: (resolve) => require(['./components/operMap/qrCode.vue'],resolve)
		},
		{
			path: "/openhub",
			name: "openhub",
			component: (resolve) => require(['./components/operMap/openHub.vue'],resolve)
		},
		{
			path: "/chart",
			name: "chart",
			component: (resolve) => require(['./components/netEng/chart.vue'],resolve)
		},
		{
			path: "/mycollection",
			name: "mycollection",
			component: (resolve) => require(['./components/mine/myCollection.vue'],resolve)
		},
		{
			path: "/switchcity",
			name: "switchcity",
			component: (resolve) => require(['./components/netEng/switchCity.vue'],resolve)
		},
		{
			path: "/addgrouper",
			name: "addgrouper",
			component: (resolve) => require(['./components/operMap/addGrouper.vue'],resolve)
		},
		{
			path: "/gslist",
			name: "gslist",
			component: (resolve) => require(['./components/comGSpace/gslist.vue'],resolve)
		}
		
  ]
});
