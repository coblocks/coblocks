/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import SlickSliderPanel from '../../components/slick-slider-panel';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	QueryControls,
	RadioControl,
	BaseControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';

const Inspector = props => {
	const {
		attributes,
		activeStyle,
		styleOptions,
		onUpdateStyle,
		setAttributes,
		categoriesList,
	} = props;

	const {
		order,
		orderBy,
		postFeedType,
		postsToShow,
		excerptLength,
		displayPostDate,
		displayPostLink,
		displayPostContent,
		columns,
		imageSize,
	} = attributes;

	const isCarouselStyle = ( 'carousel' === activeStyle.name );

	const isGridStyle = ( 'grid' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'w-1/5 h-1/5',
			label: _x( 'Small', 'label for small size option' ),
			shortName: _x( 'S', 'abbreviation for "Small" size' ),
		},
		{
			value: 'w-1/3 h-1/3',
			label: _x( 'Medium', 'label for medium size option' ),
			shortName: _x( 'M', 'abbreviation for "Medium" size' ),
		},
		{
			value: 'w-1/2 h-1/2',
			label: _x( 'Large', 'label for large size option' ),
			shortName: _x( 'L', 'abbreviation for "Large" size' ),
		},
	];

	const settings = (
		<PanelBody title={ __( 'Blogroll Settings' ) }>
			<RadioControl
				label={ __( 'Feed' ) }
				selected={ postFeedType }
				options={ [
					{ label: __( 'My Blog' ), value: 'internal' },
					{ label: __( 'External Feed' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ postFeedType === 'internal' &&
				<Fragment>
					{ ! isGridStyle && ! isCarouselStyle &&
						<BaseControl label={ __( 'Thumbnail Size' ) } className="components-coblocks-blogroll-thumbnail-size">
							<ButtonGroup aria-label={ __( 'Thumbnail Size' ) }>
								{ sizeOptions.map( ( option ) => {
									const isCurrent = imageSize === option.value;
									return (
										<Button
											key={ `option-${ option.value }` }
											isLarge
											isPrimary={ isCurrent }
											aria-pressed={ isCurrent }
											onClick={ () => setAttributes( { imageSize: option.value } ) }
										>
											{ option.label }
										</Button>
									);
								} ) }
							</ButtonGroup>
						</BaseControl>
					}
					<ToggleControl
						label={ __( 'Post Date' ) }
						checked={ displayPostDate }
						help={
							displayPostDate ?
								__( 'Showing the publish date.' ) :
								__( 'Toggle to show the publish date.' )
						}
						onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
					/>
					<ToggleControl
						label={ __( 'Post Content' ) }
						checked={ displayPostContent }
						help={
							displayPostContent ?
								__( 'Showing the post excerpt.' ) :
								__( 'Toggle to show the post excerpt.' )
						}
						onChange={ () => setAttributes( { displayPostContent: ! displayPostContent } ) }
					/>
					{ displayPostContent &&
						<RangeControl
							label={ __( 'Max words in excerpt' ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 5 }
							max={ 75 }
						/>
					}
				</Fragment>
			}
		</PanelBody>
	);

	const sortingAndFiltering = (
		<PanelBody title={ __( 'Sorting and Filtering' ) } initialOpen={ postFeedType === 'external' ? true : false }>
			{ postFeedType === 'internal' &&
				<QueryControls
					{ ...{ order, orderBy } }
					categoriesList={ categoriesList }
					selectedCategoryId={ categoriesList.categories }
					onOrderChange={ ( value ) => setAttributes( { order: value } ) }
					onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
					onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
				/>
			}
			<RangeControl
				label={ __( 'Number of items' ) }
				value={ postsToShow }
				onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
				min={ 1 }
				max={ 20 }
			/>
			{ isGridStyle &&
				<RangeControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					min={ 1 }
					max={ 4 }
					required
				/>
			}
		</PanelBody>
	);

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Styles' ) } initialOpen={ false }>
				<div className="editor-block-styles block-editor-block-styles coblocks-editor-block-styles">
					{ styleOptions.map( style => (
						<div
							key={ `style-${ style.name }` }
							className={ classnames(
								'editor-block-styles__item block-editor-block-styles__item',
								{
									'is-active': activeStyle === style,
								}
							) }
							onClick={ () => onUpdateStyle( style ) }
							onKeyDown={ event => {
								if ( ENTER === event.keyCode || SPACE === event.keyCode ) {
									event.preventDefault();
									onUpdateStyle( style );
								}
							} }
							role="button"
							tabIndex="0"
							aria-label={ style.label || style.name }
						>
							<div className="editor-block-styles__item-preview block-editor-block-styles__item-preview">
								{ style.icon }
							</div>
							<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>
			{ settings }
			{ sortingAndFiltering }
			{ isCarouselStyle &&
				<SlickSliderPanel { ...props } />
			}
		</InspectorControls>
	);
};

export default Inspector;
