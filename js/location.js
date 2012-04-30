(function(){

	$('a').live('click', function(e){
		if(!e.ctrlKey && !e.metaKey){
			href = $(this).attr('href');
			if(href=='#donate' || href=='#share'){
				e.preventDefault();
				if(href=='#donate'){
					$('#paypal').submit();
					_gaq.push(['_trackPageview', '/donate']);
				}else if(href=='#share'){
					url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(base + '/' + (type || page));
					sharewindow = window.open(url,'share','width=640,height=350');
					if(window.focus) {sharewindow.focus()}
				}
			}else if(window.history.pushState && href.indexOf('http')<0 && href.indexOf('mailto')<0 && href.slice(-8).indexOf('.')<0 && !$(this).hasClass('external')){
				e.preventDefault();
				$('.playing').removeClass('playing');
				if(window.touchDevice && descendant(this, '#content-inner nav.major') && currentHREF!=href){
					currentHREF = href;
					window.showInfo(this);
					$(this).addClass('playing');
				}else{
					open(href, this.href);
				}
				this.blur();
			}
		}
	});

	function descendant(el, parent){
		return $(el).parents().index($(parent))>=0
	}

	function open(newpage, url){
		var content = '';
		type = '';
		currentHREF = '';
		if(newpage==base || newpage=='home'){
			newpage = 'home';
			i_f = Math.floor(Math.random()*data.order.length);
			currentHREF = data.order[i_f];
			content = $(data.pages.home);
			content.siblings('h1').html(data.fallacies[currentHREF].title);
			content.siblings('h3').html(data.fallacies[currentHREF].first);
			if(window.touchDevice) content.siblings('nav.major').find("a[href='" + currentHREF + "']").addClass('playing');
			content.find('.description').html(data.home.description);
			content.find('.note').html(data.home.note);
		}else if(newpage=='faq'){
			content = $(data.pages.faq);
		}else if(newpage=='poster'){
			content = $(data.pages.poster);
			content.siblings('h3').html(data.poster.head);
			content.siblings('article').html(data.poster.description);
		}else if(data.fallacies.hasOwnProperty(newpage)){
			type = newpage;
			newpage = 'fallacy';
			content = $(data.pages.fallacy);
			data.current = data.fallacies[type].order;
			prev = data.order[(data.order.length + data.current - 1) % data.order.length];
			next = data.order[(data.current + 1) % data.order.length];
			content.find('.arrows .left a').attr({'href': prev, 'title': data.fallacies[prev].title}).children('span').text(data.fallacies[prev].title);
			content.find('.arrows .right a').attr({'href': next, 'title': data.fallacies[next].title}).children('span').text(data.fallacies[next].title);
			content.siblings('h1').html('<a href="' + type + '" title="' + data.fallacies[type].title + '">' + data.fallacies[type].title + '</a>');
			content.siblings('h3').html(data.fallacies[type].head);
			content.siblings('h3').html(data.fallacies[type].head);
			content.find('.explanation').html(data.fallacies[type].description);
			content.find('.example').html('Example: ' + data.fallacies[type].example);
			document.title = "Your logical fallacy is " + data.fallacies[type].title;
		}else{
			newpage = 'missing';
			content = $(data.pages.missing);
			content.siblings('h1').html(data.missing.title);
			content.siblings('h3').html(data.missing.head);
			content.siblings('article').html(data.missing.description);
		}
		$('.content').attr('class', 'content ' + newpage);
		$('#content-inner').attr('class', type).html(content);
		$('.content footer section span').text('this ' + (newpage=='fallacy' || newpage=='poster' ? newpage : '') + ' to your facebook wall');
		setTimeout(function(){
			$('#content-inner .inter-fallacy').addClass('showing');
		}, 50);
		$('html').scrollTop(0);

		if(newpage!='fallacy') document.title = "Thou shalt not commit logical fallacies" + (newpage=='home' ? '' : ' | ' + newpage);
		_gaq.push(['_trackPageview', '/' + (type || newpage)]);
		page = newpage;

		if(url) window.history.pushState({"href": type || newpage}, type || newpage, url);
	}

	window.onpopstate = function(e){
		if(e.state){
			open(e.state.href);
		}else{
			open(firstpage);
		}
	};
})(window);