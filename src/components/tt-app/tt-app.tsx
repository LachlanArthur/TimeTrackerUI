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

	canonicalName( name: string ): string {
		if ( !name ) return name;
		return name.replace( /[●]/, '' ).trim();
	}

	async loadFile( file: File ) {
		if ( !file ) return;
		const response = await fetch( URL.createObjectURL( file ) );
		const csv = await response.text();
		this.data = parser( csv ).map( line => {
			const [ fromString, status, path, name ] = line;
			const from = new Date( fromString );
			return { from, to: null, status, path, name: this.canonicalName( name ) } as TimeTrackerCsvItem;
		} ).reduceRight( ( items, item, index, originalItems ) => {
			if ( index < originalItems.length - 1 ) {
				item.to = originalItems[ index + 1 ].from || null;
			}
			items[ index ] = item;
			return items;
		}, [] as TimeTrackerCsvItem[] );
	}

	render() {
		return (
			<Host>
				<header>
					<h1>Time Tracker UI</h1>
				</header>

				<input type="file" onChange={e => this.loadFile( ( e.target as HTMLInputElement ).files.item( 0 ) )} />

				<tt-timeline-list items={this.data}></tt-timeline-list>
			</Host>
		);
	}
}
