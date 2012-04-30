<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title><?php echo $type ? 'Your logical fallacy is ' . $json['fallacies'][$type]['title'] : 'Thou shalt not commit logical fallacies' . ($page=='home' ? '' : ' | ' . $page);?></title>
<meta name="description" content="<?php echo $page=='fallacy' ? $json['fallacies'][$type]['first'] : $json['site']['description']; ?>" />
<meta property="og:title" content="<?php echo $type ? 'Your logical fallacy is ' . $json['fallacies'][$type]['title'] : 'Thou shalt not commit logical fallacies' . ($page=='home' ? '' : ' | ' . $page);?>"/>
<meta property="og:description" content="<?php echo $page=='fallacy' ? $json['fallacies'][$type]['first'] : $json['site']['description']; ?>" />
<meta property="og:type" content="article"/>
<meta property="og:url" content="<?php echo $base_uri . '/' . ($type ? $type : ($page=='home' ? '' : $page)); ?>"/>
<meta property="og:site_name" content="Thou shalt not commit logical fallacies"/>
<meta property="og:image" content="<?php echo $base_uri . '/assets/share/icon-' . ($page=='fallacy' ? $type : 'share'); ?>.jpg"/>
<base href="<?php echo $base_uri; ?>">
<link href="https://s3.amazonaws.com/yourlogicalfallacyis/css/html5.css" rel="stylesheet" type="text/css"/>
<link href="https://s3.amazonaws.com/yourlogicalfallacyis/css/style.css" rel="stylesheet" type="text/css"/>
<link href="fonts/style.css" rel="stylesheet" type="text/css"/>
<link rel="image_src" type="image/jpeg" href="<?php echo $base_uri . '/assets/share/icon-' . ($page=='fallacy' ? $type : 'share'); ?>.jpg" />
<link rel="icon" type="image/png" href="<?php echo $base_uri . '/assets/favicon.png'; ?>" />
<!--[if lt IE 9]>
<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<!--
<script src="js/jquery.ba-hashchange.min.js"></script>
<script src="js/control.js"></script>
<script src="js/location.js"></script>
-->
<script src="js/combined.js"></script>
<!-- note: analytics and page data are included in the footer -->

</head>

<body>
<section class="bg">
  <section class="top"></section>
  <section class="bottom"></section>
</section>
<section class="content <?php echo $page; ?>">
	<header>
    <a class="title" href="home" title="thou shalt not commit logical fallacies"></a>
  </header>
  <section id="content-inner" class="<?php if(isset($type)) echo $type; ?>">
