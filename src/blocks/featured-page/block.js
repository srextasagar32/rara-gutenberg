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
const { 
	RichText,
	InspectorControls,
	ColorPalette,
} = wp.blockEditor; // Import registerBlockType() from wp.blocks

// const { apiFetch } = wp.apiFetch;
// const { map } = lodash;
// const { withSelect } = wp.data;

const { PanelBody,ToggleControl,SelectControl } = wp.components;

registerBlockType( 'rara/featured-page-widget', {
	title: __( 'Rara: A Featured Page Widget' ), 
	icon: 'shield', 
	category: 'rara-gutenberg', 
	keywords: [
		__( 'Rara Gutenberg' ),
		__( 'Rara' ),
		__( 'A Featured Page Widget' ),
		__( 'Featured Page' ),
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
		selectPage:{
			type: 'string',
			default: 'center'
		},
		showFeaturedImage:{
			type: 'boolean',
			default:true
		},
	},
	
	
	edit: ( props ) => {

		const { attributes: { title,titlecolor,selectPage,showFeaturedImage }, setAttributes } = props;
		

		const postSelections = [];

		const allPosts = wp.apiFetch({path: "/wp/v2/posts"}).then(posts => {
			postSelections.push({label: "Select a Post", value: 0});
			$.each( posts, function( key, val ) {
				postSelections.push({label: val.title.rendered, value: val.id});
			});
			return postSelections;
		});

		//title
		const onChangeTitle = ( newTitle ) => {
            setAttributes( { title: newTitle } );
		};

		const onChangeTitleColor = ( newTitleColor ) => {
			setAttributes( { titlecolor: newTitleColor } );
		};

		const onSelectPage = ( newSelectedPage ) =>{
			setAttributes( { selectPage: newSelectedPage } )
		}

		//show featured image
		const onShowFeaturedImage = () => {
			setAttributes( { showFeaturedImage : !showFeaturedImage } );
		}

		
		return (
			[
				<InspectorControls>
					<PanelBody title={ __('Title Font Color Settings') }>
						<p><strong>{ __( 'Select a Title Color:','rara-gutenberg' ) }</strong></p>
						<ColorPalette value={ titlecolor }
									onChange={ onChangeTitleColor } />
					</PanelBody>
					<PanelBody title={ __( 'Show Featured Image' ) }>
						<ToggleControl 
							label= { __( 'Show Featured Image' ) } 
							checked={ showFeaturedImage }
							onChange = { onShowFeaturedImage }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Select Post' ) }>
						<SelectControl 
							label="--Select--"
							value={ selectPage }
							options = { postSelections }
							onChange= { onSelectPage }
						/>
					</PanelBody>
				</InspectorControls>,
				<div className="featured-page">
					<RichText
						key="editable"
						placeholder="Your Page Title"
						tagName="h2"
						onChange={ onChangeTitle }
						value={ title }
						style={ { color: titlecolor } }
					/>
				</div>
			]
			
		);
	},
	save: ( props ) => {
		const { attributes: { title,titlecolor,selectPage,showFeaturedImage }, setAttributes } = props;

		return (
			<div className="featured-page">
				<h2 style={ { color:titlecolor } }>{ title }</h2>
			</div>
		);
	},
} );
