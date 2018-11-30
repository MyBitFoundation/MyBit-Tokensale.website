import { Tooltip } from 'antd'
const tokensaleTooltip = '../../../static/tokensale/tokensale_questionIcon.svg';

const Section = ({
  hasTooltip,
  tooltipTitle,
  img,
  imgAlt,
  children,
  imgClassName,
  childrenClassName,
}) => (
  <div className="Section">
    {hasTooltip && (
      <Tooltip title={tooltipTitle} className="Section__tooltip" overlayClassName="Section__tooltip-inner">
        <img src={tokensaleTooltip} alt={imgAlt} className="Section__tooltip-img"></img>
      </Tooltip>
    )}
    {img && (
      <img src={img} alt={imgAlt} className={`Section__${imgClassName}`}></img>
    )}
    <div className={childrenClassName}>
      {children}
    </div>
  </div>
);

export default Section;
