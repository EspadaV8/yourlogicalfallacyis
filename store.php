<?php
	$base_uri = "http://" . $_SERVER['HTTP_HOST'];
	
	$page = "store";
	$type = false;
	$file = "data.json";
	$data = file_get_contents($file);
	$json = json_decode($data, true);
		
	$json['current'] = 0;
	$json['order'] = array();
	
	include 'pages/header.php';
	include 'pages/store-content.php';
	include 'pages/store-footer.php';
?>
