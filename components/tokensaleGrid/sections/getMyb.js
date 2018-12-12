import { Fragment } from 'react'
import { Button } from 'antd'
import CountdownHours from '../../countdownHours';

class GetMyb extends React.Component{

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.currentPeriod !== nextProps.currentPeriod){
      return true;
    } else if (this.props.secondsToGo !== nextProps.secondsToGo){
      return true;
    }

    return false;
  }

  render(){
    const {
      currentPeriod,
      secondsToGo,
      onShowContributeModal
    } = this.props;

    return currentPeriod ? (
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
    ) : (
      <Fragment>
        <div className="Section__title">Token distribution starts</div>
        <div className="Section__bold Section__bold--not-started">Jan 1st 2019 <br /> at 12:00 UTC </div>
        <Button
          className="TokenSaleGrid__button green"
          onClick={onShowContributeModal}
        >
          Get MYB
        </Button>
      </Fragment>
    )
  };
}

export default GetMyb;
