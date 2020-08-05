var audio = document.getElementById('audio');
var totalProgress = $('.totalProgress');
var currentProgress = $('.currentProgress');
var currentTime = $('.currentTime');
var totalTime = $('.totalTime');
var timer;//计时器

//按钮单击时 
$('.btn').on('click',function(){
	//如果音频暂停
	if(audio.paused){
		audio.play();//播放音频
		//更改播放按钮
		$(".play").css({'display':'none'});
		$(".pause").css({'display':'block'});
		//计时器实时更改进度条
		timer= setInterval(function(){
		  if (audio.ended) {
			//如果音频播放结束
		$(".play").css({'display':'block'});
		$(".pause").css({'display':'none'});
				} else{
					//更改时间
				currentTime.text(audio.currentTime);
				totalTime.text(audio.duration);
					//更改进度条
					var ratio = audio.currentTime/audio.duration;
					currentProgress.css({'width':ratio*100+'%'});
				}
			},100);
	}else{
		audio.pause();//暂停音频
		//更改播放按钮
		$(".play").css({'display':'block'});
		$(".pause").css({'display':'none'});
	}
});

//单击进度条更改进度
totalProgress.on('click',function(ev){
	//获取百分比
	var ratio = getRatio(ev);
	currentProgress.css({'width':ratio * 100 + '%' });
	//更改音频进度条
	audio.currentTime = audio.duration * ratio;
});

function getRatio (ev) {
	//总进度条的实际长度
	var totawidth = totalProgress[0].offsetWidth;
	//总进度条的X坐标
	var totalX = totalProgress.offset().left;
	//鼠标的x坐标
	var mouseX = ev.clientX;
	//求出百分比
	var ratio = (mouseX-totalX) / totawidth;
	return ratio;
}

