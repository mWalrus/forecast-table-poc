import { TableSectionHeaderProps } from "./types";

function TableSectionHeader({
  simple,
  header
}: TableSectionHeaderProps) {
  return (
    <>
      {simple && (
        <div className='table-section-header title-header'>
          {/*temporary hack to skip having to fiddle with styling as much*/}
          <span>&nbsp;</span>
          <span>{header}</span>
        </div>
      )}
      {!simple && (
        <div className='table-section-header value-header'>
          <span>{header}</span>
          <span className='subheader-left'>Budget (K€)</span>
          <span className='subheader-right'>Forecast (K€)</span>
        </div>
      )}
    </>
  )
}

export default TableSectionHeader;
