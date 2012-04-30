  </section>
  <footer>
    <nav class="minor">
      <ul>
        <li class="contact"><a href="faq"><h2>contact us</h2></a>Please read the <a href="faq">FAQs</a> before sending us an <a href="mailto:softduality@gmail.com">email</a>.</li>
        <li class="poster"><a href="poster"><h2>want a free poster?</h2></a>Preview and download hi-res pdfs at A3/A2/A1 sizes.</li>
        <li class="donate"><a href="#donate"><h2>donate</h2></a>Give us money for beer and/or future education projects.
          <form id="paypal" target="_blank" action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="M8Z3NTYLAZWBY">
            <img alt="" border="0" src="https://www.paypalobjects.com/en_AU/i/scr/pixel.gif" width="1" height="1">
          </form>
        </li>
      </ul>
    </nav>
<?php
  include 'nav.php';
?>
    <span class="credits">Created by <a href="http://au.linkedin.com/in/jesserichardsonaustralia" target="_blank" title="Jesse">Jesse Richardson</a>, <a href="http://espadav8.co.uk/" target="_blank" title="Andy">Andy Smith</a> and <a href="http://theprojectsomething.com" target="_blank" title="Som">Som Meaden</a>. <a href="http://creativecommons.org/licenses/by-nc/3.0/" title="Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0)" target="_blank"><img src="https://s3.amazonaws.com/yourlogicalfallacyis/assets/cc.png" border="0" /></a> Website content published under a creative commons attribution and noncommercial license 2012.</span>
    <section><a class="share" href="#share"><span>this <?php echo ($page=='fallacy' ||  $page=='poster' ? $page : ''); ?> to your facebook wall</span></a></section>
  </footer>
</section>
<script type="text/javascript">
  var data = <?php echo json_encode($json); ?>;
  var base = "<?php echo $base_uri; ?>";
  var page = "<?php echo $page; ?>";
  var type = "<?php echo $type; ?>";
  var currentHREF = '<?php echo $i_f ? $json['order'][$i_f] : ''; ?>';
  var firstpage = type || page;

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-12983705-6']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</body>
</html>
