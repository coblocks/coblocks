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
const { __, _x } = wp.i18n;

/**
 * Block constants
 */
const { name, category, attributes } = metadata;

const settings = {
	title: __( 'Dynamic HR' ),
	description: __( 'Add a resizable spacer between other blocks.' ),
	icon,
	keywords: [ __( 'spacer' ), 'hr', 'coblocks' ],
	styles: [
		{ name: 'dots', label: _x( 'Dot', 'block style' ), isDefault: true },
		{ name: 'line', label: _x( 'Line', 'block style' ) },
		{ name: 'fullwidth', label: _x( 'Fullwidth', 'block style' ) },
	],
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
