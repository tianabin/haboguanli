import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {isTrue:0,isFlow:0,errorGoodsImg:"this.src='http://btj.yundian168.com/images/default.jpg'",lat:'',lng:''},
  mutations: {
		change(state,s) {
        state.isTrue=s;
    },
		changeFoll(state,s) {
		    state.isFlow=s;
		},
		changelat(state,s) {
		    state.lat=s;
		},
		changelng(state,s) {
		    state.lng=s;
		},
	},
  actions: {}
});
