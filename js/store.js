$(function(){
	var maxQuantity = 10;
	var costInitial = 20;
	var costSubsequent = 10;
	var costShipping = 19;

	$accordion = $( "#store-accordion" ).accordion({
		autoHeight: false
	});

	function openNextAccordionPanel(){
		var current = $accordion.accordion("option","active"),
    maximum = $accordion.find("h3").length,
    next = current+1 === maximum ? 0 : current+1;
		$accordion.accordion("activate",next);
	}

	$('.step .continue').on('click', function(e){
		e.preventDefault();
		openNextAccordionPanel();
	});


	$('.poster-examples img').on('click', function(){
		var a = $(this).closest('li').attr('class');
		$(".quantity select").select2("val", "0");
		$(".quantity ." + a + " select").select2("val", "1");
		calculate();
	});

	$('.store .email').on('change keyup paste', 'input', function(){
		if($('.store .email [name=email]').val()===$('.store .email [name=confirm]').val()) $('.store .email').addClass('matched');
		else $('.store .email').removeClass('matched');
	});

	var preview = {};
	$('.poster-examples a').on('mouseover', function(e){
		preview.bounds = $(this).offset();
		preview.bounds.right = preview.bounds.left + $(this).width();
		preview.bounds.bottom = preview.bounds.top + $(this).height();
		preview.firstOver = true;
		move($(this).closest('li').find('.preview').show(), e);
	});
	$('.poster-examples .preview').on('mousemove', function(e){
		move($(this), e);
	});

	function move(p, e){
		preview.offset = $('#content-inner').offset();
		preview.over = e.pageX >= preview.bounds.left && e.pageX <= preview.bounds.right && e.pageY >= preview.bounds.top && e.pageY <= preview.bounds.bottom;
		if(preview.over || preview.firstOver){
			preview.firstOver = false;
			p.css({left: e.pageX - preview.offset.left - p.width()/2, top: e.pageY - preview.offset.top - p.height()/2})
		}else{
			p.hide();
		}
	}

	$('.quantity select').select2({
		width: 'element',
		minimumResultsForSearch: 12,
	}).on('change', function(e){
		calculateCost();
	});

	$('#country').select2({
		width: 'element'
	}).on('change', function(e){
		var c = $(this).val(), z = 'Postal', s = 'Locality', cost = 0;

		if(c=="United States"){
			$('.step.shipping').addClass('us');
			z = 'Zip';
			s = 'State'
		}else{
			if(c=='Philippines') z = 'Zip';
			else if(c=='Australia'){
				z = 'Post';
				s = 'State/Territory'
			}else if(c=='Ireland' || c=='United Kingdom') s = 'County';
			else if(c=='Canada' || c=='China') s = 'Province';
			else if(c=='New Zealand'){
				s = 'Town/city'
			}else if(c=='Venezuela' || c=='Mexico' || c=='Brazil') s = 'State';
			else if(c=='India') z = 'PIN'
			$('.step.shipping').removeClass('us');
		}
		setShippingCost(c!="United States");
		
		$('#store-accordion .step.shipping .state span').text(s);
		$('#store-accordion .step.shipping .zip span').text(z);
	});

	$('#us-state').select2({
		width: 'element'
	}).on('change', function(e){
		var s = $(this).val()
		setShippingCost(s=='Alaska' || s=='Hawaii');
	});

	function setShippingCost(b){
		$('.step.shipping .cost').text('$' + (b ? costShipping : 0) + '.00');
	}

	function calculateCost(){
		var t = 0, v = 0, c = 0, n = 0, m = 0;
		$('.quantity select').each(function(){
			v = $(this).val()|0;
			c = v*costSubsequent + (t > 0 || v==0 ? 0 : costInitial - costSubsequent);
			n += v;
			t += c;
			$(this).siblings('.cost').text('$' + c + '.00');
		});
		$('.quantity .total .cost').text('$' + t + '.00');
		t = maxQuantity - n;
		for(var i=1;i<=10;i++){
			if($('.quantity .large select option').length==i) $('.quantity .large select').append('<option>' + i + '</option>');
			if($('.quantity .medium select option').length==i) $('.quantity .medium select').append('<option>' + i + '</option>');
		}
		$('.quantity select option').each(function(){
			v = $(this).parent().val()|0;
			if($(this).index()>v + t) $(this).addClass('remove');
		});
		console.log($('.quantity .large select option'))
		console.log($('.quantity .medium select option'))
		$('.quantity select option.remove').remove();
	}

	$('.quantity label').click(function(){
		$(this).siblings('.select2-container').select2("open");
	});
});