const {
    RichText 
} = wp.blockEditor;
const { __ } = wp.i18n;

const save = ( props ) => {
    const { attributes: { title,titlecolor,content,noofbuttons,text,url},className, setAttributes } = props;
    return ( 
        <div className={className}>
            <h2 style={ { color:titlecolor } }>{ title }</h2>
            <RichText.Content
                tagName="p"
                value={ content }
            />
            <div className="button-lists">
                <a className="button-col" href={ url }>
                    { text }
                </a>
            </div>
        </div>
    );
}
export default save