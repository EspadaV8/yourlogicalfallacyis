(function(){
	var currentTitle;
	window.touchDevice = (!!('ontouchstart' in window) ? true : false) && $(window).width()>480;

	$(document).ready(function(){
		$('#content-inner .inter-fallacy').addClass('showing');
		if(window.touchDevice && currentHREF) $("nav.major a[href='" + currentHREF + "']").addClass('playing');
	});

	if(window.touchDevice){
		$('.home #content-inner h1, .home #content-inner h3').live('click', function(){
			if(currentHREF) $("nav.major a[href='" + currentHREF + "']").click();
		});
	}else{
		$('#content-inner nav.major a').live('mouseover', function(){
			window.showInfo(this);
		});
	}

	window.showInfo = function(el){
		if(currentTitle!=el.title){
			currentTitle = el.title;
			var h = data.fallacies[$(el).attr('href')].first;
			$('#content-inner h1, #content-inner h3').stop(true).animate({opacity: 0}, 200, function(){
				$('#content-inner h1').text(currentTitle);
				$('#content-inner h3').text(h);
				$(this).stop(true).animate({opacity: 1}, 200);
			});
		}
	};

})(window);