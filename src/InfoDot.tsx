import { Tooltip } from "react-tooltip";
import { InfoDotProps } from "./types";

// using the id we can match tooltips together with the related element
// in order for the correct tooltip to show up once you hover the element.
function InfoDot({ id, text }: InfoDotProps) {
  return (
    <>
      <Tooltip id={`info-dot-${id}`} content={text} place='top'/>
      <div data-tooltip-id={`info-dot-${id}`} className={'info-dot'}>?</div>
    </>
  )
}

export default InfoDot;
