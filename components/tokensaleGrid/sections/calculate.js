import { Fragment } from 'react'
import { Button } from 'antd'

class Calculate extends React.Component{

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.exchangeRate !== nextProps.exchangeRate){
      return true;
    } else if (this.props.currentPeriod !== nextProps.currentPeriod){
      return true;
    }

    return false;
  }

  render(){
    const {
      onShowCalculateModal,
      currentPeriod,
      exchangeRate
    } = this.props;

    return(
      <Fragment>
        <div className="Section__title">Current Exchange Rate</div>
        <div className={currentPeriod ? "Section__bold" : "Section__bold Section__bold--not-started2"}>{`1 ETH = ${currentPeriod ? exchangeRate.toLocaleString('en-US', {maximumFractionDigits: 0}) : '100,000'} MYB`}</div>
        <Button
          className="TokenSaleGrid__button"
          onClick={onShowCalculateModal}
          type="primary"
        >
          Calculate
        </Button>
      </Fragment>
    )
  }
}

export default Calculate;
