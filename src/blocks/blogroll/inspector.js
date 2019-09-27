/**
 * External dependencies.
 */
import classnames from 'classnames';
import SlickSliderPanel from '../../components/slick-slider-panel';

/**
 * WordPress dependencies.
 */
const { __, _x } = wp.i18n;
const { Fragment } = wp.element;
const { PanelBody, ToggleControl, RangeControl, QueryControls, RadioControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { ENTER, SPACE } = wp.keycodes;

const Inspector = props => {
	const {
		attributes,
		hasPosts,
		editing,
		activeStyle,
		layoutOptions,
		onUpdateStyle,
		setAttributes,
		categoriesList,
	} = props;

	const isCarouselStyle = ( 'carousel' === activeStyle.name );
	const isGridStyle = ( 'grid' === activeStyle.name );

	const postSettingsControls = (
		<PanelBody title={ __( 'Post Settings' ) }>
			<RadioControl
				label={ __( 'Feed' ) }
				selected={ attributes.postFeedType }
				options={ [
					{ label:  __( 'My Blog' ), value: 'internal' },
					{ label: __( 'External Feed' ), value: 'external' },
				] }
				onChange={ ( value ) => setAttributes( { postFeedType: value } ) }
			/>

			{ ( ( ! hasPosts && attributes.postFeedType === 'external' ) || ( editing && attributes.postFeedType === 'internal' ) ) &&
				<Fragment>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ attributes.displayPostDate }
						help={ __( 'Showing the publish date.' ) }
						onChange={ ( value ) => setAttributes( { displayPostDate: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display Link' ) }
						checked={ attributes.displayPostLink }
						help={ __( 'Showing links to individual posts.' ) }
						onChange={ ( value ) => setAttributes( { displayPostLink: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display Excerpt' ) }
						checked={ attributes.displayPostContent }
						help={ __( 'Showing the post excerpt.' ) }
						onChange={ ( value ) => setAttributes( { displayPostContent: value } ) }
					/>
					{ attributes.displayPostContent &&
						<RangeControl
							label={ __( 'Max words in post excerpt' ) }
							value={ attributes.excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 10 }
							max={ 100 }
						/>
					}
				</Fragment>
			}
		</PanelBody>
	);

	const { order, orderBy } = attributes;

	const sortingAndFiltering = (
		<PanelBody title={ __( 'Sorting and Filtering' ) } initialOpen={ false }>
			{ attributes.postFeedType === 'internal' &&
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
				value={ attributes.postsToShow }
				onChange={ ( value ) => setAttributes( { postsToShow: value } ) }
				min={ 2 }
				max={ 20 }
			/>
			{ isGridStyle &&
				<RangeControl
					label={ __( 'Columns' ) }
					value={ attributes.columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					min={ 2 }
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
					{ layoutOptions.map( style => (
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
								{ attributes.showImages ? style.iconWithImages : style.icon }
							</div>
							<div className="editor-block-styles__item-label block-editor-block-styles__item-label">
								{ style.label || style.name }
							</div>
						</div>
					) ) }
				</div>
			</PanelBody>
			{ postSettingsControls }
			{ sortingAndFiltering }
			{ isCarouselStyle &&
				<SlickSliderPanel { ...props } />
			}
		</InspectorControls>
	);
};

export default Inspector;
