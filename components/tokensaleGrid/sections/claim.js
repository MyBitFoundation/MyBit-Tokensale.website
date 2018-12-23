import { Fragment } from 'react'
import { Button } from 'antd'
import AnimatedNumber from 'react-animated-number';
import {
  correctNetwork
} from '../../constants';

class Claim extends React.Component{

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.totalOwed !== nextProps.totalOwed){
      return true;
    } else if (this.props.daysOwed !== nextProps.daysOwed){
      return true;
    } else if (this.props.isLoggedIn !== nextProps.isLoggedIn){
      return true;
    }

    return false;
  }

  render(){
    const {
      currentPeriod,
      totalOwed,
      batchWithdrawal,
      daysOwed,
      batchWithdrawing,
      allowed,
      isLoggedIn,
      network,
    } = this.props;

    return (
      <Fragment>
        <div className="Section__title">MYB Ready to Claim</div>
        <div className={currentPeriod ? "Section__bold" : "Section__bold Section__bold--not-started2"}>
          <AnimatedNumber
            component="text"
            style={{
                transition: '0.5s ease-out',
                opacity: 1,
                transitionProperty: 'opacity',
            }}
            frameStyle={perc => (
                perc === 100 ? {} : {opacity: (perc / 100).toFixed(2)}
            )}

            value={totalOwed}
            duration={1000}
            stepPrecision={0}
            formatValue={n => n.toLocaleString()}
          />
        </div>
        <Button
          className="TokenSaleGrid__button"
          onClick={() => batchWithdrawal(daysOwed)}
          disabled={daysOwed.length === 0 || !isLoggedIn || batchWithdrawing || allowed === false || correctNetwork !== network}
          type="primary"
        >
          Claim
        </Button>
      </Fragment>
    )
  }
}

export default Claim;
