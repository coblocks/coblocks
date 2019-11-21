( function( $ ) {
	'use strict';

	const moreEvents = $( '.wp-block-coblocks-events__more-events-wrapper' );
	const nextPageIconContainer = $( '<div/>', { class: 'coblocks-events__next-page-icon-container' } );
	const previousPageIconContainer = $( '<div/>', { class: 'coblocks-events__previous-page-icon-container' } );
	const nextPageIcon = $( '<div/>', { class: 'next-page-icon' } );
	const previousPageIcon = $( '<div/>', { class: 'previous-page-icon' } );
	let currentPage = 0;

	nextPageIconContainer.append( nextPageIcon );
	previousPageIconContainer.append( previousPageIcon );

	if ( moreEvents ) {
		moreEvents.prepend( previousPageIconContainer );
		moreEvents.append( nextPageIconContainer );
	}

	// Initially set only first page items to be shown
	$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
	$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'flex' );

	previousPageIconContainer.css( 'display', 'none' );

	const totalPageCount = Number( $( '.wp-block-coblocks-event-item' ).last().attr( 'data-page' ) );

	nextPageIconContainer.click( function() {
		currentPage++;
		if ( currentPage === totalPageCount ) {
			nextPageIconContainer.css( 'display', 'none' );
		}
		previousPageIconContainer.css( 'display', 'flex' );
		$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
		$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'flex' );
	} );

	previousPageIconContainer.click( function() {
		currentPage--;
		nextPageIconContainer.css( 'display', 'flex' );
		if ( currentPage === 0 ) {
			previousPageIconContainer.css( 'display', 'none' );
		}
		$( '.wp-block-coblocks-event-item' ).css( 'display', 'none' );
		$( '.wp-block-coblocks-event-item[data-page="' + currentPage + '"]' ).css( 'display', 'flex' );
	} );
}( jQuery ) );
