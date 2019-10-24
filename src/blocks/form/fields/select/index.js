/**
 * Internal dependencies
 */
import { editMultiField } from '../helpers';
import icon from './icon';
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
	title: _x( 'Select', 'block name', 'coblocks' ),
	keywords: [ _x( 'Select', 'block keyword', 'coblocks' ), _x( 'Dropdown', 'block keyword', 'coblocks' ), _x( 'Option', 'block keyword', 'coblocks' ) ],
	description: __( 'A dropdown field with multiple options where only one choice can be made.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/form' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes,
	edit: editMultiField( 'select' ),
	save: () => null,
};

export { name, category, metadata, settings };
