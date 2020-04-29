<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Add block category for Rara Gutenberg Blocks.
 *
 * @param array  $categories the array of block categories.
 * @param object $post the post object.
 */
function rara_gutenberg_blocks_category( $categories, $post ) {
	return array_merge(
		array(
			array(
				'slug'  => 'rara-gutenberg',
				'title' => __( 'Rara Gutenberg', 'rara-gutenberg' ),
			),
		),
		$categories
	);
}
add_filter( 'block_categories', 'rara_gutenberg_blocks_category', 10, 2 );

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function multi_block_cgb_block_assets() {
	// Styles.
	wp_enqueue_style(
		'multi_block-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
} // End function multi_block_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'multi_block_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function multi_block_cgb_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'multi_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor','wp-api-fetch','wp-data','wp-components','lodash' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ) // Version: File modification time.
	);

	// Styles.
	wp_enqueue_style(
		'multi_block-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
} // End function multi_block_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'multi_block_cgb_editor_assets' );

include(plugin_dir_path(__FILE__) . 'blocks/latest-post/posts.php');

