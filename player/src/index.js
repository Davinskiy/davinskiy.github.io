// js
let video = document.getElementById("myVideo");

function mediaAutoPlay(obj){
	video.play();
	setTimeout(() => {
		obj.muted = false;
	}, 150);
}

mediaAutoPlay(video);

video.addEventListener('click',function(){
	if(!video.paused){
		video.pause();
	}
}, false);
