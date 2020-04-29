<?php 
add_action( 'init', 'rara_gutenberg_select_posted_data' );
function rara_gutenberg_select_posted_data(){
    register_block_type( 'rara/select-control',array(
        'render_callback' => 'render_latest_post_block'
    ) );
}

function render_latest_post_block(){

    $latest_posts = wp_get_recent_posts( array(
        'numberposts' => 3,
        'post_status' => 'publish' 
    ) );

    if( empty ( $latest_posts ) ){
        return '<p>No Posts</p>';
    }
    $posts_output = '<div class="latest-posts-block">';
    foreach( $latest_posts as $post_single ){
        $post_id = $post_single['ID'];
        $post_thumbnail = get_the_post_thumbnail_url( $post_id, 'large' );
        $posts_output .= '<div class="post-title"><img src="'.$post_thumbnail.'" width="100%"/><h2><a href="'.get_permalink( $post_id ).'">'. get_the_title( $post_id ) .'</a></h2></div>';
    }
    $posts_output .= '</div>';

    return $posts_output;
}

add_action( 'rest_api_init','register_rest_images' );
function register_rest_images(){
    register_rest_field( array( 'post' ),
    'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null, 
        )
    );
}
function get_rest_featured_image( $object, $field_name, $request ){
    if( $object[ 'featured_media' ] ){
        $img = wp_get_attachment_image_url( $object[ 'featured_media' ],'large' );
        return $img;
    }
    return false;
}