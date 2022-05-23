<?php

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/

class DFH_Setup {

    private $dependency_checker;

    public function init() {
        $this->load_classes();
        // check if required plugin dependencies are present
        $this->dependency_checker = new DFH_Dependency_Checker();
        try {
            $this->dependency_checker->check();
        } catch (DFH_Missing_Dependencies_Exception $e) {
            // The exception contains the names of missing plugins.
            $this->report_missing_dependencies($e->get_missing_plugin_names());
            return;
        }
        // only set-up this plugin if all dependencies are present
        $this->setup_plugin();
    }

    private function load_classes() {
        // exceptions
        require_once DFH_PLUGIN_DIR . '/src/php/class/exception/Missing_Dependencies_Exception.php';
        // dependency checker
        require_once DFH_PLUGIN_DIR . '/src/php/class/Dependency_Checker.php';
        require_once DFH_PLUGIN_DIR . '/src/php/class/Missing_Dependency_Reporter.php';
    }

    private function report_missing_dependencies($missing_plugin_names) {
        $missing_dependency_reporter = new DFH_Missing_Dependency_Reporter($missing_plugin_names);
        $missing_dependency_reporter->bind_to_admin_hooks();
    }

    private function setup_plugin() {
        require_once DFH_PLUGIN_DIR . '/src/php/setup/helpers.php';

        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_block_patterns.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_comments.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_default_post_type.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_default_taxonomies.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_remote_block_directory.php';

        require_once DFH_PLUGIN_DIR . '/src/php/setup/edit_default_page.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/add_analytics.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/security.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/textdomain.php';

        // see `src/js/allow-only-custom-blocks` for hiding core blocks
        require_once DFH_PLUGIN_DIR . '/src/php/setup/blocks.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/dynamic_blocks.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/block_categories.php';

        require_once DFH_PLUGIN_DIR . '/src/php/setup/ajax_load_more.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/custom_content_types.php';
    }
}
