/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InspectorControls, withColors, PanelColorSettings } from '@wordpress/block-editor';

/**
 * Color Settings
 */
class LabelColorControl extends Component {
	render() {
		const {
			setTextColor,
			textColor,
		} = this.props;

		const colorSettings = [ {
			value: textColor?.color || '',
			onChange: setTextColor,
			label: __( 'Label color', 'coblocks' ),
		} ];

		return (
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'coblocks' ) }
					initialOpen={ false }
					colorSettings={ colorSettings }
				>
				</PanelColorSettings>
			</InspectorControls>
		);
	}
}

export default compose( [
	withColors( { textColor: 'color' } ),
] )( LabelColorControl );
