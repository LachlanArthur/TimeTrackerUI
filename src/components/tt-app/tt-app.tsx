import { Component, h, Host, State } from '@stencil/core';
import { parser } from '../../utils/csv';
import { TimeTrackerCsvItem } from '../../classes/time-tracker-item';


@Component( {
	tag: 'tt-app',
	styleUrl: 'tt-app.css',
	shadow: true,
} )
export class TtApp {

	@State()
	protected data: TimeTrackerCsvItem[] = [];

	async loadData() {
		const response = await fetch( '/assets/2019-08-13.csv' );
		const csv = await response.text();
		this.data = parser( csv ).map( line => {
			const [ fromString, status, path, name ] = line;
			const from = new Date( fromString );
			return { from, to: null, status, path, name } as TimeTrackerCsvItem;
		} ).reduceRight( ( items, item, index, originalItems ) => {
			if ( index < originalItems.length - 1 ) {
				item.to = originalItems[ index + 1 ].from || null;
			}
			items[ index ] = item;
			return items;
		}, [] as TimeTrackerCsvItem[] );
	}

	componentWillLoad() {
		this.loadData();
	}

	render() {
		return (
			<Host>
				<header>
					<h1>Time Tracker UI</h1>
				</header>

				<tt-timeline-list items={this.data}></tt-timeline-list>
			</Host>
		);
	}
}
