import { ForecastData, SectionData } from './types'

// example tooltips for visualization purposes.
export const tooltips = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  'Tempor incididunt ut labore et dolore magna aliqua.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Deserunt mollit anim id est laborum'
]

export function formatFyData(fy: string, { headers, fiscalYears, rows }: ForecastData): SectionData | null {
  // Find the index of the fiscal year we are currently interested in.
  // We can later use that to index into the "rows" array in the forecast data.
  const fyIdx = fiscalYears.findIndex(fyear => fyear === fy);

  // We aren't interested in continuing if we couldn't find the fy.
  if (fyIdx === -1) {
    return null;
  }

  let values = [];
  // Here we iterate over each of the headers and take their index.
  // We do this because we can use that index together with the fy index to fetch data
  // from the rows array.
  for (let headerIdx = 0; headerIdx < headers.length; headerIdx++) {
    // Since the number of data entries found in the 'rows' array should be the same
    // amount as fiscalYears.length * headers.length, we can use that fact to index into the rows.
    //
    // Example: 
    // We have 5 fiscal years and 2 headers/categories/titles/whatever and we know that the incoming
    // row data is aligned in a single dimensional array.
    // We know that the amount of values per row is the same amount as the amount of fiscal years and we know that the
    // amount of headers equals the amount of rows. This fact allows us to move between rows using the header index,
    // and the row values using the fiscal year index. So, using headerIdx * fiscalYears.length, we can find the row we want.
    // Adding the fiscal year index of the currently handled fiscal year we can find the values we are looking for.
    //
    // This essentially turns the row based backend data into sectioned off column data instead which allows us to split it up into separate components we can render without them being
    // dependent on each other.
    values.push(rows[(headerIdx * fiscalYears.length) + fyIdx])
  }

  return {
    header: fy,
    values
  }
}

// here we want to calculate the sum of all values for each row.
export function calculateTotals({ headers, fiscalYears, rows }: ForecastData): SectionData {
  let totalSection: SectionData = {
    header: 'Total',
    values: []
  }

  // this accumulation is done in a similar sense to how we fetch data above.
  for (let headerIdx = 0; headerIdx < headers.length; headerIdx++) {
    // define temporary variables for the current table row
    let budget = 0;
    let forecast = 0;

    // fetch row data from the incoming forecast data
    for (let fyIdx = 0; fyIdx < fiscalYears.length; fyIdx++) {
      const rowData = rows[(headerIdx * fiscalYears.length) + fyIdx]
      budget += rowData.budget;
      // forecast can be null, so we have to take care of that here
      forecast += rowData.forecast || 0;
    }

    // append the current row to the total data
    totalSection.values?.push({
      budget, forecast
    })
  }
  return totalSection
}

// simple title/header/category formatting
export function formatTitles({ headers }: ForecastData): SectionData {
  return {
    header: 'Type of Benefits',
    titles: headers
  }
}
