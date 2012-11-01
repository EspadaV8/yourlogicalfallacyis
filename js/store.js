/**

	Use the Global 'order' to retrieve the item and shipping details.
	eg: 
		console.log(order.items());
		console.log(order.shipping());

	The total cost (listed with the items) should be re-calculated on the back end.

**/

$(function(){
	var order = {
		extras: {
			max: 10,
			surcharge: 10,
		},
		types: {
			poster_sml: {
				title: "16x24” Logical Fallacies Poster",
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
		},
		shipping: {}
	}

	var validEmail = /^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/;
	validate();


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
		if($('#email').val().length && $('.store .email [name=email]').val()===$('.store .email [name=confirm]').val()){
			$('.store .email').addClass('matching');
			order.shipping.email = $('#email').val();
			validate();
		}else{
			$('.two').removeClass('matching valid');
			$('.three').removeClass('active');
		}
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
			$('#state').val('');
			z = 'Zip';
			s = 'State'
		}else{
			$('#us-state').select2("val","")
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
		
		order.shipping.state = '';
		order.shipping.country = c;
		$('#store-accordion .step.shipping .state span').text(s);
		$('#store-accordion .step.shipping .zip span').text(z);
		validate();
	});

	$('#us-state').select2({
		width: 'element'
	}).on('change', function(e){
		var s = $(this).val();
		order.shipping.state = s;
		setShippingCost(s=='Alaska' || s=='Hawaii');
		validate();
	});

	$('.shipping').on('change keyup paste', 'input', function(){
		if($(this).parent().hasClass('address')){
			var a = [];
			$('.shipping .address input').each(function(){
				if(this.value) a.push(this.value);
			});
			order.shipping.address = a.join('\n');
		}else order.shipping[this.id] = this.value;
		if($(this).parent().hasClass('required')) validate();
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
		validate();
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

	($accordion = $( "#store-accordion" ).accordion({
		autoHeight: false,
		clearStyle: true,
		event: null
	})).find('h2').click(function(){
		openAccordianAt(this);
	});

	$('a').on('dragstart', function(){
		return false;
	});

	$(document).mouseup(function(){
		$('body').focus();
	});

	function openNextAccordionPanel(){
		var current = $accordion.accordion("option","active"),
    maximum = $accordion.find("h3").length,
    next = current+1 === maximum ? 0 : current+1;
		$accordion.accordion("activate",next);
	}

	function openAccordianAt(item){
		if($(item).hasClass('valid') || $(item).hasClass('active')) $accordion.accordion("activate", $('#store-accordion h2').index(item));
	}

	$('.step .continue').on('click', function(e){
		e.preventDefault();
		openAccordianAt($(this).closest('article').next());
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
	}).on('click', function(){
		return false;
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



/**
	VALIDATION
**/

	function validate(){
		$('.valid').removeClass('valid no-anim');
		$('.active').removeClass('active');
		$('.one').addClass('active');
		setTimeout(function(){$('.valid').addClass('no-anim')}, 500);
		
		//step one: size
		if(order.types.poster_sml.quantity>0 || order.types.poster_lrg.quantity>0){
			$('.one').addClass('valid');
			$('.two').addClass('active');
		}else return;

		//step two: email
		if(!$("#email").val().match(validEmail)){
			if($("#email").val().length) $('article.two').addClass('invalid').removeClass('matched');
			return;
		}else{
			$('article.two').removeClass('invalid');
			$('.two').addClass('valid');
			$('.three').addClass('active');
		}

		//step three: shipping
		var valid = !!order.shipping.country;
		$('.required input[id]').each(function(){
			if(!$(this).val()) valid = false;
		});
		if(valid && (order.shipping.country!=="United States" || order.shipping.state!=='')){
			$('.three').addClass('valid');
			$('.four').addClass('active');
		}else return;


	}

/**
	GETTERS
**/
	
	window.order = {
		items: function(){
			var o = {};
			for(var i in order.types){
				o[i] = order.types[i].quantity;
			}
			o.cost = order.total|0;
			return o;
		},
		shipping: function(){
			var o = {};
			for(var i in order.shipping){
				o[i] = order.shipping[i];
			}
			return o;
		}
	}
});