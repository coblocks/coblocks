/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	/* translators: block name.  */
	title: __( 'Name', 'coblocks' ),
	description: __( 'A text field for collecting the first and last names.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'first name', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'last name', 'coblocks' ), 'email' ],
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
		customClassName: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
