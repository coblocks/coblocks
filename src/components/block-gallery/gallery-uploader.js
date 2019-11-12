
/**
 * Internal dependencies
 */
import * as helper from './../../utils/helper';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { FormFileUpload } from '@wordpress/components';
import { mediaUpload } from '@wordpress/editor';

class GalleryUploader extends Component {
	constructor() {
		super( ...arguments );
		this.addFiles = this.addFiles.bind( this );
		this.uploadFromFiles = this.uploadFromFiles.bind( this );
	}

	uploadFromFiles( event ) {
		this.addFiles( event.target.files );
	}

	addFiles( files ) {
		const currentImages = this.props.attributes.images || [];
		const { noticeOperations, setAttributes } = this.props;
		mediaUpload( {
			allowedTypes: helper.ALLOWED_MEDIA_TYPES,
			filesList: files,
			onFileChange: ( images ) => {
				setAttributes( {
					images: currentImages.concat( images ),
				} );
			},
			onError: noticeOperations.createErrorNotice,
		} );
	}

	render() {
		return (
			<Fragment>
				<div className="coblocks-gallery--figure components-coblocks-gallery-uploader-wrapper">
					<FormFileUpload
						multiple
						isLarge
						className="components-coblocks-gallery-uploader"
						onChange={ this.uploadFromFiles }
						accept="image/*"
						icon="insert"
					>
						<span>{ __( 'Upload an image', 'coblocks' ) }</span>
					</FormFileUpload>
				</div>
			</Fragment>
		);
	}
}

export default GalleryUploader;
