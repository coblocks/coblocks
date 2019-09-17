/**
 * Internal dependencies
 */
import icons from '../../utils/icons';

/**
 * WordPress dependencies
 */
const { __, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

class Controls extends Component {
	render() {
		const {
			attributes,
			setAttributes,
		} = this.props;

		const {
			count,
			contentAlign,
		} = attributes;

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ contentAlign }
						onChange={ ( nextContentAlign ) => setAttributes( { contentAlign: nextContentAlign } ) }
					/>
					<Toolbar
						className="components-toolbar-coblocks-numeral-controls"
						controls={ '123'.split( '' ).map( ( number ) => ( {
							icon: icons.blank,
							/* translators: %d: number of tables */
							title: sprintf( __( '%d Tables' ), parseInt( number ) ),
							isActive: count === parseInt( number ),
							subscript: number,
							onClick: () => setAttributes( { count: parseInt( number ) } ),
						} )
						) }
					/>
				</BlockControls>
			</Fragment>
		);
	}
}

export default Controls;
