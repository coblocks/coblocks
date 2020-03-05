/*
 * Include our constants
 */
import * as helpers from '../../../../.dev/tests/cypress/helpers';

describe( 'Test CoBlocks Social Profiles Block', function() {
	/**
	 * Test the coblocks social profiles block saves.
	 */
	it( 'Test the social profiles block saves.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Twitter Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.twitter.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Instagram Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.instagram.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Pinterest Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.pinterest.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add LinkedIn Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.linkedin.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add YouTube Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.youtube.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Yelp Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.yelp.com/test' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Houzz Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.houzz.com/test' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li' )
			.its( 'length' )
			.should( 'equal', 8 );

		cy.get( 'a[title="Facebook"]' )
			.should( 'have.attr', 'href', 'https://www.facebook.com/test' );

		cy.get( 'a[title="Twitter"]' )
			.should( 'have.attr', 'href', 'https://www.twitter.com/test' );

		cy.get( 'a[title="Instagram"]' )
			.should( 'have.attr', 'href', 'https://www.instagram.com/test' );

		cy.get( 'a[title="Pinterest"]' )
			.should( 'have.attr', 'href', 'https://www.pinterest.com/test' );

		cy.get( 'a[title="Linkedin"]' )
			.should( 'have.attr', 'href', 'https://www.linkedin.com/test' );

		cy.get( 'a[title="YouTube"]' )
			.should( 'have.attr', 'href', 'https://www.youtube.com/test' );

		cy.get( 'a[title="Yelp"]' )
			.should( 'have.attr', 'href', 'https://www.yelp.com/test' );

		cy.get( 'a[title="Houzz"]' )
			.should( 'have.attr', 'href', 'https://www.houzz.com/test' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles block styles.
	 */
	it( 'Test the social profiles block styles.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(1)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-mask' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-mask' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(2)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(3)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-text' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-text' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(4)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon-and-text' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-icon-and-text' );

		helpers.editPage();

		cy.get( 'div[data-type="coblocks/social-profiles"]' ).click( { force: true } );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( ! $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		cy.get( '.block-editor-block-styles__item:nth-child(5)' ).click();
		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-circular' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'is-style-circular' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles colors.
	 */
	it( 'Test the social profiles colors.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon Settings' );
		helpers.toggleSettingCheckbox( 'Social Colors' );

		cy.get( 'button[aria-label="Add Facebook Profile"]' )
			.should( 'have.css', 'background-color', 'rgb(49, 55, 60)' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
			.should( 'have.css', 'background-color', 'rgb(49, 55, 60)' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles rounded corners.
	 */
	it( 'Test the social profiles rounded corners.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon Settings' );

		cy.get( 'input[aria-label="Rounded Corners"]' )
			.clear()
			.type( '10' );

		cy.get( 'button[aria-label="Add Facebook Profile"]' )
			.should( 'have.css', 'border-radius', '10px' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
			.should( 'have.css', 'border-radius', '10px' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles button size.
	 */
	it( 'Test the social profiles button size.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Icon Settings' );

		cy.get( '.components-coblocks-inspector__social-button-size select' )
			.select( 'lrg' );

		cy.get( 'button[aria-label="Add Facebook Profile"]' )
			.should( 'have.css', 'width', '84px' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( '.wp-block-coblocks-social-profiles ul li:first-child a' )
			.should( 'have.css', 'width', '66px' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles links input fields.
	 */
	it( 'Test the social profiles links input fields.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.openSettingsPanel( 'Profile Links' );

		cy.get( '.components-social-links-list .components-base-control:nth-child(5) input' )
			.type( 'https://www.linkedin.com/test' );

		cy.get( 'button[aria-label="Add LinkedIn Profile"]' )
			.should( 'not.have.class', 'is-empty' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( 'a[title="Linkedin"]' )
			.should( 'exist' )
			.and( 'have.attr', 'href', 'https://www.linkedin.com/test' );

		helpers.editPage();
	} );

	/**
	 * Test the coblocks social profiles custom classes & top/bottom spacing.
	 */
	it( 'Test the social profiles custom classes and top/bottom spacing.', function() {
		helpers.addCoBlocksBlockToPage( true, 'social-profiles' );

		cy.get( '.wp-block-coblocks-social-profiles button[aria-label="Add Facebook Profile"]' ).click();
		cy.get( '.block-editor-url-input' ).type( 'https://www.facebook.com/test' );

		cy.get( '.components-panel__body-title' ).contains( 'Styles' ).then( ( $panelTop ) => {
			const $parentPanel = Cypress.$( $panelTop ).closest( 'div.components-panel__body' );
			if ( $parentPanel.hasClass( 'is-opened' ) ) {
				$panelTop.click();
			}
		} );

		helpers.addCustomBlockClass( 'my-custom-class', 'social-profiles' );

		helpers.toggleSettingCheckbox( 'Remove Top Spacing' );
		helpers.toggleSettingCheckbox( 'Remove Bottom Spacing' );

		helpers.savePage();

		helpers.checkForBlockErrors( 'social-profiles' );

		helpers.viewPage();

		cy.get( 'div.wp-block-coblocks-social-profiles' )
			.should( 'have.class', 'my-custom-class' );

		helpers.editPage();
	} );
} );
