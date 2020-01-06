<?php

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/** @var string[] $missing_plugin_names */
?>

<div class="error notice">
    <p>
        <strong>Error:</strong>
        The <em>Docs for Health</em> plugin won't execute
        because the following required plugin(s) are not active:
        <strong>
            <?php echo esc_html(implode(', ', $missing_plugin_names)); ?>.
        </strong>
        Please activate these plugin(s).
    </p>
</div>
