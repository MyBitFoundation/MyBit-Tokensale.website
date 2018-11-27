import Router from 'next/router'
import TokenSaleDetails from './tokenSaleDetails';
import TermsOfService from './termsOfService';
import Countdown from './countdown';
import stylesheet from './banner.scss'
import {
  getUserAcceptedTermsOfService,
  setUserAcceptedTermsOfService
 } from '../../utils';

class Banner extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      termsOfService: false,
      shouldUpdate: false,
      active: 1,
      acceptedTermsOfService: getUserAcceptedTermsOfService(),
      checkBoxesChecked: 0,
    };

    this.renderTokenSaleDetails = this.renderTokenSaleDetails.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleContributeClicked = this.handleContributeClicked.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextprops: ", nextProps)
    if((nextProps.currentDay > 0 || nextProps.currentDayServer > 0) && this.state.active === 1){
      this.setState({
        active: 2,
      });
    }
  }

  renderTokenSaleDetails(){
    this.setState({
      active: 2,
    });
  }

  handleContributeClicked(){
    this.setState({
      acceptedTermsOfService: false,
      active: 3,
    });
  }

  handleCheckboxChange(value){
    const { checkBoxesChecked } = this.state;
    this.setState({
      checkBoxesChecked: value ? checkBoxesChecked + 1 : checkBoxesChecked - 1,
    });
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
      acceptedTermsOfService,
   } = this.state;

   //TODO remove/reevaluate
   console.log(currentDay)
   if(currentDay && active === 1){
    active = 2;
   }

    return (
      <div className="Banner">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className={`Banner__section ${ active === 3 ? 'Banner__section--is-active' : undefined}`}>
          <TermsOfService
            allCheckBoxesChecked={this.state.checkBoxesChecked === 4}
            handleCheckboxChange={this.handleCheckboxChange}
            setUserAcceptedTermsOfService={setUserAcceptedTermsOfService}
          />
        </div>
        <div className={`Banner__section ${ active == 2 ? 'Banner__section--is-active' : undefined}`}>
          <TokenSaleDetails
            {...this.props}
            acceptedTermsOfService={acceptedTermsOfService}
            handleContributeClicked={this.handleContributeClicked}
            setUserAcceptedTermsOfService={setUserAcceptedTermsOfService}
          />
        </div>
        <div className={`Banner__section ${ active == 1 ? 'Banner__section--is-active' : undefined}`}>
          <Countdown
            renderTokenSaleDetails={() => this.renderTokenSaleDetails()}
          />
        </div>
      </div>
    )
  }
};

export default Banner;
