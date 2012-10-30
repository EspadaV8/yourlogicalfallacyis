$(function(){
	var order = {
		extras: {
			max: 10,
			surcharge: 10
		},
		types: {
			poster_sml: {
				title: "18x24” Logical Fallacies Poster",
				cost: 10,
				quantity: 0
			},
			poster_lrg: {
				title: "24x36” Logical Fallacies Poster",
				cost: 10,
				quantity: 0
			},
			shipping: {
				cost: 19,
				quantity: 0
			}
		}
	}


/**
	STEP 1: CHOOSE A SIZE
**/

	$('.poster-examples img').on('click', function(){
		var a = $(this).closest('li').attr('class');
		$(".quantity select").select2("val", "0");
		$(".quantity ." + a + " select").select2("val", "1");
		setPosters();
	});

	$('.quantity label').click(function(){
		$(this).siblings('.select2-container').select2("open");
	});

	$('.quantity select').select2({
		width: 'element',
		minimumResultsForSearch: 12,
	}).on('change', function(e){
		setPosters();
	});



/**
	STEP 2: Email
**/

	$('.store .email').on('change keyup paste', 'input', function(){
		if($('.store .email [name=email]').val()===$('.store .email [name=confirm]').val()) $('.store .email').addClass('matched');
		else $('.store .email').removeClass('matched');
	});



/**
	STEP 3: SHIPPING DETAILS
**/

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



/**
	FUNCTIONS
**/

	function setShippingCost(b){
		$('.step.shipping .cost').text('$' + getCost('shipping', b|0) + '.00');
	}

	function setPosters(){
		var subtotal = 0, total = 0, subqty = 0, qty = 0, remain;
		$('.quantity select').each(function(){
			subqty = $(this).val()|0;
			subtotal = getCost($(this).data('type'), subqty, qty<1);
			qty += subqty;
			total += subtotal;
			$(this).siblings('.cost').text('$' + subtotal + '.00');
		});
		$('.quantity .total .cost').text('$' + total + '.00');
		for(var i=1;i<=10;i++){
			if($('.quantity .large select option').length==i) $('.quantity .large select').append('<option>' + i + '</option>');
			if($('.quantity .medium select option').length==i) $('.quantity .medium select').append('<option>' + i + '</option>');
		}
		remain = order.extras.max - qty;
		$('.quantity select option').each(function(){
			if($(this).index()>($(this).parent().val()|0 + remain)) $(this).addClass('remove');
		});
		$('.quantity select option.remove').remove();
	}

	function getCost(type, qty, addSurcharge){
		order.types[type].quantity = qty;
		var cost = 0;
		for(var t in order.types){
			cost += order.types[t].quantity*order.types[t].cost;
		}
		order.total = cost + order.extras.surcharge;
		$('.step.payment .cost').text('$' + order.total + '.00');
		return order.types[type].cost*qty + (addSurcharge && qty ? order.extras.surcharge : 0);
	}



/**
	ACCORDIAN
**/

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



/**
	IMAGE PREVIEW
**/

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
});