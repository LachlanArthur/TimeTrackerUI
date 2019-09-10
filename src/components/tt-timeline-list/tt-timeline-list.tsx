import { Component, h, Host, Prop, Watch, State } from '@stencil/core';
import { TimeTrackerCsvItem, TimeTrackerCsvGroup } from '../../classes/time-tracker-item';


@Component( {
	tag: 'tt-timeline-list',
	styleUrl: 'tt-timeline-list.css',
	shadow: true,
} )
export class TtTimelineList {

	@Prop() items: TimeTrackerCsvItem[];

	@State() private groupedItems: Map<string, TimeTrackerCsvGroup> = new Map();

	@State() private startTime: Date;

	@Watch( 'items' )
	updateGroupedItems() {
		this.startTime = this.items[ 0 ].from;

		this.groupedItems = this.items.reduce( ( groups, item ) => {
			const key = [ item.status, item.path, item.name ].join( "\u001f" );
			const group: TimeTrackerCsvGroup = groups.get( key ) || { ...item, items: [] };
			group.items.push( item );
			groups.set( key, group );
			return groups;
		}, new Map<string, TimeTrackerCsvGroup>() );
		console.log( this.groupedItems );
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
