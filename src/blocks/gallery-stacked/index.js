/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import { GalleryAttributes } from '../../components/block-gallery/shared';
import { BackgroundAttributes } from '../../components/background';
import edit from './edit';
import icons from './icons';
import transforms from './transforms';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Stacked' );

const icon = icons.stacked;

const attributes = {
	...GalleryAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'Display multiple images in an single column stacked gallery.' ),

	category: 'coblocks-galleries',

	keywords: [	__( 'gallery' ), __( 'photos' ) ],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
	},

	transforms,

	edit,

	save,
};

export { name, title, icon, settings };
