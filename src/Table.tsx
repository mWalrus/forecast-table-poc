import TableSection from "./TableSection";
import { SectionData, TableProps } from "./types";
import { calculateTotalsFromForecastData, transformIncomingForecastData, formatRowTitleData } from './helpers';
import { useEffect, useState } from "react";

function Table({ data }: TableProps) {
  // we define states for each fy section as well as the total section as this needs to be
  // calculated once the component renders.
  const [fyDataCollection, setFyDataCollection] = useState<SectionData[]>([])
  const [totalData, setTotalData] = useState<SectionData>()

  useEffect(() => {
    // format all fy data into manageable data
    const sectionDataCollection = []
    for (const fy of data.fiscalYears) {
      const sectionData = transformIncomingForecastData(fy, data);
      if (sectionData) {
        sectionDataCollection.push(sectionData)
      }
    }

    // produce the data for the "Total" section
    setTotalData(calculateTotalsFromForecastData(data))
    setFyDataCollection(sectionDataCollection)
  }, [])

  return (
    <div className='table'>
      {/*here we keep the title section and the total section separate from the fy sections to allow for the fy sections to be in a scrollable container*/}
      <TableSection
        key='titles'
        titles
        data={formatRowTitleData(data)}
      />
      {totalData && <TableSection key='totals' data={totalData} />}
      <div className='scrollable-fy-sections'>
        {fyDataCollection.map((fy, i) => (
          <TableSection
            key={`fy-section-${i}`}
            fySection
            data={fy}
          />
        ))}
      </div>
    </div>
  )
}

export default Table;
