<?php
/**
 * Plugin Name: Rara Gutenberg
 * Plugin URI: https://rarathemes.com/rara-gutenberg/
 * Description: Rara Gutenberg is plugin that made for compantion
 * Author: raratheme
 * Author URI: https://raratheme.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
/**
 * Load Plugin
 */
function rara_gutenberg_blocks_init() {
	/**
	 * Block Initializer.
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
}
add_action( 'plugins_loaded', 'rara_gutenberg_blocks_init' );
