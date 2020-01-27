/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Features Block', function() {
	/**
	* Setup Features data
	*/
	const featuresData = {
		backgroundColor: '#ff0000',
		textColor: '#ffffff',
		backgroundColorRGB: 'rgb(255, 0, 0)',
		textColorRGB: 'rgb(255, 255, 255)',
	};

	/**
	   * Test that we can add a features block to the content, not alter
	   * any settings, and are able to successfully save the block without errors.
	   */
	it( 'Test features block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'features' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'features' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	   * Test that we can add a features block to the content, change
       * column count and  are able to successfully save the block without errors.
	   */
	it( 'Test features block allows up to four feature columns.', function() {
		helpers.addCoBlocksBlockToPage( true, 'features' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 2 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click().clear().type( 1 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 1 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click().clear().type( 3 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 3 );

		cy.get( '.edit-post-sidebar' ).find( 'input[aria-label="Columns"]' ).click().clear().type( 4 );

		cy.get( '.wp-block-coblocks-feature' ).should( 'have.length', 4 );

		helpers.savePage();

		helpers.checkForBlockErrors( 'features' );
	} );

	/**
	   * Test that we can add a features block to the content, add text
	   * adjust colors and are able to successfully save the block without errors.
	   */
	it( 'Test features block saves with content values set.', function() {
		const { textColor, backgroundColor, textColorRGB, backgroundColorRGB } = featuresData;
		helpers.addCoBlocksBlockToPage( true, 'features' );

		cy.get( '.wp-block-coblocks-features' ).click( { force: true } ).click();

		helpers.setColorSetting( 'background color', backgroundColor );
		helpers.setColorSetting( 'text color', textColor );

		helpers.savePage();

		helpers.checkForBlockErrors( 'features' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-features__inner' )
			.should( 'have.css', 'background-color', backgroundColorRGB )
			.should( 'have.css', 'color', textColorRGB );

		helpers.editPage();
	} );

	/**
   * Test the features block saves with custom classes
   */
	it( 'Test the features block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'features' );

		cy.get( '.edit-post-sidebar' ).contains( /features settings/i ).click(); //close feature settings panel

		helpers.addCustomBlockClass( 'my-custom-class', 'features' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'features' );

		cy.get( '.wp-block-coblocks-features' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-features' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );
