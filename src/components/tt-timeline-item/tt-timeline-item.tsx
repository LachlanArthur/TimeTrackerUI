import { Component, h, Prop, Host } from '@stencil/core';
import { TimeTrackerCsvGroup } from '../../classes/time-tracker-item';
import { formatDuration, duration } from '../../utils/duration';


@Component( {
	tag: 'tt-timeline-item',
	styleUrl: 'tt-timeline-item.css',
	shadow: true,
} )
export class TtTimelineItem {

	@Prop() start: Date;

	@Prop() item: TimeTrackerCsvGroup;

	render() {
		return (
			<Host>
				<div
					class="group"
					style={{
						position: 'relative',
						height: '5px',
					}}
				>
					<div class="title">
						{this.item.name}<br />
						{this.item.path}<br />
						{formatDuration( this.item.total )}
					</div>
					{this.item.items.map( item => {
						if ( duration( item ) > 1 ) {
							return <div
								style={{
									position: 'absolute',
									top: '0',
									left: `calc(${item.from.valueOf() - this.start.valueOf()}px * var(--scale, 1))`,
									width: `calc(${item.to.valueOf() - item.from.valueOf()}px * var(--scale, 1))`,
									background: 'black',
									height: '100%',
								}}
								title={`${item.name}\nfrom ${item.from.toLocaleTimeString()} to ${item.to.toLocaleTimeString()}\n${formatDuration( duration( item ) )}`}
							></div>
							// <tt-timeline-interval interval={item}></tt-timeline-interval>
						}
					} )}
				</div>
			</Host>
		);
	}
}
