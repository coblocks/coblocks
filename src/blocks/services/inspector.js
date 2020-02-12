/**
 * External dependencies.
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import HeadingToolbar from '../../components/heading-toolbar';
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl, SelectControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';

const Inspector = ( props ) => {
	const {
		attributes,
		setAttributes,
		activeStyle,
		layoutOptions,
		onChangeHeadingLevel,
		onToggleCtas,
		onUpdateStyle,
	} = props;

	const gutterOptions = [
		{
			value: 'small',
			/* translators: abbreviation for small size */
			label: __( 'S', 'coblocks' ),
			tooltip: __( 'Small', 'coblocks' ),
		},
		{
			value: 'medium',
			/* translators: abbreviation for medium size */
			label: __( 'M', 'coblocks' ),
			tooltip: __( 'Medium', 'coblocks' ),
		},
		{
			value: 'large',
			/* translators: abbreviation for large size */
			label: __( 'L', 'coblocks' ),
			tooltip: __( 'Large', 'coblocks' ),
		},
		{
			value: 'huge',
			/* translators: abbreviation for largest size */
			label: __( 'XL', 'coblocks' ),
			tooltip: __( 'Huge', 'coblocks' ),
		},
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
				<div className={ classnames(
					'block-editor-block-styles',
					'coblocks-editor-block-styles',
				) } >
					{ layoutOptions.map( ( style ) => (
						<div
							key={ `style-${ style.name }` }
							className={ classnames(
								'block-editor-block-styles__item',
								{ 'is-active': activeStyle === style },
								`align-${ ( typeof attributes.alignment === 'undefined' || attributes.alignment === 'none' ) ? style.defaultAlign : attributes.alignment }`
							) }
							onClick={ () => onUpdateStyle( style ) }
							onKeyDown={ ( event ) => {
								if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
									event.preventDefault();
									onUpdateStyle( style );
								}
							} }
							role="button"
							tabIndex="0"
							aria-label={ style.label || style.name }
						>
							<div className="block-editor-block-styles__item-preview">
								{ style.icon }
							</div>
							<div className="block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>
			<PanelBody title={ __( 'Services Settings', 'coblocks' ) }>
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ attributes.columns }
					min={ 1 }
					max={ 4 }
					onChange={ ( columns ) => setAttributes( { columns } ) }
				/>
				{ attributes.columns >= 2 && <OptionSelectorControl
					label={ __( 'Gutter', 'coblocks' ) }
					currentOption={ attributes.gutter }
					options={ gutterOptions }
					onChange={ ( gutter ) => setAttributes( { gutter } ) }
				/> }
				<HeadingToolbar
					minLevel={ 1 }
					maxLevel={ 7 }
					selectedLevel={ attributes.headingLevel }
					onChange={ onChangeHeadingLevel }
				/>

				<ToggleControl
					label={ __( 'Action Buttons', 'coblocks' ) }
					className="components-toggle-control--services-action-button"
					help={
						attributes.buttons ?
							__( 'Showing the call to action buttons.', 'coblocks' ) :
							__( 'Toggle to show call to action buttons.', 'coblocks' )
					}
					checked={ attributes.buttons }
					onChange={ onToggleCtas }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
