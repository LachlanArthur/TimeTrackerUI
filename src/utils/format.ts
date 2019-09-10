export function formatDuration( seconds: number ) {

	let minutes = Math.floor( seconds / 60 );
	seconds -= minutes * 60;

	let hours = Math.floor( minutes / 60 );
	minutes -= hours * 60;

	let output = [];

	if ( hours > 0 ) {
		output.push( `${hours} Hour${hours === 1 ? '' : 's'}` );
	}

	if ( minutes > 0 ) {
		output.push( `${minutes} Minute${minutes === 1 ? '' : 's'}` );
	}

	if ( seconds > 0 ) {
		output.push( `${seconds} Second${seconds === 1 ? '' : 's'}` );
	}

	return output.join( ', ' );

}
