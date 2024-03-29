import { ForecastData, SectionData } from './types'

// example tooltips for visualization purposes.
export const tooltipStrings = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
  'Tempor incididunt ut labore et dolore magna aliqua.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Deserunt mollit anim id est laborum'
]

export function transformIncomingForecastData(fy: string, { headers, fiscalYears, rows }: ForecastData): SectionData | null {
  // Find the index of the fiscal year we are currently interested in.
  // We can later use that to index into the "rows" array in the forecast data.
  const fyIdx = fiscalYears.findIndex(fyear => fyear === fy);

  // We aren't interested in continuing if we couldn't find the fy.
  if (fyIdx === -1) {
    return null;
  }

  let sectionValues = [];
  // Here we iterate over each of the headers and take their index.
  // We do this because we can use that index together with the fy index to fetch data
  // from the rows array.
  for (let headerIdx = 0; headerIdx < headers.length; headerIdx++) {
    // Since the number of data entries found in the 'rows' array should be the same
    // amount as fiscalYears.length * headers.length, we can use that fact to index into the rows.
    //
    // Example: 
    // We have 5 fiscal years and 2 row titles and we know that the incoming
    // row data is aligned in a single dimensional array.
    // We know that the amount of values per row is the same amount as the amount of fiscal years and we know that the
    // amount of headers equals the amount of rows. This fact allows us to move between rows using the header index,
    // and the row values using the fiscal year index. So, using headerIdx * fiscalYears.length, we can find the row we want.
    // Adding the fiscal year index of the currently handled fiscal year we can find the values we are looking for.
    //
    // This essentially turns the row based backend data into sectioned off column data instead which allows us to split it up into separate components we can render without them being
    // dependent on each other.
    sectionValues.push(rows[(headerIdx * fiscalYears.length) + fyIdx])
  }

  // sum each column in the current section
  let budgetSum = 0;
  let forecastSum = 0;
  for (const value of sectionValues) {
    budgetSum += value.budget;
    forecastSum += value.forecast || 0;
  }

  // append those values to the section for display
  sectionValues.push({
    budget: budgetSum,
    forecast: forecastSum
  })

  return {
    header: fy,
    values: sectionValues
  }
}

// here we want to calculate the sum of all values for each row.
export function calculateTotalsFromForecastData({ headers, fiscalYears, rows }: ForecastData): SectionData {
  let totalSection: SectionData = {
    header: 'Total',
    values: []
  }

  let budgetSum = 0;
  let forecastSum = 0;
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

    budgetSum += budget;
    forecastSum += forecast;
    // append the current row to the total data
    totalSection.values?.push({
      budget, forecast
    })
  }

  // add the summary of budget and forecast to the total section
  totalSection.values?.push({
    budget: budgetSum,
    forecast: forecastSum
  })

  // additional summary indicators
  totalSection.values?.push({
    budget: forecastSum - budgetSum,
    // Performing a bitwise OR with 0 here truncates decimals and is faster than other methods.
    // The downside to this is that, since bitwise OR internally converts each expression to
    // an i32 (which is why this works), this only works for numbers within the range of i32.
    // However, we can use this here because the customer will realistically never work with
    // numbers that would exceed this limitation.
    forecast: (forecastSum / budgetSum) * 100 | 0
  })
  return totalSection
}

// simple row title formatting
export function formatRowTitleData({ headers }: ForecastData): SectionData {
  return {
    header: 'Type of Benefits',
    titles: [
      ...headers,
      // we add these additional headers here because we don't want to mess up the indexing
      // we do when reconstructing the incoming forecast data above in
      // transformIncomingForecastData and calculateTotalsFromForecastData.
      'Total (K€)',
      'FC - BU (K€) & Index'
    ]
  }
}

// decides which class to assign to a row in an alternating fashion
export const bgClass = (i: number) => i % 2 === 0 ? '' : 'alt-bg'

// applies the bold class to elements that meet the defined conditions.
export const isBold = (
  collection: any[] | undefined,
  currentIdx: number,
  isTitles: boolean = false
) => {
  // we want the last 2 rows in the title section and the last row in the
  // total section to be bold
  const threshold = isTitles ? 2 : 1;
  return collection?.length && collection.length - currentIdx <= threshold ? 'bold' : '';
}
