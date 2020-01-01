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
        require_once DFH_PLUGIN_DIR . '/src/php/setup/remove_default_post_type.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/setup_blocks.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/setup_content_types.php';
        require_once DFH_PLUGIN_DIR . '/src/php/setup/setup_textdomain.php';
    }
}
