/**
 * External dependencies
 */
import omit from 'lodash/omit';
import includes from 'lodash/includes';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';
import edit from './edit';
import icons from './icons';
import ResponsiveBaseControlAttributes from '../../components/responsive-base-control/attributes';
import dividers from './dividers';
import transforms from './transformations';
import deprecated from './deprecations';
import { save } from './save';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { createBlock } = wp.blocks;

/**
 * Return the appropriate SVG for the block style.
 */
export function getDividerFromStyle( className ) {

	const angled = includes( className, 'is-style-angled' );
	const hills = includes( className, 'is-style-hills' );
	const pointed = includes( className, 'is-style-pointed' );
	const rounded = includes( className, 'is-style-rounded' );
	const sloped = includes( className, 'is-style-sloped' );
	const triangle = includes( className, 'is-style-triangle' );
	const waves = includes( className, 'is-style-waves' );
	const wavy = includes( className, 'is-style-wavy' );

	let divider = dividers.wavy;

	if ( angled ) {
		divider = dividers.angled;
	} else if ( sloped ) {
		divider = dividers.sloped;
	} else if ( triangle ) {
		divider = dividers.triangle;
	} else if ( rounded ) {
		divider = dividers.rounded;
	} else if ( waves ) {
		divider = dividers.waves;
	} else if ( pointed ) {
		divider = dividers.pointed;
	} else if ( hills ) {
		divider = dividers.hills;
	}

	return divider;
}

/**
 * Block constants
 */
const { name } = metadata;

let { attributes } = metadata;
attributes = { ...attributes, ...ResponsiveBaseControlAttributes }

const title = __( 'Shape Divider' );

const icon = icons.shapeDivider;

const keywords = [
	__( 'hr' ),
	__( 'separator' ),
	__( 'svg' ),
];


const settings = {

	title,

	description: __( 'Add a shape divider to visually distinquish page sections.' ),

	keywords,

	attributes,

	supports: {
		align: [ 'wide', 'full' ],
		coBlocksSpacing: true,
	},

	styles: [
		{ name: 'wavy', label: _x( 'Wavy', 'block style' ), isDefault: true },
		{ name: 'hills', label: _x( 'Hills', 'block style' ) },
		{ name: 'waves', label: _x( 'Waves', 'block style' ) },
		{ name: 'angled', label: _x( 'Angled', 'block style' ) },
		{ name: 'sloped', label: _x( 'Sloped', 'block style' ) },
		{ name: 'rounded', label: _x( 'Rounded', 'block style' ) },
		{ name: 'triangle', label: _x( 'Triangle', 'block style' ) },
		{ name: 'pointed', label: _x( 'Pointed', 'block style' ) },
	],

	transforms,

	edit,

	save,

	deprecated,
};

export { name, title, icon, settings, attributes, metadata };

