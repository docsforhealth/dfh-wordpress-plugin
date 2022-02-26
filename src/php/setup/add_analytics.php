<?php

add_action('wp_head', 'dfh_add_googleanalytics');
function dfh_add_googleanalytics() { ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156049621-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-156049621-1');
    </script>
<?php
}
