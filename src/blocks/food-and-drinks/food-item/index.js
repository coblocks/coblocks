/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __ } = wp.i18n;

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Food Item' ),
	description: __( 'A food and drink item within the Food & Drinks block.' ),
	icon,
	keywords: __( 'menu' ),
	supports: {
		inserter: false,
		customClassName: false,
		reusable: false,
		html: false,
	},
	parent: [ 'coblocks/food-and-drinks' ],
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
