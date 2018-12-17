import { Fragment } from 'react'
import CountdownHours from '../../countdownHours';

const Mobile  = ({
  currentPeriod,
  totalEthContributed,
  secondsToGo,
}) => {
  return currentPeriod ? (
    <Fragment>
      <div className="Section__title">Phase <span style={{color: '#1890ff'}}>#{currentPeriod}</span> ends in:</div>
      <div className="Section__bold">
        <CountdownHours
          time={secondsToGo}
        />
      </div>
      <div className="Section__title">ETH Contributed:</div>
      <div className="Section__bold">{totalEthContributed.toLocaleString({minimumFractionDigits: 3})} ETH</div>
    </Fragment>
  )
  : (
  <Fragment>
    <div className="Section__bold Section__title">Token distribution begins January 1st, 2019</div>
    <div className="Section__bold">
      <span style={{color: '#1890ff'}}>Contributions now open</span>
    </div>
  </Fragment>
)}

export default Mobile;
