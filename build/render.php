<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$authors = new WP_User_Query(
	array(
		'role'    => $attributes['role'],
		'orderby' => 'display_name',
		'order'   => 'ASC',
		'number'  => 12,
	)
);
$authors = $authors->get_results();
?>
<ul <?php echo get_block_wrapper_attributes(); ?>>
	<?php
	if ( $authors ) :
		?>
		<?php foreach ( $authors as $author ) : ?>
			<li>
				<a href="<?php echo esc_url( get_author_posts_url( $author->ID ) ); ?>">
					<?php echo get_avatar( $author->ID, 48 ); ?>
					<?php echo esc_html( $author->display_name ); ?>
				</a>
			</li>
		<?php endforeach; ?>
	<?php endif; ?>
</ul>
