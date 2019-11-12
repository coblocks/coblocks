/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { layoutOptions } from './layouts';
import applyWithColors from './colors';
import { BackgroundPanel } from '../../components/background';
import DimensionsControl from '../../components/dimensions-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ButtonGroup, Button, Tooltip, withFallbackStyles } from '@wordpress/components';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;

const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor } = ownProps.attributes;

	const editableNode = node.querySelector( '[contenteditable="true"]' );

	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	render() {
		const {
			attributes,
			backgroundColor,
			clientId,
			setAttributes,
			setBackgroundColor,
			setTextColor,
			textColor,
		} = this.props;

		const {
			columns,
			gutter,
			layout,
			marginBottom,
			marginLeft,
			marginRight,
			marginSize,
			marginTop,
			marginBottomTablet,
			marginLeftTablet,
			marginRightTablet,
			marginTopTablet,
			marginBottomMobile,
			marginLeftMobile,
			marginRightMobile,
			marginTopMobile,
			marginSyncUnits,
			marginSyncUnitsTablet,
			marginSyncUnitsMobile,
			marginUnit,
			paddingBottom,
			paddingLeft,
			paddingRight,
			paddingSize,
			paddingTop,
			paddingBottomTablet,
			paddingLeftTablet,
			paddingRightTablet,
			paddingTopTablet,
			paddingBottomMobile,
			paddingLeftMobile,
			paddingRightMobile,
			paddingTopMobile,
			paddingSyncUnits,
			paddingSyncUnitsTablet,
			paddingSyncUnitsMobile,
			paddingUnit,
			hasMarginControl,
		} = attributes;

		const gutterOptions = [
			{ value: 'no', label: __( 'None', 'coblocks' ) },
			{ value: 'small', label: __( 'Small', 'coblocks' ) },
			{ value: 'medium', label: __( 'Medium', 'coblocks' ) },
			{ value: 'large', label: __( 'Large', 'coblocks' ) },
			{ value: 'huge', label: __( 'Huge', 'coblocks' ) },
		];

		let selectedRows = 1;

		if ( columns ) {
			selectedRows = parseInt( columns.toString().split( '-' ) );
		}

		return (
			<Fragment>
				<InspectorControls>
					{ ( columns && selectedRows >= 1 ) &&
					<Fragment>
						{ layout &&
						<Fragment>
							{ selectedRows > 1 &&
								<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
									<div className="components-coblocks-visual-dropdown">
										<ButtonGroup aria-label={ __( 'Select Row Layout', 'coblocks' ) }>
											{ map( layoutOptions[ selectedRows ], ( { name, key, icon } ) => (
												<Tooltip text={ name }>
													<div className={ ( key === layout ) ? 'components-coblocks-visual-dropdown__button-wrapper is-selected' : 'components-coblocks-visual-dropdown__button-wrapper' }>
														<Button
															className={ ( key === layout ) ? 'components-coblocks-visual-dropdown__button components-coblocks-visual-dropdown__button--selected' : 'components-coblocks-visual-dropdown__button' }
															isSmall
															onClick={ () => {
																const selectedWidth = key.toString().split( '-' );
																const children = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId );
																setAttributes( {
																	layout: key,
																} );

																if ( typeof children[ 0 ].innerBlocks !== 'undefined' ) {
																	map( children[ 0 ].innerBlocks, ( { clientId }, index ) => (
																		wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { width: selectedWidth[ index ] } )
																	) );
																}
															} }
														>
															{ icon }
														</Button>
													</div>
												</Tooltip>
											) ) }
										</ButtonGroup>
									</div>
								</PanelBody>
							}
							{ layout &&
								<Fragment>
									<PanelBody title={ __( 'Row Settings', 'coblocks' ) }>
										{ hasMarginControl &&
											<DimensionsControl { ...this.props }
												type={ 'margin' }
												label={ __( 'Margin', 'coblocks' ) }
												help={ __( 'Space around the container.', 'coblocks' ) }
												valueTop={ marginTop }
												valueRight={ marginRight }
												valueBottom={ marginBottom }
												valueLeft={ marginLeft }
												valueTopTablet={ marginTopTablet }
												valueRightTablet={ marginRightTablet }
												valueBottomTablet={ marginBottomTablet }
												valueLeftTablet={ marginLeftTablet }
												valueTopMobile={ marginTopMobile }
												valueRightMobile={ marginRightMobile }
												valueBottomMobile={ marginBottomMobile }
												valueLeftMobile={ marginLeftMobile }
												unit={ marginUnit }
												syncUnits={ marginSyncUnits }
												syncUnitsTablet={ marginSyncUnitsTablet }
												syncUnitsMobile={ marginSyncUnitsMobile }
												dimensionSize={ marginSize }
											/>
										}
										<DimensionsControl { ...this.props }
											type={ 'padding' }
											label={ __( 'Padding', 'coblocks' ) }
											help={ __( 'Space inside of the container.', 'coblocks' ) }
											valueTop={ paddingTop }
											valueRight={ paddingRight }
											valueBottom={ paddingBottom }
											valueLeft={ paddingLeft }
											valueTopTablet={ paddingTopTablet }
											valueRightTablet={ paddingRightTablet }
											valueBottomTablet={ paddingBottomTablet }
											valueLeftTablet={ paddingLeftTablet }
											valueTopMobile={ paddingTopMobile }
											valueRightMobile={ paddingRightMobile }
											valueBottomMobile={ paddingBottomMobile }
											valueLeftMobile={ paddingLeftMobile }
											unit={ paddingUnit }
											syncUnits={ paddingSyncUnits }
											syncUnitsTablet={ paddingSyncUnitsTablet }
											syncUnitsMobile={ paddingSyncUnitsMobile }
											dimensionSize={ paddingSize }
										/>
										{ selectedRows >= 2 &&
											<SelectControl
												label={ __( 'Gutter', 'coblocks' ) }
												value={ gutter }
												options={ gutterOptions }
												help={ __( 'Space between each column.', 'coblocks' ) }
												onChange={ ( value ) => setAttributes( { gutter: value } ) }
											/>
										}
									</PanelBody>
									<PanelColorSettings
										title={ __( 'Color Settings', 'coblocks' ) }
										initialOpen={ false }
										colorSettings={ [
											{
												value: backgroundColor.color,
												onChange: ( nextBackgroundColor ) => {
													setBackgroundColor( nextBackgroundColor );

													if ( ! paddingSize || paddingSize === 'no' ) {
														setAttributes( { paddingSize: 'medium' } );
													}

													if ( ! nextBackgroundColor ) {
														setAttributes( { paddingSize: 'no' } );
													}
												},
												label: __( 'Background Color', 'coblocks' ),
											},
											{
												value: textColor.color,
												onChange: setTextColor,
												label: __( 'Text Color', 'coblocks' ),
											},
										] }
									>
									</PanelColorSettings>
									<BackgroundPanel { ...this.props }
										hasOverlay={ true }
									/>
								</Fragment>
							}
						</Fragment>
						}
					</Fragment>
					}
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	FallbackStyles,
] )( Inspector );
