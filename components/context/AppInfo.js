import AppInfoContext from './AppInfoContext';
import Web3 from 'web3';
import * as Core from '../../apis/core';
import { ETHEREUM_TICKER_COINMARKETCAP, debug, dayInSeconds, tokensPerDay } from '../constants/';
class AppInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleClickMobileMenu = this.handleClickMobileMenu.bind(this);
    this.fund = this.fund.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.batchWithdrawal = this.batchWithdrawal.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.getCurrentDayAndSetupTimer = this.getCurrentDayAndSetupTimer.bind(this);
    this.setEffectivePrice = this.setEffectivePrice.bind(this);
    this.loadPrices = this.loadPrices.bind(this);

    this.state = {
      mobileMenu: false,
      handleClickMobileMenu: this.handleClickMobileMenu,
      removeNotification: this.removeNotification,
      currentDay: 0,
      fund: this.fund,
      withdraw: this.withdraw,
      batchWithdrawal: this.batchWithdrawal,
      notifications: {},
      user: this.props.user,
      isLoggedIn: this.props.isLoggedIn,
      enabled: this.props.enabled,
    };
  }

  async componentDidMount() {
     try{
      if (this.props.isMetamaskInstalled) {
        await Promise.all([
          await this.getCurrentDayAndSetupTimer(),
          await this.loadPrices(),
        ]);
        //await this.fund(this.state.user.username, '0.1', 3);
        this.getAllContributionsPerDay(this.state.currentDay);
      }
    }catch(err){
      console.log(err)
    }
  }

  componentWillReceiveProps(nextProps){
    // case where account changes
    if(nextProps.user.userName && (this.state.user.userName !== nextProps.user.userName)){
      this.setState({
        user: nextProps.user,
      }, () => this.getAllContributionsPerDay(this.state.currentDay));
    }
    //case where user logs in/out
    else if(this.state.isLoggedIn !== nextProps.isLoggedIn){
      this.setState({
        isLoggedIn: nextProps.isLoggedIn,
      }, () => this.getAllContributionsPerDay(this.state.currentDay));
    }
    //case where user enables us to access accounts
    if(!this.state.enabled && nextProps.enabled){
      this.setState({
        enabled: true,
      });
    }
  }

  async loadPrices() {
    await Core.fetchPriceFromCoinmarketcap(ETHEREUM_TICKER_COINMARKETCAP)
      .then((price) => {
        this.setState({ethPrice: price});
      })
      .catch((err) => {
        debug(err);
      });
  }

  async getCurrentDayAndSetupTimer(){
    try{
      const timestampStartTokenSale = await Core.getStartTimestamp();
      const currentDay = ((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / dayInSeconds) + 1;
      const currentDayInt = Math.floor(currentDay);

      this.setState({currentDay: currentDayInt, timestampStartTokenSale});
      this.setupTimerForCurrentDay(currentDay % 1);
    }catch(err){
      debug(err);
    }
  }

  setupTimerForCurrentDay(past){
    const currentTime = new Date().getTime();
    const milisecondsUntilNextDay = ((1 - past) * dayInSeconds * 1000).toFixed(0);

    // increments day at the next midnight
    setTimeout(() => {
      const updateCurrentDay = () => {
        debug("updating currentDay...", this.state.currentDay)
        this.setState({currentDay: this.state.currentDay + 1})
      }
      updateCurrentDay();
      //timeout to update currentDay every 24 hours
      setInterval(() => updateCurrentDay(), 86400000)
    }, milisecondsUntilNextDay);
  }

  async fund(amount, day){
    await Core.fund(this.state.user, amount, day, this.updateNotification)
      .then((response) => {
        debug(response);
      })
      .catch((err) => {
        debug(err);
      });
  }

  async withdraw(day){
    await Core.withdraw(this.state.user, day, this.updateNotification)
      .then((response) => {
        debug(response);
      })
      .catch((err) => {
        debug(err);
      });
  }

  async batchWithdrawal(days){
    await Core.batchWithdrawal(this.state.user, days, this.updateNotification)
      .then((response) => {
        debug(response);
      })
      .catch((err) => {
        debug(err);
      });
  }

  updateNotification(transactionHash, details, status, amountReceived){
    const notifications = Object.assign({}, this.state.notifications);
    if(details) {
      notifications[transactionHash] = details;
    }
    else{
      notifications[transactionHash].status = status;
      if(amountReceived){
        notifications[transactionHash].amount = amountReceived;
      }
    }

    this.setState({notifications});
  }

  removeNotification(transactionHash){
    const notifications = Object.assign({}, this.state.notifications);
    delete notifications[transactionHash];
    this.setState({notifications});
  }

  setEffectivePrice(contributions){
    const { currentDay } = this.state;
    const totalEthContributed = contributions[currentDay - 1].total_eth;

    const effectivePrice = totalEthContributed > 0 ? (this.state.ethPrice * totalEthContributed) / tokensPerDay : 0;
    this.setState({effectivePrice});
  }

  async getAllContributionsPerDay(){
    await Core.getAllContributionsPerDay(this.state.user.userName, this.state.currentDay)
      .then(({contributions, daysOwed, totalOwed}) => {
        this.setEffectivePrice(contributions);
        this.setState({
          contributions,
          daysOwed,
          totalOwed,
        });
      })
      .catch((err) => {
        debug(err);
      });
  }

  handleClickMobileMenu(mobileMenu){
    this.setState({mobileMenu})
  }

  render(){
    if(!this.state.contributions) return null;
    return(
      <AppInfoContext.Provider value={this.state}>
        {this.props.children}
      </AppInfoContext.Provider>
    )
  }
};

export default AppInfo;
