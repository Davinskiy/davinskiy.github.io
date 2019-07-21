new Vue({
	el : '#app',
	data : {
		create_title : '',
		create_text : '',
		notes : [],
	},
	watch : {
		notes : function() {
			this.save();
		}
	},
	created : function() {
		if (localStorage.getItem('notes') != '') {
			this.notes = JSON.parse(localStorage.getItem('notes'));
		}
	},
	methods : {
		remove : function(indx) {
			this.notes.splice(indx, 1);
		},
		add : function() {
			if (!this.notes)
				this.notes = [];

			if (!this.create_title)
				return;

			this.notes.unshift({
				title : this.create_title,
				text : this.create_text,
				is_edit : false
			});
			this.create_title = '';
			this.create_text = '';
		},
		save : function() {
			localStorage.setItem('notes', JSON.stringify(this.notes));
		},
	},
});
