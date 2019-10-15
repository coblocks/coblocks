/**
 * Internal dependencies
 */
import edit from './edit';
import icons from '../../icons';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Name', 'block name' ),
	description: __( 'A text field for names.' ),
	icon: icons.textarea,
	keywords: [ _x( 'first name', 'block keyword' ), _x( 'last name', 'block keyword' ), 'email' ],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	attributes,
	edit,
	save: () => null,
};

export { name, category, metadata, settings };
