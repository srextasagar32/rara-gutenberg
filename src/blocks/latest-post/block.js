/**
 * BLOCK: Featured Widget
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks; 
const { withSelect } = wp.data;

registerBlockType( 'rara/select-control', {
	title: __( 'Rara: Latest Posts' ), 
	icon: 'shield', 
	category: 'rara-gutenberg', 
	keywords: [
		__( 'Rara Gutenberg' ),
		__( 'Rara' ),
		__( 'A Latest Post' ),
	],
	
	
	edit: withSelect ( select => {
		return {
			posts: select( 'core' ).getEntityRecords( 'postType','post',{ per_page: 3 } )
		}
	})( ( { posts,className } ) => {
		if( !posts ){
			return (
				<p className={className} >Loading...</p>
			);
		}
		if( posts.length === 0 ){
			return (
				<p className={className} >No Posts</p>
			);
		}
		return (
			<ul className={className}>
				{posts.map( post=>{
					return (
						
						<li>
							<img src={ post.fimg_url } width="100%" />
							<a href={post.link} >
								{post.title.rendered}
							</a>
						</li>
					);
				} )}
			</ul>	
		)
	} ),
	save: () => {
		return null;
	},
} );
