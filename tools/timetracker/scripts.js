

let tracker_app = new Vue({
	el : '#tracker-app',
	data : {
		tasks : [],
		rate : 400,
		statuses : {
			'light' : 'Еще не начат',
			'primary' : 'В работе',
			'secondary' : 'На паузе',
			'success' : 'Завершен',
		},
	},
	created : function(){
		let tracker_app = localStorage.getItem('tracker_app');
		if (tracker_app)
			this.tasks = JSON.parse(tracker_app);
	},
	updated : function(){
		localStorage.setItem('tracker_app', JSON.stringify(this.tasks));
	},
	methods : {
		getSpendeingTime : function(start, end){
			if ( !end )
				end = new Date().getTime();
			return ((end-start) / (1000*60)).toFixed() + ' мин.';
		},
		switchStatus : function(task_id, btn_stat){
			let change = true;
			let cmt;
			let times_last_index = this.tasks[task_id].times.length-1;

			switch(btn_stat) {
				case 'primary' /*В работу*/:
					this.tasks[task_id].times.push({
						title : prompt('Какая задача стоит?'),
						start : new Date().getTime(),
						end : 0,
						comment : '',
					});
					break;
				case 'secondary' /*На паузу*/:
					cmt = prompt('Хотите добавить комментарий к действию?');
					
					if (!cmt) {
						change = false;
						break;
					}
					
					this.tasks[task_id].times[times_last_index].comment = cmt;
					this.tasks[task_id].times[times_last_index].end = new Date().getTime();
					break;
				case 'success' /*Завершение*/:
					cmt = prompt('Хотите добавить/обновить комментарий к действию?', this.tasks[task_id].times[times_last_index].comment);
					
					if (!cmt) {
						change = false;
						break;
					}

					this.tasks[task_id].times[times_last_index].comment = cmt;

					/* делаем проверку, на случае если перед этим работа была приостановлена */
					if (!this.tasks[task_id].times[times_last_index].end)
						this.tasks[task_id].times[times_last_index].end = new Date().getTime();
					break;
			}
			
			if(change)
				this.tasks[task_id].status = btn_stat;
		},
		addProject : function(){
			
			let title = this.$refs.new_title.value;
			let desc = this.$refs.new_desc.value;
			let rate = this.$refs.new_rate.value;

			if (!title) {
				return;
			}

			this.tasks.unshift({
				title : title,
				desc : desc,
				rate : rate,
				status : 'light',
				show_times : false,
				times : [],
			});

			modalClose();
			this.$refs.new_title.form.reset();
		},
		remove : function(task_id){
			if (confirm('Вы действительно хотите удалить проект из списка?')) {
				this.tasks.splice(task_id, 1);
			}
		},
		getProcessInfo : function(task){
			let all_ts = 0;
			let rate = task.rate;

			for (time of task.times) {
				let start = time.start;
				let end = time.end;

				if ( !end )
					end = new Date().getTime();
				
				all_ts += end - start;
			}
			let minutes = all_ts / (1000 * 60).toFixed() * 1;
			let hours = all_ts / (1000 * 60 * 60);
			let money = (hours * rate).toFixed();
			
			return {
				'minutes' : minutes.toFixed(2),
				'hours' : hours.toFixed(2),
				'money' : money,
			};
		},
		getStringifyDate : function(ts){
			let d = new Date(ts);
			let s = ((d.getDate() < 10)?'0':'') + d.getDate();
				s += '.';
				s += (((d.getMonth()+1) < 10)?'0':'') + (d.getMonth()+1);
				s += '.';
				s += ((d.getFullYear() < 10)?'0':'') + d.getFullYear();
				s += ' в ';
				s += ((d.getHours() < 10)?'0':'') + d.getHours();
				s += ':';
				s += ((d.getMinutes() < 10)?'0':'') + d.getMinutes();
				s += ':';
				s += ((d.getSeconds() < 10)?'0':'') + d.getSeconds();

			return s;
		},
	}
});

/* костыл для обновления/пересчета данных во Vue */
setInterval( () => {
	tracker_app.$forceUpdate();
}, 1000);



/**
*  modals
**/

/** modal opening **/
function modalOpen(event, id){
	if (event) event.preventDefault();
	
	modalClose();

	document.querySelectorAll(".modals," + id).forEach(function(element){
		element.classList.add('show');
	});
};

/** modal closing **/
function modalClose(event){
	if (event) event.preventDefault();

	document.querySelectorAll(".modals, .modals__item").forEach(function(element){
		element.classList.remove('show');
	});
};
