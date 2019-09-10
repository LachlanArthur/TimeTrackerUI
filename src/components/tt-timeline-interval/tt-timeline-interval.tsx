import { Component, h, Prop, Host } from '@stencil/core';
import { TimeTrackerCsvItem } from '../../classes/time-tracker-item';


@Component( {
	tag: 'tt-timeline-interval',
	styleUrl: 'tt-timeline-interval.css',
	shadow: true,
} )
export class TtTimelineInterval {

	@Prop() interval: TimeTrackerCsvItem;

	get duration() {
		return ( this.interval.to.valueOf() - this.interval.from.valueOf() ) / 1000;
	}

	render() {
		switch ( this.interval.status.toLowerCase() ) {

			case 'start log':
				return <Host>
					STARTED at {this.interval.from.toLocaleTimeString()}
				</Host>;

			case 'stop log':
				return <Host>
					STOPPED at {this.interval.from.toLocaleTimeString()}
				</Host>;

			case 'idle':
				return <Host>
					IDLE from {this.interval.from.toLocaleTimeString()}
				</Host>;

			case 'active':
				return <Host>
					ACTIVE from {this.interval.from.toLocaleTimeString()} to {this.interval.to.toLocaleTimeString()} ({this.duration} seconds)
				</Host>;

			default:
				return <Host>
					UNKNOWN
				</Host>;

		};
	}

}
