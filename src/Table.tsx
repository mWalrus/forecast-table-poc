import TableSection from "./TableSection";
import { SectionData, TableProps } from "./types";
import { calculateTotals, formatFyData, formatTitles } from './helpers';
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
      const sectionData = formatFyData(fy, data);
      if (sectionData) {
        sectionDataCollection.push(sectionData)
      }
    }

    // produce the data for the "Total" section
    setTotalData(calculateTotals(data))
    setFyDataCollection(sectionDataCollection)
  }, [])

  return (
    <div className='table'>
      {/*here we keep the title section and the total section separate from the fy sections to allow for the fy sections to be in a scrollable container*/}
      <TableSection data={formatTitles(data)} />
      {totalData && <TableSection data={totalData} />}
      <div className='scrollable-fy-sections'>
        {fyDataCollection.map(fy => (
          <TableSection data={fy} />
        ))}
      </div>
    </div>
  )
}

export default Table;
