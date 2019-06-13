/**
 * Internal dependencies.
 */
import { hasEmptyAttributes } from '../../utils/block-helpers';

/**
 * WordPress dependencies.
 */
const { RichText } = wp.editor;

export default function save( { attributes } ) {
	return hasEmptyAttributes( attributes ) ? null : (
		<div className={ attributes.className }>
			{ attributes.showImage && attributes.itemImage && (
				<figure>
					<img src={ attributes.itemImage } alt={ '' } />
				</figure>
			) }
			<div className="wp-block-coblocks-menu__content">
				<RichText.Content tagName="h4" value={ attributes.itemName } />
				<RichText.Content tagName="p" value={ attributes.itemDescription } />
				{ attributes.showPrice && (
					<RichText.Content
						tagName="p"
						className="wp-block-coblocks-menu__price"
						value={ attributes.itemPrice }
					/>
				) }
			</div>
		</div>
	);
}
