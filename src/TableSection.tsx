import { tooltipStrings } from "./helpers";
import InfoDot from "./InfoDot";
import TableSectionHeader from "./TableSectionHeader";
import { TableSectionProps } from "./types";

function TableSection({ data }: TableSectionProps) {
  return (
    <div className='table-section'>
      <TableSectionHeader
        simple={!!!data.values && !!data.titles} // exclamation marks are used to convert to boolean
        header={data.header}
      />
      {
        /* if the values field is defined but the titles field is not, this means
        that we should display the data as forecast values*/
      }
      {data.values && !data.titles && (
        <div className='value-section'>
          {data.values.map((v, i) => (
            <>
              {/* we use mod 2 to alternate background colors */}
              {/* we wrap the inner span in a div in order to center it without disturbing the outer layout */}
              <div className={`table-cell ${i % 2 !== 0 ? 'alt-bg' : ''}`}>
                <span>{v.budget}</span>
              </div>
              <div className={`table-cell ${i % 2 !== 0 ? 'alt-bg' : ''}`}>
                <span>{v.forecast || 0}</span>
              </div>
            </>
          ))}
        </div>
      )}
      {
        /* if the titles field is defined but the values field is not, this means
        that we should display the data as titles */
      }
      {!data.values && data.titles && (
        <div className='title-section'>
          {data.titles.map((v, i) => (
            <div className={`title-container table-cell ${i % 2 !== 0 ? 'alt-bg' : ''}`}>
              <span>{v}</span>
              <InfoDot id={i} text={tooltipStrings[i]} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TableSection;
