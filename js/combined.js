(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
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
		$(window).scrollTop(0, 0);

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
