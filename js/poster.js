/**
	IMAGE PREVIEW
**/
$(function(){
	var preview = {};
	$('.poster #content-inner a.preview').on('mouseover', function(e){
		preview.bounds = $(this).offset();
		preview.bounds.right = preview.bounds.left + $(this).width();
		preview.bounds.bottom = preview.bounds.top + $(this).height();
		preview.firstOver = true;
		move($('.poster #preview').attr('class', $(this).data('type')), e);
	}).on('click', function(){
		return false;
	});
	$('.poster #preview').on('mousemove', function(e){
		move($(this), e);
	});

	function move(p, e){
		preview.offset = $('#content-inner').offset();
		preview.over = e.pageX >= preview.bounds.left && e.pageX <= preview.bounds.right && e.pageY >= preview.bounds.top && e.pageY <= preview.bounds.bottom;
		if(preview.over || preview.firstOver){
			preview.firstOver = false;
			p.css({left: e.pageX - preview.offset.left - p.width()/2, top: e.pageY - preview.offset.top - p.height()/2})
		}else{
			p.attr('class', '');
		}
	}
});