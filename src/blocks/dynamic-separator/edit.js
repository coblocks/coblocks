/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import applyWithColors from './colors';

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { ResizableBox } from '@wordpress/components';

/**
 * Block edit function
 */
class DynamicSeparatorEdit extends Component {
	render() {
		const {
			attributes,
			className,
			isSelected,
			setAttributes,
			color,
		} = this.props;

		const { height } = attributes;

		const hrClasses = classnames( className, 'wp-block-separator', {
			'is-selected': isSelected,
			'has-text-color': color.color,
			[ color.class ]: color.class,
			'is-style-dots': ! className.includes( 'is-style-line' ) && ! className.includes( 'is-style-fullwidth' ) && ! className.includes( 'is-style-dots' ),
		} );

		return (
			<Fragment>
				{ isSelected && <Inspector { ...this.props } /> }
				<ResizableBox
					className={ hrClasses }
					style={ {
						color: color.color,
					} }
					size={ {
						height,
					} }
					minHeight="20"
					minWidth="100%"
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( _event, _direction, _elt, delta ) => {
						const spacerHeight = parseInt( height + delta.height, 10 );
						setAttributes( {
							height: spacerHeight,
						} );
					} }
				/>
			</Fragment>
		);
	}
}

export default compose( [ applyWithColors ] )( DynamicSeparatorEdit );
