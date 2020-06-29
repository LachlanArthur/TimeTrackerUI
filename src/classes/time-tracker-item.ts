export type TimeTrackerCsvItem = {
	from: Date
	to?: Date
	status: string
	path: string
	name: string
}

export type TimeTrackerCsvGroup = {
	path: string
	name: string
	items: TimeTrackerCsvItem[]
	total: number
}

export class TimeTrackerItem {
	status: string
	path: string
	name: string
	intervals: TimeTrackerInterval[] = []

	constructor( data: Partial<TimeTrackerItem> ) {
		Object.assign( this, data );
	}
}

export class TimeTrackerInterval {
	from: Date
	to?: Date
}
