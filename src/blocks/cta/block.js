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
	title: __( 'Rara: A Call To Action Widget' ), 
	icon: 'images-alt2', 
	category: 'rara-gutenberg', 
	keywords: [
		__( 'Rara Gutenberg' ),
		__( 'Rara' ),
		__( 'Call To Action Widget' ),
		__( 'CTA' ),
	],
	attributes:{
		title:{
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		titlecolor:{
			type:'string',
			default: 'black'
		},
		content:{
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		noofbuttons:{
			type : 'number',
			default : 1,
		},
		text: {
			type: 'string',
			source: 'text',
			selector: 'a',
		},
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},
	edit,
	save,
} );
