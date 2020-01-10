/*global coblocksBlockData*/

/**
 * Internal dependencies
 */
import TypographyControls from './../../components/typography-controls';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';

class Controls extends Component {
	render() {
		const {
			name,
			attributes,
		} = this.props;

		if ( ! coblocksBlockData.typographyControlsEnabled ) {
			return null;
		}

		let hideToolbar = false;
		const allowedBlocks = [ 'core/paragraph', 'core/heading', 'core/cover', 'core/button', 'core/list', 'coblocks/row', 'coblocks/column', 'coblocks/accordion', 'coblocks/accordion-item', 'coblocks/click-to-tweet', 'coblocks/alert', 'coblocks/pricing-table', 'coblocks/highlight', 'coblocks/features' ];

		attributes.textPanelHideColor = true;
		attributes.textPanelShowSpacingControls = true;

		// Display on the allowedBlocks only.
		if ( ! allowedBlocks.includes( name ) ) {
			attributes.textPanelHideSize = true;
		} else {
			attributes.textPanelHeadingFontSizes = true;
		}

		// Show line height on appropriate blocks.
		if ( ! allowedBlocks.includes( name ) ) {
			attributes.textPanelLineHeight = true;
			attributes.textPanelLetterSpacing = true;
		}

		// Manage options for row and columns
		if ( [ 'coblocks/row', 'coblocks/column' ].includes( name ) ) {
			attributes.textPanelShowSpacingControls = false;
		}

		//do not show if there is no layout for row blocks yet
		if ( [ 'coblocks/row' ].includes( name ) ) {
			if ( ! attributes.layout ) {
				hideToolbar = true;
			}
		}

		if ( ! hideToolbar ) {
			return (
				<Fragment>
					<BlockControls>
						<Toolbar>
							<TypographyControls { ...this.props } />
						</Toolbar>
					</BlockControls>
				</Fragment>
			);
		}

		return null;
	}
}

export default Controls;
