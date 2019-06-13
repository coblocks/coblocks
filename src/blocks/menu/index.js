/**
 * Internal dependencies.
 */
import './styles/editor.scss';
import './styles/style.scss';

import edit from './edit';
import save from './save';

/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;

/**
 * Block constants.
 */
const name = 'menu';

const title = __( 'Menu' );

const icon = (
	<svg
		className="components-coblocks-svg"
		viewBox="0 0 24 24"
		height="24"
		width="24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g fill="none" fillRule="evenodd">
			<path d="M0 0h24v24H0z" />
			<path
				d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13z"
				fill="currentColor"
				fillRule="nonzero"
			/>
		</g>
	</svg>
);

const keywords = [ __( 'restaurant' ), __( 'food' ), __( 'services' ) ];

const attributes = {
	showImages: { type: 'boolean', default: false },
	showCosts: { type: 'boolean', default: true },
};

const settings = {
	title,

	description: __( 'Display a menu or price list.' ),

	keywords,

	attributes,

	edit,

	save,
};

export { name, title, icon, settings };
