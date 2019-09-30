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
import transforms from './transforms';
import { GalleryAttributes } from '../../components/block-gallery/shared';

/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;

/**
 * Block constants.
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Collage', 'block name' ),
	description: __( 'Assemble images into a beautiful collage gallery.' ),
	icon,
	keywords: [ _x( 'gallery', 'block keyword' ), _x( 'photos', 'block keyword' ) ],
	styles: [
		{
			name: 'default',
			label: _x( 'Default', 'block style' ),
			isDefault: true,
		},
		{
			name: 'tiled',
			label: _x( 'Tiled', 'block style' ),
		},
		{
			name: 'layered',
			label: _x( 'Layered', 'block style' ),
		},
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
