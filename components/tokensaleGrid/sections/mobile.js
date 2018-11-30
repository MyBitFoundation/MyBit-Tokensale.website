import { Fragment } from 'react'
import CountdownHours from '../../countdownHours';

const Mobile  = ({
  currentPeriod,
  totalEthContributed,
  secondsToGo,
}) => (
  <Fragment>
    <div className="Section__title">Phase <span style={{color: '#1890ff'}}>#{currentPeriod}</span> ends in:</div>
    <div className="Section__bold">
      <CountdownHours
        time={secondsToGo}
      />
    </div>
    <div className="Section__title">ETH Contributed:</div>
    <div className="Section__bold">{totalEthContributed.toLocaleString()} ETH</div>
  </Fragment>
)

export default Mobile;
