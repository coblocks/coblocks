/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

const Inspector = props => {
	const {
		attributes,
		toggleExternalCalendarControls,
		showExternalCalendarControls,
		onChangeVisibleEvents,
		setAttributes,
		innerBlocks,
	} = props;

	const {
		eventsRange,
		eventsToShow,
		externalCalendarUrl,
	} = attributes;

	const eventsRangeOptions = [
		{ value: '1 week', label: __( '1 Week', 'coblocks' ) },
		{ value: '2 weeks', label: __( '2 Weeks', 'coblocks' ) },
		{ value: '1 month', label: __( '1 Month', 'coblocks' ) },
		{ value: 'all', label: __( 'Fetch all', 'coblocks' ) },
	];

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Events Settings', 'coblocks' ) } initialOpen={ true }>
				<ToggleControl
					label={ __( 'Link a Calendar', 'coblocks' ) }
					help={
						showExternalCalendarControls ?
							__( 'Showing public calendar.', 'coblocks' ) :
							__( 'Toggle to link a public calendar.', 'coblocks' )
					}
					checked={ showExternalCalendarControls }
					onChange={ () => toggleExternalCalendarControls() }
				/>
				{ innerBlocks.length > 5 &&
					<RangeControl
						label={ __( 'Events per page', 'coblocks' ) }
						value={ eventsToShow }
						onChange={ onChangeVisibleEvents }
						min={ 5 }
						max={ 15 }
					/>
				}
				{ showExternalCalendarControls && externalCalendarUrl &&
					<SelectControl
						label={ __( 'Period', 'coblocks' ) }
						value={ eventsRange }
						options={ eventsRangeOptions }
						help={ __( 'Show events from the period (100 events max).', 'coblocks' ) }
						onChange={ ( value ) => setAttributes( { eventsRange: value } ) }
					/>
				}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;