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

/**
 * Block constants
 */
const { name, category } = metadata;

const settings = {
	title: _x( 'Share', 'block name', 'coblocks' ),
	description: __( 'Add social sharing links to help you get likes and shares.', 'coblocks' ),
	icon,
	keywords: [ _x( 'social', 'block keyword', 'coblocks' ), 'coblocks' ],
	styles: [
		{ name: 'mask', label: _x( 'Mask', 'block style', 'coblocks' ) },
		{ name: 'icon', label: _x( 'Icon', 'block style', 'coblocks' ), isDefault: true },
		{ name: 'text', label: _x( 'Text', 'block style', 'coblocks' ) },
		{ name: 'icon-and-text', label: _x( 'Icon & Text', 'block style', 'coblocks' ) },
		{ name: 'circular', label: _x( 'Circular', 'block style', 'coblocks' ) },
	],
	example: {
		attributes: {
			facebook: '#',
			twitter: '#',
			pinterest: '#',
			linkedin: '#',
			email: '#',
			tumblr: '#',
			textAlign: 'center',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	edit,
	save() {
		return null;
	},
};

export { name, category, settings };
