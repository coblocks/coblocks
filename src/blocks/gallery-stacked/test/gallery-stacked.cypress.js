/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';
import 'cypress-file-upload';

describe( 'Test CoBlocks Gallery Stacked Block', function() {
	/**
	   * Setup Gallery data
	   */
	const galleryData = {
		fileName: '150x150.png',
		imageBase: '150x150',
		pathToFixtures: '../.dev/tests/cypress/fixtures/images/',
		caption: 'Caption Here',
	};

	/**
	   * Test that we can add a gallery-stacked block to the content, not add any images or
	   * alter any settings, and are able to successfully save the block without errors.
	   */
	it( 'Test stacked block saves with empty values.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gallery-stacked' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-stacked' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-stacked' ).find( 'ul' ).should( 'be.empty' );

		helpers.editPage();
	} );

	/**
	   * Test that we can upload images to block and are able
	   * to successfully save the block without errors.
	   */
	it( 'Test stacked block saves with image upload.', function() {
		const { fileName, imageBase, pathToFixtures } = galleryData;
		helpers.addCoBlocksBlockToPage( true, 'gallery-stacked' );

		cy.get( '.wp-block[data-type="coblocks/gallery-stacked"]' )
			.click();

		cy.fixture( pathToFixtures + fileName, 'base64' ).then( fileContent => {
			cy.get( 'div[data-type="coblocks/gallery-stacked"]' )
				.find( 'div.components-drop-zone' ).first()
				.upload(
					{ fileContent, fileName, mimeType: 'image/png' },
					{ subjectType: 'drag-n-drop', force: true, events: [ 'dragstart', 'dragover', 'drop' ] },
				)
				.wait( 2000 ); // Allow upload to finish.

			cy.get( '.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.savePage();

			helpers.checkForBlockErrors( 'gallery-stacked' );

			helpers.viewPage();

			cy.get( '.coblocks-gallery--item' ).find( 'img' ).should( 'have.attr', 'src' ).should( 'include', imageBase );

			helpers.editPage();
		} );
	} );

	/**
	   * Test that we can add image from library and are able
	   * to successfully save the block without errors.
	   */
	it( 'Test stacked block saves with images from media library.', function() {
		helpers.addCoBlocksBlockToPage( true, 'gallery-stacked' );

		cy.get( '.wp-block[data-type="coblocks/gallery-stacked"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-stacked' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-stacked' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-stacked' ).find( 'img' ).should( 'have.attr', 'src' );

		helpers.editPage();
	} );

	/**
       * Test that we can add image captions
       * to successfully save the block without errors.
       */
	it( 'Test stacked block saves with images captions.', function() {
		const { caption } = galleryData;
		helpers.addCoBlocksBlockToPage( true, 'gallery-stacked' );

		cy.get( '.wp-block[data-type="coblocks/gallery-stacked"]' )
			.click()
			.contains( /media library/i )
			.click();

		cy.get( '.media-modal-content' ).contains( /media library/i ).click();

		cy.get( '.media-modal-content' ).find( 'li.attachment' )
			.first( 'li' )
			.click();

		cy.get( 'button' ).contains( /create a new gallery/i ).click();

		cy.get( 'button' ).contains( /insert gallery/i ).click();

		helpers.toggleSettingCheckbox( /captions/i );

		cy.get( '.coblocks-gallery--item' ).first().click()
			.find( 'figcaption' ).click( { force: true } ).type( caption );

		helpers.savePage();

		helpers.checkForBlockErrors( 'gallery-stacked' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-gallery-stacked' ).should( 'exist' );
		cy.get( '.wp-block-coblocks-gallery-stacked' ).contains( caption );

		helpers.editPage();
	} );
} );
