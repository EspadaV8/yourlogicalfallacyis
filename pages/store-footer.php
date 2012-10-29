  </section>
  <footer>
    <span class="credits">Created by <a href="http://au.linkedin.com/in/jesserichardsonaustralia" target="_blank" title="Jesse">Jesse Richardson</a>, <a href="http://espadav8.co.uk/" target="_blank" title="Andy">Andy Smith</a> and <a href="http://theprojectsomething.com" target="_blank" title="Som">Som Meaden</a>. <a href="http://creativecommons.org/licenses/by-nc/3.0/" title="Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0)" target="_blank"><img src="https://s3.amazonaws.com/yourlogicalfallacyis/assets/cc.png" border="0" /></a> Website content published under a creative commons attribution and noncommercial license 2012.</span>
  </footer>
</section>
<script type="text/javascript">
  var data = <?php echo json_encode($json); ?>;
  var base = "<?php echo $base_uri; ?>";
  var page = "<?php echo $page; ?>";
  var type = "<?php echo $type; ?>";
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
