<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title><?php 
	if($page=='store') echo 'Secure Store | yourlogicalfallacyis.com';
	else echo $type ? 'Your logical fallacy is ' . $json['fallacies'][$type]['title'] : 'Thou shalt not commit logical fallacies' . ($page=='home' ? '' : ' | ' . $page);
?></title>
<meta name="description" content="<?php echo $page=='fallacy' ? $json['fallacies'][$type]['first'] : $json['site']['description']; ?>" />
<meta property="og:title" content="<?php echo $type ? 'Your logical fallacy is ' . $json['fallacies'][$type]['title'] : 'Thou shalt not commit logical fallacies' . ($page=='home' ? '' : ' | ' . $page);?>"/>
<meta property="og:description" content="<?php echo $page=='fallacy' ? $json['fallacies'][$type]['first'] : $json['site']['description']; ?>" />
<meta property="og:type" content="article"/>
<meta property="og:url" content="<?php echo $base_uri . '/' . ($type ? $type : ($page=='home' ? '' : $page)); ?>"/>
<meta property="og:site_name" content="Thou shalt not commit logical fallacies"/>
<meta property="og:image" content="<?php echo $base_uri . '/assets/share/icon-' . ($page=='fallacy' ? $type : 'share'); ?>.jpg"/>
<!--base href="<?php echo $base_uri; ?>"-->
<link href="https://s3.amazonaws.com/yourlogicalfallacyis/css/html5.css" rel="stylesheet" type="text/css"/>
<!--link href="https://s3.amazonaws.com/yourlogicalfallacyis/css/style.css" rel="stylesheet" type="text/css"/-->
<link href="css/style.css" rel="stylesheet" type="text/css"/>
<link href="fonts/style.css" rel="stylesheet" type="text/css"/>
<link rel="image_src" type="image/jpeg" href="<?php echo $base_uri . '/assets/share/icon-' . ($page=='fallacy' ? $type : 'share'); ?>.jpg" />
<link rel="icon" type="image/png" href="<?php echo $base_uri . '/assets/favicon.png'; ?>" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<?php if($page=='store'): ?>
<link href="css/store.css" rel="stylesheet" type="text/css"/>
<link href="css/select2/select2.css" rel="stylesheet" type="text/css"/>
<script src="http://code.jquery.com/ui/1.9.0/jquery-ui.min.js"></script>
<script src="js/store.js"></script>
<script src="js/select2.min.js"></script>
<?php else: ?>
<script src="js/combined.js"></script>
<script src="js/poster.js"></script>
<?php endif; ?>
<!--[if lt IE 9]>
<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!--
<script src="js/jquery.ba-hashchange.min.js"></script>
<script src="js/control.js"></script>
<script src="js/location.js"></script>
-->
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
