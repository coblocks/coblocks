/**
 * Internal dependencies
 */
import edit from './edit';
import icons from './../../../utils/icons';
import save from './save';
import deprecated from './deprecated';
import metadata from './block.json';
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Block constants
 */
const { name } = metadata;

const title = __( 'Column' );

const icon = icons.column;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {

	title,

	description: __( 'An immediate child of a row.' ),

	attributes,

	parent: [ 'coblocks/row' ],

	supports: {
		inserter: false,
	},

	edit,

	getEditWrapperProps( attributes ) {
		const { paddingSize } = attributes;

		// If the column block has children, return the following.
		if ( paddingSize !== 'advanced' && paddingSize === 'no' ) {
			return { 'data-background-dropzone': false };
		}
	},

	save,

	deprecated,
};

export { name, title, icon, settings };
