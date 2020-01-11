<?php

// see https://www.wpbeginner.com/plugins/how-to-disable-xml-rpc-in-wordpress/
add_filter('xmlrpc_enabled', '__return_false');
