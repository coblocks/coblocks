/**
 * Internal dependencies
 */
import ResponsiveTabsControl from '../../components/responsive-tabs-control';
import SizeControl from '../../components/size-control';
import captionOptions from '../../components/block-gallery/options/caption-options';
import GalleryLinkSettings from '../../components/block-gallery/gallery-link-settings';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, SelectControl } = wp.components;

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );
		this.setCaptionStyleTo = this.setCaptionStyleTo.bind( this );
		this.setShadowTo = this.setShadowTo.bind( this );
	}

	setCaptionStyleTo( value ) {
		this.props.setAttributes( { captionStyle: value } );
	}

	getCaptionsHelp( checked ) {
		return checked ? __( 'Showing captions for each media item.' ) : __( 'Toggle to show media captions.' );
	}

	setShadowTo( value ) {
		this.props.setAttributes( { shadow: value } );
	}

	render() {
		const {
			attributes,
			setAttributes,
			enableGutter,
			enableCaptions,
		} = this.props;

		const {
			gutter,
			shadow,
			captions,
			captionStyle,
		} = attributes;

		const gutterOptions = [
			{ value: '1', label: __( 'Small' ) },
			{ value: '2', label: __( 'Medium' ) },
			{ value: '3', label: __( 'Large' ) },
			{ value: '4', label: __( 'Huge' ) },
		];

		return (
			<InspectorControls>
				<PanelBody title={ __( 'Collage Settings' ) }>
					{ enableGutter && <SelectControl
						label={ __( 'Gutter' ) }
						value={ gutter }
						options={ gutterOptions }
						onChange={ ( value ) => setAttributes( { gutter: value } ) }
					/> }
					{ ! enableGutter && <SizeControl { ...this.props }
						onChange={ this.setShadowTo }
						value={ shadow }
						label={ __( 'Shadow' ) }
						reset={ false }
						className={ 'components-coblocks-size-control--shadow' }

					/>
					}
					{ enableCaptions && <ToggleControl
						label={ __( 'Captions' ) }
						checked={ !! captions }
						onChange={ () => setAttributes( { captions: ! captions } ) }
						help={ this.getCaptionsHelp }
					/> }
					{ captions && <SelectControl
						label={ __( 'Caption Style' ) }
						value={ captionStyle }
						onChange={ this.setCaptionStyleTo }
						options={ captionOptions }
					/> }
				</PanelBody>
				<GalleryLinkSettings { ...this.props } />
			</InspectorControls>
		);
	}
}

export default Inspector;
