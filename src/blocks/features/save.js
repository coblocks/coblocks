/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { BackgroundStyles, BackgroundClasses, BackgroundVideo } from '../../components/background';

/**
 * WordPress dependencies
 */
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes, className } ) => {
	const {
		coblocks,
		columns,
		contentAlign,
		customTextColor,
		textColor,
		gutter,
		marginSize,
		paddingSize,
	} = attributes;

	// Body color class and styles.
	const textClass = getColorClassName( 'color', textColor );

	let classes = className;

	if ( coblocks && ( typeof coblocks.id !== 'undefined' ) ) {
		classes = classnames( classes, `coblocks-features-${ coblocks.id }` );
	}

	const innerClasses = classnames(
		'wp-block-coblocks-features__inner',
		...BackgroundClasses( attributes ),
		'columns', {
			[ `columns-${ columns }` ]: columns,
			'columns-responsive': columns > 1,
			'has-text-color': textColor || customTextColor,
			[ textClass ]: textClass,
			'has-padding': paddingSize && paddingSize !== 'no',
			[ `has-${ paddingSize }-padding` ]: paddingSize && ( paddingSize !== 'advanced' && paddingSize !== 'no' ),
			'has-margin': marginSize && marginSize !== 'no',
			[ `has-${ marginSize }-margin` ]: marginSize && ( marginSize !== 'advanced' && marginSize !== 'no' ),
			[ `has-${ gutter }-gutter` ]: gutter,
			[ `has-${ contentAlign }-content` ]: contentAlign,
		} );

	const innerStyles = {
		...BackgroundStyles( attributes ),
		color: textClass ? undefined : customTextColor,
	};

	return (
		<div className={ classes }>
			<div className={ innerClasses } style={ innerStyles }>
				{ BackgroundVideo( attributes ) }
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
