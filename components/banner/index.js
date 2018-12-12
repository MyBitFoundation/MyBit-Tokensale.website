import Router from 'next/router'
import TokenSaleDetails from './tokenSaleDetails';
import Countdown from './countdown';
import stylesheet from './banner.scss'
import { getSecondsUntilNextPeriod } from '../constants'

class Banner extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active: this.props.currentDayServer ? 2 : 1,
    };
  }

  componentWillReceiveProps(nextProps){
    if((nextProps.currentDay > 0 || nextProps.currentDayServer > 0) && this.state.active === 1){
      this.setState({
        active: 2,
      });
    }
  }

  render(){
    const {
      timestampStartTokenSale,
      currentPeriodTotal,
      loaded,
      currentDay,
      currentDayServer,
      price,
    } = this.props;

    let {
      active,
    } = this.state;

    const secondsUntilNextPeriod = getSecondsUntilNextPeriod(
      timestampStartTokenSale
    )

    return (
      <div className="Banner">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className={`Banner__section ${ active == 2 ? 'Banner__section--is-active' : undefined}`}>
          <TokenSaleDetails
            {...this.props}
            secondsUntilNextPeriod={secondsUntilNextPeriod}
          />
        </div>
        <div className={`Banner__section ${ active == 1 ? 'Banner__section--is-active' : undefined}`}>
          <Countdown
            timestampStartTokenSale={timestampStartTokenSale}
          />
        </div>
      </div>
    )
  }
};

export default Banner;
