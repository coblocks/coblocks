/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks gist Block', function() {
	//setup gist block data.
	const gistUrl = 'https://gist.github.com/AnthonyLedesma/33ad1a8cd86da3b6bddbdefa432cb51d';

	/**
	 * Test that we can add a gist block to the content, not add any text or
	 * alter any settings, and are able to successfully save the block without errors.
	*/
	it( 'Test gist block saves with color values set.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gist' );

		cy.get( '.wp-block-coblocks-gist' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gist' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	 * Test that we can add a gist block to the content, add a Gist
	 * URL and save without any errors.
	*/
	it( 'Test gist block saves with url.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gist' );

		cy.get( '.wp-block-coblocks-gist' ).find( 'textarea[placeholder="Add GitHub Gist URL…"]' ).clear().invoke( 'val', gistUrl ).type( '#' );

		cy.get( '.wp-block-coblocks-gist' ).find( '.gist-file' ).should( 'exist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gist' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' ).should( 'exist' );

		helpers.editPage();
	} );

	/**
	* Test the Gist block saves with custom classes
	*/
	it( 'Test the gist block custom classes.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gist' );

		cy.get( '.wp-block-coblocks-gist' ).click( { force: true } );

		helpers.addCustomBlockClass( 'my-custom-class', 'gist' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gist' );

		cy.get( '.wp-block-coblocks-gist' )
			.should( 'have.class', 'my-custom-class' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gist' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );
