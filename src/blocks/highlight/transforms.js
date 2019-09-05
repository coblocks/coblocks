/**
 * Internal dependencies
 */
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
		{
			type: 'raw',
			selector: 'div.wp-block-coblocks-highlight',
			schema: {
				div: {
					classes: [ 'wp-block-coblocks-highlight' ],
				},
			},
		},
		{
			type: 'prefix',
			prefix: ':highlight',
			transform: function( content ) {
				return createBlock( metadata.name, {
					content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				// transforming an empty block
				if ( ! content || ! content.length ) {
					return createBlock( 'core/paragraph' );
				}
				// transforming a block with content
				return createBlock( 'core/paragraph', {
					content: content,
				} );
			},
		},
	],
};

export default transforms;
