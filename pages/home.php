<?php
	$i_f = $json ? array_rand($json['order']) : '';
?>

  	<?php include 'nav.php'; ?>
    <h1><?php echo $json['fallacies'][$json['order'][$i_f]]['title']; ?></h1>
    <h3><?php echo $json['fallacies'][$json['order'][$i_f]]['first']; ?></h3>
    <span class="sep"></span>
    <article>
      <section class="description"><?php echo $json ? $json['home']['description'] : ''; ?></section>
      <p class="note"><?php echo $json ? $json['home']['note'] : ''; ?></p>
      <p class="share-note">Please help us spread understanding by sharing this site to your facebook wall<br /><a href="#share" class="share" title="share on Facebook"></a></p>
    </article>