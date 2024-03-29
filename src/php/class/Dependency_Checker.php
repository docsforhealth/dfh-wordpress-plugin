<?php

// from https://waclawjacek.com/check-wordpress-plugin-dependencies/

class DFH_Dependency_Checker {
    /**
     * Check if all required plugins are active, otherwise throw an exception.
     *
     * @throws DFH_Missing_Dependencies_Exception
     */
    public function check() {
        $missing_plugins = $this->get_missing_plugins_list();
        if (!empty($missing_plugins)) {
            throw new DFH_Missing_Dependencies_Exception( $missing_plugins );
        }
    }

    /**
     * @return string[] Names of plugins that we require, but that are inactive.
     */
    private function get_missing_plugins_list() {
        $missing_plugins = array();
        foreach (DFH_REQUIRED_PLUGINS as $plugin_name => $main_file_pattern) {
            if (!$this->is_plugin_active($main_file_pattern)) {
                $missing_plugins[] = $plugin_name;
            }
        }
        return $missing_plugins;
    }

    /**
     * @param string $main_file_pattern Regex pattern for main plugin file, as defined in DFH_REQUIRED_PLUGINS
     *
     * @return bool
     */
    private function is_plugin_active($main_file_pattern) {
        return !empty(preg_grep($main_file_pattern, $this->get_active_plugins()));
    }

    /**
     * @return string[] Returns an array of active plugins' main files.
     */
    private function get_active_plugins() {
        return apply_filters('active_plugins', get_option('active_plugins'));
    }
}
