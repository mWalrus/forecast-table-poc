import { bgClass, isBold, tooltipStrings } from "./helpers";
import InfoDot from "./InfoDot";
import TableSectionHeader from "./TableSectionHeader";
import { TableSectionProps } from "./types";

function TableSection({ data, titles, fySection }: TableSectionProps) {
  return (
    <div className='table-section'>
      <TableSectionHeader
        simple={titles}
        header={data.header}
      />
      {
        /* if the values field is defined but the titles field is not, this means
        that we should display the data as forecast values*/
      }
      <div className={`${titles ? 'title' : 'value'}-section`}>
        {titles && data.titles && data.titles.map((v, i) => (
          <div className={`title-container table-cell ${bgClass(i)}`}>
            <span className={isBold(data.titles, i, true)}>{v}</span>
            {tooltipStrings[i] && <InfoDot id={i} text={tooltipStrings[i]} />}
          </div>
        ))}
        {!titles && data.values && data.values.map((v, i) => (
          <>
            {/* we use mod 2 to alternate background colors */}
            {/* we wrap the inner span in a div in order to center it without disturbing the outer layout */}
            <div className={`table-cell ${bgClass(i)}`}>
              <span className={!fySection ? isBold(data.values, i) : ''}>{v.budget}</span>
            </div>
            <div className={`table-cell ${bgClass(i)}`}>
              <span className={!fySection ? isBold(data.values, i) : ''}>{v.forecast || 0}</span>
            </div>
          </>
        ))}
        {fySection && (
          <>
            <div className={`table-cell ${bgClass(1)}`}/>
            <div className={`table-cell ${bgClass(1)}`}/>
          </>
        )}
      </div>
    </div>
  )
}

export default TableSection;
