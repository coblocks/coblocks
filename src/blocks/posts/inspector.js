/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import OptionSelectorControl from '../../components/option-selector-control';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ENTER, SPACE } from '@wordpress/keycodes';
import {
	PanelBody,
	QueryControls,
	RadioControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

const Inspector = ( props ) => {
	const {
		attributes,
		activeStyle,
		styleOptions,
		onUpdateStyle,
		setAttributes,
		onUserModifiedColumn,
		categoriesList,
		postCount,
		hasPosts,
		hasFeaturedImage,
	} = props;

	const {
		columns,
		displayPostContent,
		displayPostDate,
		excerptLength,
		imageSize,
		listPosition,
		order,
		orderBy,
		postFeedType,
		postsToShow,
	} = attributes;

	const isHorizontalStyle = ( 'horizontal' === activeStyle.name );

	const sizeOptions = [
		{
			value: 'small',
			label: /* translators: abbreviation for small size */ __( 'S', 'coblocks' ),
			tooltip: /* translators: label for small size option */ __( 'Small', 'coblocks' ),
		},
		{
			value: 'medium',
			label: /* translators: abbreviation for medium size */ __( 'M', 'coblocks' ),
			tooltip: /* translators: label for medium size option */ __( 'Medium', 'coblocks' ),
		},
		{
			value: 'large',
			label: /* translators: abbreviation for large size */ __( 'L', 'coblocks' ),
			tooltip: /* translators: label for large size option */ __( 'Large', 'coblocks' ),
		},
		{
			value: 'huge',
			label: /* translators: abbreviation for extra large size */ __( 'XL', 'coblocks' ),
			tooltip: /* translators: label for extra large size option */ __( 'Huge', 'coblocks' ),
		},
	];

	const columnsCountOnChange = ( selectedColumns ) => {
		setAttributes( { columns:
			( selectedColumns > postsToShow ) ? postsToShow : selectedColumns,
		} );
	};

	const postsCountOnChange = ( selectedPosts ) => {
		const changedAttributes = { postsToShow: selectedPosts };
		if ( columns > selectedPosts || ( selectedPosts === 1 && columns !== 1 ) ) {
			Object.assign( changedAttributes, { columns: selectedPosts } );
		}
		setAttributes( changedAttributes );
	};

	if ( isHorizontalStyle && columns > 2 ) {
		columnsCountOnChange( 2 );
	}

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

	const settings = (
		<PanelBody title={ __( 'Posts Settings', 'coblocks' ) }>
			<Fragment>
				<ToggleControl
					label={ __( 'Post Date', 'coblocks' ) }
					checked={ displayPostDate }
					help={
						displayPostDate ?
							__( 'Showing the publish date.', 'coblocks' ) :
							__( 'Toggle to show the publish date.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostDate: ! displayPostDate } ) }
				/>
				<ToggleControl
					label={ __( 'Post Content', 'coblocks' ) }
					checked={ displayPostContent }
					help={
						displayPostContent ?
							__( 'Showing the post content.', 'coblocks' ) :
							__( 'Toggle to show the post content.', 'coblocks' )
					}
					onChange={ () => setAttributes( { displayPostContent: ! displayPostContent } ) }
				/>
				{ displayPostContent &&
					<RangeControl
						label={ __( 'Max words in content', 'coblocks' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 5 }
						max={ 75 }
					/>
				}
				<RangeControl
					label={ __( 'Columns', 'coblocks' ) }
					value={ columns }
					onChange={ ( value ) => {
						onUserModifiedColumn();
						columnsCountOnChange( value );
					} }
					min={ 1 }
					max={ isHorizontalStyle ? Math.min( 2, postCount ) : Math.min( 4, postCount ) }
					required
				/>
				{ attributes.columns >= 2 &&
					<OptionSelectorControl
						label={ __( 'Gutter', 'coblocks' ) }
						currentOption={ attributes.gutter }
						options={ gutterOptions }
						onChange={ ( gutter ) => setAttributes( { gutter } ) }
					/>
				}
				{ isHorizontalStyle && hasFeaturedImage &&
					<OptionSelectorControl
						label={ __( 'Thumbnail Size', 'coblocks' ) }
						options={ sizeOptions }
						currentOption={ imageSize }
						onChange={ ( newImageSize ) => setAttributes( { imageSize: newImageSize } ) }
					/>
				}

			</Fragment>
		</PanelBody>
	);

	const feedSettings = (
		<PanelBody title={ __( 'Feed Settings', 'coblocks' ) } initialOpen={ ! hasPosts ? true : false }>
			<RadioControl
				selected={ postFeedType }
				options={ [
					{ label: __( 'My Blog', 'coblocks' ), value: 'internal' },
					{ label: __( 'External Feed', 'coblocks' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>
			{ hasPosts ?
				<Fragment>
					{ postFeedType === 'internal' &&
						<QueryControls
							order={ order }
							orderBy={ orderBy }
							categoriesList={ categoriesList }
							selectedCategoryId={ categoriesList.categories }
							onOrderChange={ ( value ) => setAttributes( { order: value } ) }
							onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
							onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						/>
					}
					<RangeControl
						label={ __( 'Number of posts', 'coblocks' ) }
						value={ postsToShow }
						onChange={ ( value ) => postsCountOnChange( value ) }
						min={ 1 }
						max={ 20 }
					/>
				</Fragment> : null }
		</PanelBody>
	);

	return (
		<InspectorControls>
			{ hasPosts ?
				<PanelBody title={ __( 'Styles', 'coblocks' ) } initialOpen={ false }>
					<div className="block-editor-block-styles coblocks-editor-block-styles">
						{ styleOptions.map( ( style ) => (
							<div
								key={ `style-${ style.name }` }
								className={ classnames(
									'block-editor-block-styles__item',
									{
										'is-active': activeStyle === style,
									}
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
									{ listPosition === 'left' && style.iconAlt ? style.iconAlt : style.icon }
								</div>
								<div className="block-editor-block-styles__item-label">
									{ style.label || style.name }
								</div>
							</div>
						) ) }
					</div>
				</PanelBody> : null }
			{ hasPosts ? settings : null }
			{ feedSettings }
		</InspectorControls>
	);
};

export default Inspector;
