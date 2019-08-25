/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './icons';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import deprecated from './deprecated';
import { BackgroundAttributes } from '../../components/background';
import DimensionsAttributes from '../../components/dimensions-control/attributes';
import CSSGridAttributes from '../../components/grid-control/attributes';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Hero' );

const icon = icons.hero;

const attributes = {
	...CSSGridAttributes,
	...DimensionsAttributes,
	...BackgroundAttributes,
	...ResponsiveBaseControlAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'An introductory area of a page accompanied by a small amount of text and a call to action.' ),

	keywords: [ __( 'button' ),	__( 'cta' ), __( 'call to action' ) ],

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	transforms,

	edit,

	save,

	deprecated,

};

export { name, title, icon, settings };
