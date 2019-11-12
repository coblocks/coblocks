/**
 * Internal dependencies
 */
import rowIcons from './icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export const layoutOptions = {
	2: [
		{ key: '50-50', name: __( 'Equal Split', 'coblocks' ), icon: rowIcons.layout5050, smallIcon: rowIcons.smallLayout5050 },
		{ key: '66-33', name: __( 'Two Thirds / One Third', 'coblocks' ), icon: rowIcons.layout6633, smallIcon: rowIcons.smallLayout6633 },
		{ key: '33-66', name: __( 'One Third / Two Thirds', 'coblocks' ), icon: rowIcons.layout3366, smallIcon: rowIcons.smallLayout3366 },
		{ key: '75-25', name: __( 'Three Quarters / Quarter', 'coblocks' ), icon: rowIcons.layout7525, smallIcon: rowIcons.smallLayout7525 },
		{ key: '25-75', name: __( 'Quarter / Three Quarters', 'coblocks' ), icon: rowIcons.layout2575, smallIcon: rowIcons.smallLayout2575 },
	],
	3: [
		{ key: '33-33-33', name: __( 'Thirds', 'coblocks' ), icon: rowIcons.layout333333, smallIcon: rowIcons.smallLayout333333 },
		{ key: '50-25-25', name: __( 'Half / Quarter / Quarter', 'coblocks' ), icon: rowIcons.layout502525, smallIcon: rowIcons.smallLayout502525 },
		{ key: '25-25-50', name: __( 'Quarter / Quarter/ Half', 'coblocks' ), icon: rowIcons.layout252550, smallIcon: rowIcons.smallLayout252550 },
		{ key: '25-50-25', name: __( 'Quarter / Half / Quarter', 'coblocks' ), icon: rowIcons.layout255025, smallIcon: rowIcons.smallLayout255025 },
		{ key: '20-60-20', name: __( 'One Fifth/ Three Fifths / One Fifth', 'coblocks' ), icon: rowIcons.layout206020, smallIcon: rowIcons.smallLayout206020 },
	],
	4: [
		{ key: '25-25-25-25', name: __( 'Quarters', 'coblocks' ), icon: rowIcons.layout25252525, smallIcon: rowIcons.smallLayout25252525 },
		{ key: '40-20-20-20', name: __( 'Two Fifths / Fifth / Fifth / Fifth', 'coblocks' ), icon: rowIcons.layout40202020, smallIcon: rowIcons.smallLayout40202020 },
		{ key: '20-20-20-40', name: __( 'Fifth / Fifth / Fifth / Two Fifths', 'coblocks' ), icon: rowIcons.layout20202040, smallIcon: rowIcons.smallLayout20202040 },
	],
};
