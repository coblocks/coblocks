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

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Form', 'block name' ),
	description: __( 'Add a simple form to your page.' ),
	icon,
	keywords: [ _x( 'email', 'block keyword' ), _x( 'about', 'block keyword' ), _x( 'contact', 'block keyword' ) ],
	supports: {
		reusable: false,
		html: false,
	},
	example: {
		attributes: {
			subject: __( 'Subject example' ),
		},
	},
	attributes,
	edit,
	save: InnerBlocks.Content,
};

export { name, category, metadata, settings };
