/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
const { __, _x } = wp.i18n;
const { compose } = wp.compose;
const { Component, Fragment } = wp.element;
const { mediaUpload } = wp.editor;
const { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, withColors } = wp.blockEditor;
const { Button, Dashicon, DropZone } = wp.components;

class AuthorEdit extends Component {
	constructor() {
		super( ...arguments );
		this.addImage = this.addImage.bind( this );
		this.onSelectImage = this.onSelectImage.bind( this );
	}

	onSelectImage( media ) {
		if ( media && media.url ) {
			this.props.setAttributes( { imgUrl: media.url } );
		}
	}

	addImage( files ) {
		mediaUpload( {
			allowedTypes: [ 'image' ],
			filesList: files,
			onFileChange: ( [ media ] ) => this.onSelectImage( media ),
		} );
	}

	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			backgroundColor,
			textColor,
		} = this.props;

		const {
			biography,
			imgUrl,
			name,
		} = attributes;

		const dropZone = (
			<DropZone
				onFilesDrop={ this.addImage }
				label={ __( 'Drop to add as avatar' ) }
			/>
		);

		const classes = classnames(
			className, {
				'has-background': backgroundColor.color,
				'has-text-color': textColor.color,
				[ backgroundColor.class ]: backgroundColor.class,
				[ textColor.class ]: textColor.class,
			}
		);

		const styles = {
			backgroundColor: backgroundColor.color,
			color: textColor.color,
		}

		const onUploadImage = ( media ) => setAttributes( { imgUrl: media.url, imgId: media.id } );

		return (
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ classes } style={ styles }>
					{ dropZone }
					<div className={ `${ className }__avatar` }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onUploadImage }
								allowedTypes={ [ 'image' ] }
								value={ imgUrl }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ ! imgUrl ?
											<Dashicon icon="format-image" /> :
											<img className={ `${ className }__avatar-img` }
												src={ imgUrl }
												alt="avatar"
											/>
										}
									</Button>
								) }
							>
							</MediaUpload>
						</MediaUploadCheck>
					</div>
					<div className={ `${ className }__content` }>
						<RichText
							identifier="name"
							multiline={ false }
							tagName="span"
							className={ `${ className }__name` }
							placeholder={
								// translators: placeholder text used for the author name
								__( 'Write author name…' )
							}
							value={ name }
							onChange={ ( nextName ) => {
								setAttributes( { name: nextName } );
							} }
						/>
						<RichText
							identifier="biography"
							multiline={ false }
							tagName="p"
							className={ `${ className }__biography` }
							placeholder={
								// translators: placeholder text used for the biography
								__( 'Write a biography that distills objective credibility and authority to your readers…' )
							}
							value={ biography }
							onChange={ ( nextBio ) => {
								setAttributes( { biography: nextBio } );
							} }
						/>
						<InnerBlocks
							template={ [ [ 'core/button', { placeholder: _x( 'Author link...', 'content placeholder' ) } ] ] }
							templateLock="all"
							allowedBlocks={ [ 'core/button' ] }
							templateInsertUpdatesSelection={ false }
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( AuthorEdit );
