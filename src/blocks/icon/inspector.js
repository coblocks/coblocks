
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import applyWithColors from './colors';
import svg from './svgs';
import { DEFAULT_ICON_SIZE } from '.';
import { MIN_ICON_SIZE, MAX_ICON_SIZE } from './edit';
import IconSizeSelect from './icon-size-select';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { InspectorControls, ContrastChecker, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, withFallbackStyles, RangeControl, TextControl, Button, BaseControl, Tooltip, ToggleControl } from '@wordpress/components';

/**
 * Module constants
 */
const NEW_TAB_REL = 'noreferrer noopener';

/**
 * Fallback styles
 */
const { getComputedStyle } = window;
const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { backgroundColor, iconColor } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;
	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackIconColor: iconColor || ! computedStyles ? undefined : computedStyles.color,
	};
} );

/**
 * Inspector controls
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.state = { filteredIcons: svg, searchValue: '', isSearching: false };

		this.onChangeSize = this.onChangeSize.bind( this );
		this.generateMaxPadding = this.generateMaxPadding.bind( this );
		this.onSetNewTab = this.onSetNewTab.bind( this );
	}

	onChangeSize( value, size ) {
		this.props.setAttributes( { iconSize: value } );
		if ( size ) {
			if ( size < 0 ) {
				size = '';
			}
			this.props.setAttributes( { height: size, width: size } );
		}
	}

	// Dynamically set the padding based on icon width.
	// Prevents disapearing icons when the combined padding is more than than width of the icon.
	generateMaxPadding( width ) {
		if ( width <= 60 ) {
			return 10;
		}
		return Math.round( width / 4 );
	}

	onSetNewTab( value ) {
		const { rel } = this.props.attributes;
		const linkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( linkTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! linkTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}

		this.props.setAttributes( {
			linkTarget,
			rel: updatedRel,
		} );
	}

	render() {
		const {
			clientId,
			attributes,
			setAttributes,
			backgroundColor,
			iconColor,
			fallbackBackgroundColor,
			fallbackIconColor,
			setBackgroundColor,
			setIconColor,
			className,
			label = __( 'Size', 'coblocks' ),
			help,
		} = this.props;

		const {
			icon,
			borderRadius,
			padding,
			iconSize,
			width,
			href,
			linkTarget,
			rel,
		} = attributes;

		let iconStyle = 'outlined';

		if ( className.includes( 'is-style-filled' ) ) {
			iconStyle = 'filled';
		}

		const filterList = ( event ) => {
			const filtered = {};

			this.setState( { searchValue: event, isSearching: true } );

			if ( event === '' ) {
				this.setState( { isSearching: false } );
			}

			const updatedList = Object.entries( svg[ iconStyle ] ).filter( function( item ) {
				const text = item[ 0 ] + ' ' + item[ 1 ].keywords;
				return text.toLowerCase().search(
					event.toLowerCase() ) !== -1;
			} );

			filtered.outlined = {};
			filtered.filled = {};
			updatedList.forEach( ( [ key ] ) => {
				filtered.outlined[ key ] = svg.outlined[ key ];
				filtered.filled[ key ] = svg.filled[ key ];
			} );

			this.setState( { filteredIcons: filtered } );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings', 'coblocks' ) }>
						{ iconSize === 'advanced' ?
							<Fragment>
								<div className="components-base-control components-coblocks-icon-block--advanced-size">
									<Button
										className="components-color-palette__clear"
										type="button"
										onClick={ () => {
											document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
											this.onChangeSize( 'medium', DEFAULT_ICON_SIZE );
										} }
										isSmall
										isDefault
										aria-label={ __( 'Reset icon size', 'coblocks' ) }
									>
										{ __( 'Reset', 'coblocks' ) }
									</Button>
									<RangeControl
										label={ __( 'Size', 'coblocks' ) }
										value={ width }
										onChange={ ( nextWidth ) => {
											document.getElementById( 'block-' + clientId ).getElementsByClassName( 'wp-block-coblocks-icon__inner' )[ 0 ].style.height = 'auto';
											setAttributes( { width: nextWidth, height: nextWidth } );
										} }
										min={ padding ? MIN_ICON_SIZE + 28 : MIN_ICON_SIZE }
										max={ MAX_ICON_SIZE }
										step={ 1 }
									/>
								</div>
							</Fragment> :
							<BaseControl label={ label } help={ help }>
								<div className="components-coblocks-icon-size__controls">
									<IconSizeSelect
										setAttributes={ setAttributes }
										iconSize={ iconSize }
										width={ width }
									/>
									<Button
										className="components-color-palette__clear"
										type="button"
										onClick={ () => this.onChangeSize( 'advanced', '' ) }
										isDefault
										isSmall
										aria-label={ __( 'Apply custom size', 'coblocks' ) }
										isPrimary={ iconSize === 'advanced' }
									>
										{ __( 'Custom', 'coblocks' ) }
									</Button>
								</div>
							</BaseControl>
						}
						{ backgroundColor.color &&
							<Fragment>
								<RangeControl
									label={ __( 'Radius', 'coblocks' ) }
									value={ borderRadius }
									onChange={ ( nextBorderRadius ) => setAttributes( { borderRadius: nextBorderRadius } ) }
									min={ 0 }
									max={ 200 }
									step={ 1 }
								/>
								<RangeControl
									label={ __( 'Padding', 'coblocks' ) }
									value={ padding }
									onChange={ ( nextPadding ) => setAttributes( { padding: nextPadding } ) }
									min={ 5 }
									max={ this.generateMaxPadding( width ) }
									step={ 1 }
								/>
							</Fragment>
						}
						<TextControl
							type="text"
							autoComplete="off"
							label={ __( 'Icon Search', 'coblocks' ) }
							value={ this.state.searchValue }
							className="coblocks-icon-types-list__search"
							onChange={ ( evt ) => {
								filterList( evt );
							} }
						/>
						<div className="coblocks-icon-types-list-wrapper">
							<ul className="block-editor-block-types-list coblocks-icon-types-list">
								{ ! this.state.isSearching ?
									<li className="block-editor-block-types-list__list-item selected-svg">
										<Button
											isLarge
											className="editor-block-list-item-button"
											onClick={ () => {
												return false;
											} }
										>
											<span className="block-editor-block-types-list__item-icon">
												{ icon && svg[ iconStyle ][ icon ].icon }
											</span>
										</Button>
									</li> :
									null
								}
								{ Object.keys( this.state.filteredIcons[ iconStyle ] ).length > 0 ?
									Object.keys( this.state.filteredIcons[ iconStyle ] ).map( ( keyName, i ) => {
										return (
											<li key={ `editor-pblock-types-list-item-${ i }` } className={ classnames(
												'block-editor-block-types-list__list-item', {
													'is-selected': icon && ( icon === keyName ),
												},
											) }>
												<Tooltip text={ ( svg[ iconStyle ][ keyName ].label ) ? svg[ iconStyle ][ keyName ].label : keyName }>
													<Button
														isLarge
														className="editor-block-list-item-button"
														onClick={ () => {
															setAttributes( { icon: keyName } );
														} }
													>
														<span className="block-editor-block-types-list__item-icon">
															{ icon && svg[ iconStyle ][ keyName ].icon }
														</span>
													</Button>
												</Tooltip>
											</li>
										);
									} ) :
									<li className="no-results"> { __( 'No results found.', 'coblocks' ) } </li>
								}
							</ul>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Link Settings', 'coblocks' ) }
						initialOpen={ false } >
						<TextControl
							label={ __( 'Link URL', 'coblocks' ) }
							value={ href || '' }
							onChange={ value => setAttributes( { href: value } ) }
							placeholder="https://" />
						<TextControl
							label={ __( 'Link Rel', 'coblocks' ) }
							value={ rel || '' }
							onChange={ value => setAttributes( { rel: value } ) }
						/>
						<ToggleControl
							label={ !! linkTarget ? __( 'Opening in New Tab', 'coblocks' ) : __( 'Open in New Tab', 'coblocks' ) }
							onChange={ this.onSetNewTab }
							checked={ linkTarget === '_blank' } />
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings', 'coblocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								isLargeText: true,
								value: iconColor.color,
								onChange: setIconColor,
								label: __( 'Icon Color', 'coblocks' ),
							},
							{
								value: backgroundColor.color,
								onChange: ( newBackground ) => {
									// Auto assign padding.
									if ( padding === 0 ) {
										setAttributes( { padding: 10 } );
									}

									// Reset padding when colors are cleared.
									if ( ! newBackground ) {
										setAttributes( { padding: 0, borderRadius: 0 } );
									}

									setBackgroundColor( newBackground );
								},
								label: __( 'Background Color', 'coblocks' ),
							},

						] }
					>
						<ContrastChecker
							{ ...{
								iconColor: iconColor.color,
								backgroundColor: backgroundColor.color,
								fallbackIconColor,
								fallbackBackgroundColor,
							} }
						/>
					</PanelColorSettings>
				</InspectorControls>
			</Fragment>
		);
	}
}

export default compose( [
	applyWithColors,
	applyFallbackStyles,
] )( Inspector );
