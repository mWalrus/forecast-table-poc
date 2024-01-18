// the type representation of the incoming json object from the backend
export type ForecastData = {
  // headers are the row "titles" describing the values
  headers: string[]
  // fiscal years are formatted strings (e.g. "FY25") signifying the different fiscal years this forecast
  // concerns.
  fiscalYears: string[]
  // these are the rows of values formatted in a single dimension array
  rows: ForecastRow[]
}

export type ForecastRow = {
  budget: number,
  // forecast might not be added yet since it is done in the forecast table
  forecast?: number | null
}

// this is the representation of the formatted forecast data we pass along to the table component
export type SectionData = {
  header: string
  values?: ForecastRow[]
  titles?: string[]
}

// the props of the forecast table component
export interface TableProps {
  data: ForecastData
}

// the react props of the yellow header area in a section of the table
export interface TableSectionHeaderProps {
  simple?: boolean
  header: string
}

// the props for a section of a table
export interface TableSectionProps {
  titles?: boolean
  data: SectionData
}

// the props passed to an info dot
export interface InfoDotProps {
  // id is used to give each info dot an unique id which can then be linked up to a tooltip
  id: number
  text: string
}
