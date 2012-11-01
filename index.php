<?php
	//$base_uri = "http://" . $_SERVER['HTTP_HOST'] . '/yourlogicalfallacyis.com/';
	$base_uri = "http://" . $_SERVER['HTTP_HOST'];
	$i_f = '';
	//$base_uri = "http://" . $_SERVER['HTTP_HOST'];

	if(!isset($_GET['page'])){
		$_GET['page'] = 'home';
	}

	if(isset($_GET['page'])){
		$page = strtolower($_GET['page']);
		if($page!='missing'){
			$file = "data.json";
			$data = file_get_contents($file);
			$json = json_decode($data, true);
  			
			checkPage();

			$json['current'] = 0;
  			$json['order'] = array();
			foreach($json['fallacies'] as $key => $value){
				$json['order'][] = $key;
				$json['fallacies'][$key]['order'] = count($json['order']) - 1;
				$json['fallacies'][$key]['description'] = addPars($json['fallacies'][$key]['description']);
				if($page=='fallacy' && $key==$type) $json['current'] = $json['fallacies'][$key]['order'];
			}
			$json['home']['description'] = addPars($json['home']['description']);
			$json['poster']['description'] = addPars($json['poster']['description']);
			$json['pages'] = array();
			$json['pages']['home'] = get_page('pages/home.php');
			$json['pages']['fallacy'] = get_page('pages/fallacy.php');
			$json['pages']['missing'] = get_page('pages/missing.php');
			$json['pages']['faq'] = get_page('pages/faq.php');
			$json['pages']['poster'] = get_page('pages/poster.php');

			$prev = $json['order'][(count($json['order']) + $json['current'] - 1) % count($json['order'])];
			$next = $json['order'][($json['current'] + 1) % count($json['order'])];
		}else{
			set404();
		}
	}else{
		set404();
	}

	function addPars($s){
		return '<p>' . preg_replace('/(<br\s?\/?>){2}/', '</p><p>', $s) . '</p>';
	}

	function set404(){
		global $page;
		header("HTTP/1.0 404 Not Found");
		$page = 'missing';
	}

	function checkPage(){
		global $page;
		global $json;
		global $type;

		$error = false;
		if(strpos($_SERVER['REQUEST_URI'], 'index')!==false){
			set404();
		}else if($page=='index.php' || $page=='home'){
			$page = 'home';
		}else if($page=='faq'){

		}else if($page=='poster'){

		}else if(isset($json['fallacies'][$page])){
			$type = $page;
			$page = 'fallacy';
		}else{
			set404();
		}
	}

	function get_page($url) {
	    if (is_file($url)) {
	        ob_start();
	        @include $url;
	        return ob_get_clean();
	    }
	    return false;
	}

	function get_faq(){
		global $json;
		$r = '';	
		foreach($json['faq'] as $q)
			$r .= '<article><section class="question">Q. ' . addPars($q['question']) . '</section><section class="answer"><span>A. </span>' . addPars($q['answer']) . '</section></article>';
		return $r;
	}
	
	include 'pages/header.php';
	include 'pages/' . $page . '.php';
	//include 'pages/editor.php';
	include 'pages/footer.php';
?>
