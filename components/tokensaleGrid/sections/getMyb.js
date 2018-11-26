import { Fragment } from 'react'
import { Button } from 'antd'
import CountdownHours from '../../countdownHours';

const GetMyb  = ({
  secondsToGo,
  onShowContributeModal,
  currentPeriod,
}) => (
  <Fragment>
    <div className="Section__title">Phase <span className="Section__blue">#{currentPeriod}</span> ends in:</div>
    <div className="Section__bold">
      <CountdownHours
        time={secondsToGo}
        key={secondsToGo}
      />
    </div>
    <Button
      className="TokenSaleGrid__button green"
      onClick={onShowContributeModal}
    >
      Get MYB
    </Button>
  </Fragment>

)

export default GetMyb;
