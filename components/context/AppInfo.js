import AppInfoContext from './AppInfoContext';
import { ETHEREUM_TICKER_COINMARKETCAP, debug, dayInSeconds, tokensPerDay } from '../constants/';
import * as Core from '../../apis/core';
import * as TokenSale from '../constants/contracts/TokenSale';
import { events } from '../../utils/EventEmitter';

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
    this.pullContributionsServer = this.pullContributionsServer.bind(this);
    this.subscribeToEvents = this.subscribeToEvents.bind(this);

    this.state = {
      mobileMenu: false,
      handleClickMobileMenu: this.handleClickMobileMenu,
      removeNotification: this.removeNotification,
      currentDay: undefined,
      fund: this.fund,
      withdraw: this.withdraw,
      batchWithdrawal: this.batchWithdrawal,
      notifications: {},
      user: this.props.user,
      isLoggedIn: this.props.isLoggedIn,
      enabled: this.props.enabled,
      daysOwed: [],
      totalOwed: 0,
      isMetamaskInstalled: this.props.isMetamaskInstalled,
      extensionUrl: this.props.extensionUrl,
      isBraveBrowser: this.props.isBraveBrowser,
      network: this.props.network,
      batchWithdrawing: false,
    };

    this.subscribedToEvents = false;
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
    else if(nextProps.user.balance && (this.state.user.balance !== nextProps.user.balance)){
      this.setState({
        user: {
          ...this.state.user,
          balance: nextProps.user.balance,
        },
      })
    }
    //case where user enables us to access accounts
    if(!this.state.enabled && nextProps.enabled){
      this.setState({
        enabled: true,
      });
    }
  }

  componentDidMount() {
    try{
      if ((this.props.isMetamaskInstalled && this.props.network === 'ropsten') || !this.props.isMetamaskInstalled) {
        this.userHasMetamask();
      }
      this.subscribeToEvents();
      this.pricesInterval = setInterval(() => this.loadPrices(), 120000);
    }catch(err){
      debug(err)
    }
  }

  componentWillUnmount(){
    events.removeAllListeners();
  }

  subscribeToEvents(){
    events.on('fund', data => this.handleFundEvent(data));
    events.on('claim', data => this.handleClaimEvent(data));
  }

  // TODO does this work for batch claiming? no. receives days instead of day
  handleClaimEvent({amount, day, contributor, transactionHash}){
    const contributions = this.state.contributions.slice();
    let totalOwed = this.state.totalOwed;
    let daysOwed = this.state.daysOwed.slice();
    let flag = false;
    let updatedInfo = undefined;
    // user himself is claiming
    if(this.state.isMetamaskInstalled && (contributor === this.state.user.userName.toLowerCase())){
      flag = true;
      contributions[day].myb_received = amount;
      contributions[day].owed = 0;
      updatedInfo = Core.calculateOwedAmounts(contributions, this.state.currentDay);
      this.updateNotification(transactionHash, undefined, 1, amount);
    }
    if(flag){
      this.setState({
        ...updatedInfo,
      });
    }
  }

  handleFundEvent({amount, day, contributor, transactionHash}){
    const contributions = this.state.contributions.slice();
    contributions[day].total_eth = contributions[day].total_eth + amount;
    // user himself funded
    if(this.state.isMetamaskInstalled && (contributor === this.state.user.userName.toLowerCase())){
      contributions[day].your_contribution = contributions[day].your_contribution + amount;
      this.updateNotification(transactionHash, undefined, 1);
      const updatedInfo = Core.calculateOwedAmounts(contributions, this.state.currentDay);
      this.setState({
        ...updatedInfo,
      })
      return;
    }
    this.setState({contributions});
  }

  async userHasMetamask(){
    await Promise.all([
      await this.getCurrentDayAndSetupTimer(),
      await this.loadPrices(),
    ]);
    this.getAllContributionsPerDay(this.state.currentDay);
  }

  async pullContributionsServer(){
    const { timestampStartTokenSale, contributions, currentDay } = await Core.fetchContributionsServer();
    debug("pulled from server...")
    if(!this.state.contributions){
      this.getCurrentDayAndSetupTimer(timestampStartTokenSale);
      this.setEffectivePrice(contributions, currentDay);
      this.setState({
        contributions,
        totalOwed: 0,
        currentDay,
      })
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

  async getCurrentDayAndSetupTimer(timestamp){
    try{
      let timestampStartTokenSale = timestamp ? timestamp : await Core.getStartTimestamp();

      // tests that updating the currentDay works and that
      // the UI updates everything successfuly
      // currentDay updates after 10 seconds of page loading
      /*
      const x = new Date();
      x.setHours(18);
      x.setMinutes(25);
      x.setSeconds(10);
      console.log(timestampStartTokenSale)
      const difference = Math.floor((x - new Date()) / 1000);
      console.log(difference)
      timestampStartTokenSale -= difference;
      */

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
        const updatedInfo = Core.calculateOwedAmounts(this.state.contributions, this.state.currentDay + 1);
        this.setState({
          currentDay: this.state.currentDay + 1,
          ...updatedInfo,
        })
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
    const updateState = (flag) => {
      this.setState({
        batchWithdrawing: flag,
      })
    }
    updateState(true);
    await Core.batchWithdrawal(this.state.user, days, this.updateNotification)
      .then((response) => {
        updateState(false);
        debug(response);
      })
      .catch((err) => {
        updateState(false);
        debug(err);
      });
  }

  updateNotification(transactionHash, details, status, amountReceived){
    const notifications = Object.assign({}, this.state.notifications);
    if(details) {
      notifications[transactionHash] = details;
    }
    else if(notifications[transactionHash]) {
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

  setEffectivePrice(contributions, currentDay){
    currentDay = currentDay ? currentDay : this.state.currentDay;
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
    //if(!this.state.contributions) return null;
    return(
      <AppInfoContext.Provider value={this.state}>
        {this.props.children}
      </AppInfoContext.Provider>
    )
  }
};

export default AppInfo;
