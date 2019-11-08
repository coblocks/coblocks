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
import { __ } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category } = metadata;

const attributes = {
	...GalleryAttributes,
	...metadata.attributes,
};

const settings = {
	/* translators: block name.  */
	title: __( 'Collage', 'coblocks' ),
	description: __( 'Assemble images into a beautiful collage gallery.', 'coblocks' ),
	icon,
	keywords: [
		/* translators: block keyword.  */
		__( 'gallery', 'coblocks' ),
		/* translators: block keyword.  */
		__( 'photos', 'coblocks' ) ],
	styles: [
		{
			name: 'default',
			label: /* translators: block style.  */ __( 'Default', 'coblocks' ),
			isDefault: true,
		},
		{
			name: 'tiled',
			label: /* translators: block style.  */ __( 'Tiled', 'coblocks' ),
		},
		{
			name: 'layered',
			label: /* translators: block style.  */ __( 'Layered', 'coblocks' ),
		},
	],
	supports: {
		align: [ 'wide', 'full' ],
	},
	example: {
		attributes: {
			gutter: 1,
			images: [
				{ index: '0', url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-1.jpg' },
				{ index: '1', url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-2.jpg' },
				{ index: '2', url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-3.jpg' },
				{ index: '3', url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-4.jpg' },
				{ index: '4', url: '/wp-content/plugins/coblocks/dist/images/examples/gallery-5.jpg' },

			],
		},
	},
	attributes,
	transforms,
	edit,
	save,
};

export { name, category, metadata, settings };
