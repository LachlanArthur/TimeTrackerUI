export function parser( rawData: string ): string[][] {
	const rawRows = rawData.trim().split( '\n' );
	const csv: string[][] = [];
	let row: string[] = [];

	for ( let rowIndex = 0; rowIndex < rawRows.length; rowIndex++ ) {

		const currentRow = rawRows[ rowIndex ].split( ',' );
		let cell = '';
		let in_quotes = false;

		for ( var cellIndex = 0; cellIndex < currentRow.length; cellIndex++ ) {

			const currentCell = currentRow[ cellIndex ];
			const quote_start = currentCell.search( '"' ) == 0; // Starts with a quote
			const quote_end = currentCell.substr( 1 ).search( '"' ) == currentCell.length - 2; // Ends with a quote

			if ( quote_start && quote_end ) { // The cell starts and ends with quotes. It's a single cell.
				cell = currentCell.substr( 1, currentCell.length - 2 );
			} else if ( quote_start ) { // The cell is the beginning of several values.
				in_quotes = true;
				cell = currentCell.substr( 1 ) + ',';
			} else if ( quote_end ) { // The cell is the end of several values.
				in_quotes = false;
				cell += currentCell.substr( 0, currentCell.length - 1 );
			} else if ( in_quotes ) { // The cell is in between the start and end quoted cells.
				cell += currentCell + ',';
			} else { // Just a regular, unquoted cell.
				cell = currentCell;
			}

			if ( in_quotes == false ) { // Only add the cell if we have all the values (ie. not inside quotes)
				row.push( cell );
				cell = ''; // Reset the cell for the next run.
			}
		}

		csv.push( row );
		row = []; // Reset the row for the next run.
	}

	return csv;
}
