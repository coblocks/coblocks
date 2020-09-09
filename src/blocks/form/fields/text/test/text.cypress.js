/*
 * Include our constants
 */
import * as helpers from '../../../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Form Block', function() {
	/**
	 * Test the coblocks form text field transforms.
	 */
	it( 'should transform from coblocks/field-text block to coblocks/field-date, coblocks/field-name, coblocks/field-textarea, coblocks/field-phone, coblocks/field-website, coblocks/field-hidden', function() {

		let blocksToTransformTo = [
			'Name',
			'Textarea',
			'Date',
			'Phone',
			'Website',
			'Hidden',
		];

		let blocksToRemove = [
			'name',
			'email',
			'textarea',
		];

		helpers.addBlockToPost( 'coblocks/form', true );

		cy.get( '[data-type="coblocks/form"] .components-placeholder' ).then( ( placeholder ) => {
			if ( placeholder.prop( 'outerHTML' ).includes( 'block-editor-block-variation-picker' ) ) {
				cy.get( placeholder )
					.find( '.block-editor-block-variation-picker__variations li:first-child' )
					.find( 'button' ).click( { force: true } );
			} else {
				cy.get( '.block-editor-inner-blocks__template-picker-options li:first-child' )
					.click();

				cy.get( '.block-editor-inner-blocks__template-picker-options' )
					.should( 'not.exist' );
			}
		} );

		// Add the text field to the
		cy.get( '[data-type="coblocks/field-email"]' )
			.click( { force: true } );

		cy.get( '.edit-post-header-toolbar .edit-post-header-toolbar__inserter-toggle' )
			.click()
			.get( '.editor-block-list-item-coblocks-field-text' )
			.click();

		// Remove all unnecessary fields.
		for ( var x = 0; x < blocksToRemove.length; x++ ) {

			cy.get( `[data-type="coblocks/field-${blocksToRemove[ x ]}"]` )
				.click( { force: true } )
				.type( '{backspace}' );

		}

		// Test the transforms work as intended.
		for ( var index = 0; index < blocksToTransformTo.length; index++ ) {

			var textToFind = blocksToTransformTo[ index ];
			var blockName  = blocksToTransformTo[ index ].toLowerCase();

			// Switch the text field to another type.
			cy.get( '[data-type="coblocks/field-text"]' )
				.click( { force: true } );

			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( `.editor-block-list-item-coblocks-field-${blockName}` )
				.click();

			// Check the text field transformed properly.
			helpers.checkForBlockErrors( 'coblocks/form' );

			cy.get( '.block-editor-block-card__title' )
				.contains( textToFind );

			cy.get( `[data-type="coblocks/field-${blockName}"]` )
				.click( { force: true } );

			// Switch it back to the original state to transform to the next type.
			cy.get( '.block-editor-block-switcher__toggle' )
				.click()
				.get( '.editor-block-list-item-coblocks-field-text' )
				.click();

		}

		helpers.savePage();

	} );
} );
