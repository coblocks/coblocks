/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { registerBlockType, createBlock, serialize } from '@wordpress/blocks';

/**
 * Internal dependencies.
 */
import { name, settings } from '../index';

// Make variables accessible for all tests.
let block;
let serializedBlock;

describe( 'coblocks/form', () => {
	beforeAll( () => {
		// Register the block.
		registerBlockType( name, { category: 'common', ...settings } );
	} );

	beforeEach( () => {
		// Create the block with the minimum attributes.
		block = createBlock( name );

		// Reset the reused variables.
		serializedBlock = '';
	} );

	it( 'should render with form details', () => {
		block.attributes.subject = 'Form subject';
		block.attributes.submitButtonText = 'Form submit button text';
		block.attributes.to = 'Form to text';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( 'Form subject' );
		expect( serializedBlock ).toContain( 'Form submit button text' );
		expect( serializedBlock ).toContain( 'Form to text' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customBackgroundButtonColor', () => {
		block.attributes.customBackgroundButtonColor = '#da5d5d';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customBackgroundButtonColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );

	it( 'should render with customTextButtonColor', () => {
		block.attributes.customTextButtonColor = '#da5d5d';
		serializedBlock = serialize( block );

		expect( serializedBlock ).toBeDefined();
		expect( serializedBlock ).toContain( '{"customTextButtonColor":"#da5d5d"}' );
		expect( serializedBlock ).toMatchSnapshot();
	} );
} );
