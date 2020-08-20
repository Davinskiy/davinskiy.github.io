Vue.component('app', {
	data : function(){
		return {
			heading : 'I AM a HEADING!!!',
		}
	},
	template : `<h1>{{heading}}</h1>`,
});

new Vue({
	el : '#app',
	data : {
		// msg : 'Works!',
	},
});