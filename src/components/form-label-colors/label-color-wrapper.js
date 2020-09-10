/**
 * External dependencies
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { cloneElement, isValidElement } from '@wordpress/element';
import { hasBlockSupport } from '@wordpress/blocks';

/**
 * Return an element Wrapped with Label Color Properties.
 *
 * @return {JSX.Element} LabelColorWrapper component
 * @param props
 */
function LabelColorWrapper( { children, name, textColor, customTextColor } ) {
	if ( ! hasBlockSupport( name, 'labelColor', false ) ) {
		return children;
	}

	if ( ! isValidElement( children ) ) {
		return children;
	}

	const { className = '' } = children.props;

	const attributes = {
		className: classnames(
			className, {
				'has-text-color': textColor || customTextColor,
				[ `has-${ textColor }-color` ]: textColor,
			} ),
	};

	if ( children.props.style ) {
		attributes.style = {
			...children.props.style,
		};
	}

	if ( !! customTextColor ) {
		attributes.style = {
			...attributes.style,
			color: customTextColor,
		};
	}

	return cloneElement( children, attributes );
}

LabelColorWrapper.propTypes = {
	textColor: PropTypes.string,
	customTextColor: PropTypes.string,
};

export default LabelColorWrapper;

