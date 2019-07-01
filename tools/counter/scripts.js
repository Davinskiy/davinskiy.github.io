new Vue({
	el : '#counter',
	data : {
		counts: 0,
		time_start: 0,
		counts_list : [],
	},
	watch : {
		counts : function() {
			this.save();
		},
		time_start : function() {
			this.save();
		},
		counts_list : function() {
			this.save();
		},
	},
	created: function() {
		this.load();
	},
	methods : {
		getStrDate : function(ts){
			let d = new Date(ts);
			let s = '';
				s += ((d.getHours() < 10)?'0':'') + d.getHours();
				s += ':';
				s += ((d.getMinutes() < 10)?'0':'') + d.getMinutes();
				s += ' в ';
				s += ((d.getDate() < 10)?'0':'') + d.getDate();
				s += '.';
				s += ((d.getFullYear() < 10)?'0':'') + d.getFullYear();
				s += '.';
				s += (((d.getMonth()+1) < 10)?'0':'') + (d.getMonth()+1);

			return s;
		},
		countPlus: function() {
			if (!this.counts) {
				this.time_start = new Date().getTime();
			}
			this.counts++;
		},
		newCount: function() {
			this.counts_list.unshift({
				counts: this.counts,
				time_start: this.time_start,
				time_end: new Date().getTime()
			});
			this.counts = 0;
			this.time_start = 0;
		},
		save: function() {
			localStorage.setItem(location.href, JSON.stringify({
				counts: this.counts,
				time_start: this.time_start,
				counts_list: this.counts_list,
			}));
		},
		load: function() {
			if (!localStorage.getItem(location.href)) {
				return false;
			}
			let obj = JSON.parse(localStorage.getItem(location.href));
			this.counts = obj.counts;
			this.time_start = obj.time_start;
			this.counts_list = obj.counts_list;
		},
	},
	computed: {
		getAllCounts: function() {
			let sum = 0;
			for (let i = 0, len = this.counts_list.length; i < len; i++ ){
				sum += this.counts_list[i].counts;
			}
			return sum;
		},
	},
});