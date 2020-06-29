import { TimeTrackerCsvItem } from '../classes/time-tracker-item';

const applicationRegex: Record<string, RegExp> = {

	'Code.exe': /$● /,
	'slack.exe': / \| \d+ new items?$/,

};

export function canonicalName( item: TimeTrackerCsvItem ): string {

	if ( !item.name ) return item.name;

	const appName = item.path.replace( /^.+\//, '' );
	const appRegex = applicationRegex[ appName ];

	if ( appRegex ) {
		return item.name.replace( appRegex, '' ).trim();
	}

	return item.name.replace( /([●]|()|())/, '' ).trim();

}
