/**
 * BLOCK: Featured Widget
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import './editor.css';
import './style.css';
import edit from './edit.js';
import save from './save.js';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 


registerBlockType( 'rara/cta', {
	title: __( 'Rara: Social Share' ), 
	icon: 'images-alt2', 
	category: 'rara-gutenberg', 
	keywords: [
		__( 'Rara Gutenberg' ),
		__( 'Rara' ),
		__( 'Social Share' ),
		__( 'Rara Social' ),
	],
	edit,
	save,
} );
