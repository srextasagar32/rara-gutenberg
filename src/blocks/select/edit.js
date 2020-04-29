import { withSelect } from '@wordpress/data';
import { Placeholder, Spinner } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
const { __ } = wp.i18n;
const { map } = lodash;

const PostList = ( props ) => {
  const { postList } = props;
  const hasPosts = Array.isArray( postList ) && postList.length;
  if ( ! hasPosts ) {
    return (
      <Placeholder
       icon="excerpt-view"
       label={ __( 'Post Block', '' ) }
      >
	{ ! Array.isArray( postList ) ? <Spinner /> : __( 'No posts found.', '' ) }
      </Placeholder>
    );
  }
  return(
    <Fragment>
      {
        map( postList, ( post ) => {
          return (
	    <div>{ post.title.raw }</div>
          );
      })
      }
    </Fragment>
  );
}

export default withSelect( ( select ) => {
//   const { getEntityRecords } = select( 'core ');
//   const postQuery = {
//     per_page: 10,
//     page: 2
//   }
  return {
   postList: select( 'core' ).getEntityRecords( 'postType', 'post', { per_page: 3 } ),
  }
})(PostList)