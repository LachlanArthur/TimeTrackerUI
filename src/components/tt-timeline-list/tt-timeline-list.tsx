import { Component, h, Host, Prop, Watch, State } from '@stencil/core';
import { TimeTrackerCsvItem, TimeTrackerCsvGroup } from '../../classes/time-tracker-item';
import { duration } from '../../utils/duration';


@Component( {
	tag: 'tt-timeline-list',
	styleUrl: 'tt-timeline-list.css',
	shadow: true,
} )
export class TtTimelineList {

	@Prop() items: TimeTrackerCsvItem[];

	@State() private groupedItems = new Map<string, TimeTrackerCsvGroup>();

	@State() private startTime: Date;

	@Watch( 'items' )
	updateGroupedItems() {
		this.startTime = this.items[ 0 ].from;

		const allItems = this.items
			.reduce( ( groups, item ) => {
				const key = [ item.status, item.path, item.name ].join( "\u001f" );
				const group: TimeTrackerCsvGroup = groups.get( key ) || { ...item, items: [], total: 0 };
				group.items.push( item );
				group.total += duration( item );
				groups.set( key, group );
				return groups;
			}, new Map<string, TimeTrackerCsvGroup>() );

		const filteredItems = new Map<string, TimeTrackerCsvGroup>();

		for ( const [ key, item ] of allItems.entries() ) {
			if ( item.total > 60 ) {
				filteredItems.set( key, item );
			}
		}

		this.groupedItems = filteredItems;

	}

	render() {
		return (
			<Host>
				{[ ...this.groupedItems.values() ].map( group =>
					<tt-timeline-item start={this.startTime} item={group}></tt-timeline-item>
				)}
			</Host>
		);
	}
}
