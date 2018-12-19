import AppInfoContext from './AppInfoContext';
import {
  ETHEREUM_TICKER_COINMARKETCAP,
  debug,
  dayInSeconds,
  tokensPerDay,
  correctNetwork
 } from '../constants/';
import * as Core from '../../apis/core';
import * as TokenSale from '../constants/contracts/TokenSale';
import { events } from '../../utils/EventEmitter';
import Web3 from 'web3';

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
    this.subscribeToEvents = this.subscribeToEvents.bind(this);
    this.getNotificationIdFromHash = this.getNotificationIdFromHash.bind(this);
    this.loadInfo = this.loadInfo.bind(this);

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
    if(nextProps.user.userName && (this.state.user.userName !== nextProps.user.userName) && (this.props.network === correctNetwork)){
      this.setState({
        user: nextProps.user,
      }, () => this.getAllContributionsPerDay(this.state.currentDay));
    }
    // case where user logs in/out
    // breaks when mainnet is not selected so the second condition is a temp fix
    // until we figure out why
    else if(this.state.isLoggedIn !== nextProps.isLoggedIn && (this.props.network === correctNetwork)){
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
      if ((this.props.isMetamaskInstalled && this.props.network === correctNetwork) || !this.props.isMetamaskInstalled) {
        this.loadInfo();
      }
      //case where user has metamask but is connected to the wrong network, we
      //still need to load the data properly from the correct network
      else if(this.props.isMetamaskInstalled && (this.props.network !== correctNetwork)){
        window.web3js = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`))
        this.loadInfo();
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

  handleClaimEvent({amount, day, contributor, transactionHash}){
    const notifData = this.getNotificationIdFromHash(transactionHash);
    const contributions = this.state.contributions.slice();
    let totalOwed = this.state.totalOwed;
    let daysOwed = this.state.daysOwed.slice();
    let flag = false;
    let updatedInfo = undefined;

    debug(`got claim event, contributor ${contributor} and day ${day}`);
    // user himself is claiming
    if(this.state.isMetamaskInstalled && this.state.user.userName && (contributor === this.state.user.userName.toLowerCase())){
      flag = true;
      contributions[day].myb_received = amount;
      contributions[day].owed = 0;
      updatedInfo = Core.calculateOwedAmounts(contributions, this.state.currentDay);
      if(notifData){
        this.updateNotification(notifData.id, undefined, 1, notifData.currentAmount + amount);
      }
    }
    if(flag){
      this.setState({
        ...updatedInfo,
      });
    }
  }

  handleFundEvent({amount, day, contributor, transactionHash}){
    try{
      const notifData = this.getNotificationIdFromHash(transactionHash);
      const contributions = this.state.contributions.slice();
      contributions[day].total_eth = contributions[day].total_eth + amount;
      debug(`got fund event,  contributor ${contributor} and amount ${amount} and day ${day}`);
      // user himself funded
      if(this.state.isMetamaskInstalled && this.state.user.userName && (contributor === this.state.user.userName.toLowerCase())){
        contributions[day].your_contribution = contributions[day].your_contribution + amount;
        if(notifData){
          this.updateNotification(notifData.id, undefined, 1);
        }
      }
      const updatedInfo = Core.calculateOwedAmounts(contributions, this.state.currentDay);

      this.setState({
        ...updatedInfo,
      }, () => this.setEffectivePrice(this.state.contributions));

    }catch(err){
      debug(`Error processing funding event: ${err}`)
    }
  }

  async loadInfo(){
    await Promise.all([
      await this.getCurrentDayAndSetupTimer(),
      await this.loadPrices(),
    ]);
    this.getAllContributionsPerDay();
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
      const started = timestampStartTokenSale <= Math.floor(Date.now() / 1000);

      // tests that updating the currentDay works and that
      // the UI updates everything successfuly
      // currentDay updates after 10 seconds of page loading
      /*
      const x = new Date();
      x.setHours(18);
      x.setMinutes(25);
      x.setSeconds(10);
      debug(timestampStartTokenSale)
      const difference = Math.floor((x - new Date()) / 1000);
      debug(difference)
      timestampStartTokenSale -= difference;
      */

      if(started){
        const currentDay = ((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / dayInSeconds) + 1;
        const currentDayInt = Math.floor(currentDay);

        this.setState({currentDay: currentDayInt, timestampStartTokenSale});
        this.setupTimerForCurrentDay(currentDay % 1);
      } else {
        this.setState({timestampStartTokenSale});
        setTimeout(async () => {
          console.log("getting contributions with day 1");
          await this.getAllContributionsPerDay(1);
          console.log("got contributions, setting timer")
          this.getCurrentDayAndSetupTimer();
        }, (timestampStartTokenSale * 1000 - Date.now()));
        console.log("timer for: ", (new Date(Date.now() + (timestampStartTokenSale * 1000 - Date.now()) + 1000)));
      }
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

  getNotificationIdFromHash(hash){
    const notifications = this.state.notifications;
    for (var key in notifications) {
      if (notifications[key] && notifications[key].transactionHash === hash) {
        return {
          id: key,
          currentAmount: notifications[key].amount,
        };
      }
    }

    return null;
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
    currentDay = currentDay || this.state.currentDay;
    const totalEthContributed = contributions[currentDay ? currentDay - 1 : 0].total_eth;
    const percentageOwed = totalEthContributed > 0 ? (100 / (totalEthContributed + 1)) / 100 : 1;
    const effectivePrice = totalEthContributed > 0 ? (this.state.ethPrice * totalEthContributed) / tokensPerDay : 0;
    this.setState({
      effectivePrice,
      exchangeRate: tokensPerDay * percentageOwed,
      totalEthContributed,
    });
  }

  async getAllContributionsPerDay(optionalCurrentDay){
    return await Core.getAllContributionsPerDay(this.state.user.userName, optionalCurrentDay ? optionalCurrentDay : this.state.currentDay, this.state.timestampStartTokenSale * 1000)
      .then(({contributions, daysOwed, totalOwed}) => {
        this.setEffectivePrice(contributions, optionalCurrentDay);
        console.log("set effectivePrice")
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
