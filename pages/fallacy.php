    <nav class="inter-fallacy">
      <ul class="arrows">
        <li class="left"><a href="<?php echo $prev; ?>" title="<?php echo $json['fallacies'][$prev]['title']; ?>"><span><?php echo $json['fallacies'][$prev]['title']; ?></span></a></li>
        <li class="right"><a href="<?php echo $next; ?>" title="<?php echo $json['fallacies'][$next]['title']; ?>"><span><?php echo $json['fallacies'][$next]['title'];; ?></span></a></li>
      </ul>
    </nav>
    <h1><?php echo '<a href="' . $type . '" title="' . $json['fallacies'][$type]['title'] . '">' . $json['fallacies'][$type]['title'] . '</a>'; ?></h1>
    <h3><?php echo $json['fallacies'][$type]['head']; ?></h3>
    <article>
      <section class="explanation"><?php echo $json['fallacies'][$type]['description']; ?></section>
      <p class="example">Example: <?php echo $json['fallacies'][$type]['example']; ?></p>
    </article>