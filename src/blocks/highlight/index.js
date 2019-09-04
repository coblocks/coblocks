/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Highlight' ),
	description: __( 'Draw attention and emphasize important narrative.' ),
	icon,
	keywords: [ __( 'text' ), __( 'paragraph' ), 'coblocks' ],
	example: {
		attributes: {
			content: __( 'Add a highlight effect to paragraph text in order to grab attention and emphasize important narrative.' ),
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
