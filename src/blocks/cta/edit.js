import ButtonCreator from '../../component/button.js'
const { Fragment } = wp.element;
const { 
	RichText,
	InspectorControls,
    ColorPalette,
    URLInput,
} = wp.blockEditor; 
// const {
//     URLInput,
// } = wp.editor;
const { __ } = wp.i18n;
const { PanelBody,RangeControl,Tooltip,TextControl,IconButton } = wp.components;

const edit = ( props ) => {
    const { attributes: { title,titlecolor,content,noofbuttons,text, url },className,isSelected, setAttributes } = props;
    //title
    const onChangeTitle = ( newTitle ) => {
        setAttributes( { title: newTitle } );
    };

    const onChangeTitleColor = ( newTitleColor ) => {
        setAttributes( { titlecolor: newTitleColor } );
    };

    const onChangeContent = ( newContent ) => {
        setAttributes( { content: newContent } );
    };

    const onButtonIncrease = ( newButtonIncrease ) =>{
        setAttributes( { noofbuttons: newButtonIncrease } )
    };

    return ( 
        [
            <InspectorControls>
                <PanelBody title={ __('Title Font Color Settings') }>
                    <p><strong>{ __( 'Select a Title Color:','rara-gutenberg' ) }</strong></p>
                    <ColorPalette value={ titlecolor }
                                onChange={ onChangeTitleColor } />
                </PanelBody>
                {/* <PanelBody title={ __( 'Button Settings' ) }>
					<p><strong>{ __( 'Button Settings' ) }</strong></p>	
					<RangeControl
							label={ 'No of Buttons' }
							value={ noofbuttons }
							onChange={ onButtonIncrease }
							min={ 1 }
							max={ 2 }
							step={ 1 }
                    />
				</PanelBody> */}
                <PanelBody>
                <p><strong>{ __( 'Button Settings' ) }</strong></p>	
                    { isSelected ? (
                        <Fragment>
                            <TextControl 
                                className= 'button-label'
                                label = { __( 'Button Label','rara-gutenberg' ) }
                                placeholder = { __( 'View More','rara-gutenberg' ) }
                                value={ text }
                                onChange={ text => setAttributes( { text } ) }
                            />
                        <p>{ __( 'Link URL', 'rara-gutenberg' ) }</p>
                        <form 
                         className="blocks-format-toolbar__link-modal-line blocks-format-toolbar__link-modal-line"
                         onSubmit={ event => event.preventDefault() }>
                                <URLInput
                                    className="url"
                                    value={ url }
                                    onChange={ url => setAttributes( { url } ) }
                                />
                                <IconButton
                                    icon="editor-break"
                                    label={ __( 'Apply', 'jsforwpblocks' ) }
                                    type="submit"
                                />
                        </form>
                        </Fragment>
                        
                        ): ( 
                            <Fragment>
                                <a className="button-col" href={ url }>
                                    { text || __( 'Edit link', 'jsforwpblocks' ) }
                                </a>
                            </Fragment>
                        ) 
                    }
                </PanelBody>
            </InspectorControls>,
            <div className={className}>
                <RichText
                    key="editable"
                    placeholder="Your CTA Title"
                    tagName="h2"
                    onChange={ onChangeTitle }
                    value={ title }
                    style={ { color: titlecolor } }
                />
                <RichText
					key="editable"
					tagName="p"
					placeholder="Your CTA Description"
					onChange={ onChangeContent }
					value={ content }
				/>
                <div className="button-lists">
                    <a className="button-col" href={ url }>
                        { text }
                    </a>
                </div>
            </div>
        ]
    );
}
export default edit