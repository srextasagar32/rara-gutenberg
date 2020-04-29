import React from 'react';
const { TextControl } = wp.components;
const { __ } = wp.i18n;

const ButtonCreator = ( props ) => {
    const { noofbuttons, link, openinnew, text } = props;
    return(
        <div className="button-row">
                { 
                    Array.from( Array( noofbuttons ), ( e, i) => {
                        return (
                            <a className="button-col" href={link} >
                                <TextControl
                                    className ="button-col-text"
                                    placeholder={ __( 'Link Text', 'jsforwpblocks' ) }
                                    value={ text }
                                    onChange={ text => setAttributes( { text } ) }
                                />
                            </a>
                        )
                    })
                }
        </div> 
    );
}
export default ButtonCreator;