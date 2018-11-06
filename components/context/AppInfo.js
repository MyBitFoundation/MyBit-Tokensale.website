import AppInfoContext from './AppInfoContext';
import Web3 from 'web3';
import * as Core from '../../apis/core';
import { MYBIT_TICKER_COINMARKETCAP, debug } from '../constants/';
class AppInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleClickMobileMenu = this.handleClickMobileMenu.bind(this);
    this.loadMetamaskUserDetails = this.loadMetamaskUserDetails.bind(this);
    this.state = {
      mobileMenu: false,
      handleClickMobileMenu: this.handleClickMobileMenu,
    };
  }

  async componentDidMount() {
    // Modern dapp browsers...
    if (window.ethereum) {
      const { ethereum } = window;
      window.web3js = new Web3(ethereum);

      try {
        await ethereum.enable();
      } catch (error) {
      // User denied account access...
      }
    } else if (window.web3) {
      window.web3js = new Web3(new Web3.providers.WebsocketProvider(window.web3.currentProvider));
    }

    if (window.web3js) {
      this.setState({
        hasWeb3: true,
      });
      await this.loadMetamaskUserDetails();
      await this.loadPrices();
      //await this.fund(this.state.user.username, '0.1', 3);
      await this.getAllContributionsPerDay();
    }
  }

  async loadMetamaskUserDetails() {
    await Core.loadMetamaskUserDetails()
      .then((response) => {
        this.setState({
          user: response,
          loading: { ...this.state.loading, user: false },
        });
      })
      .catch((err) => {
        debug(err);
        if (this.state.userIsLoggedIn) {
          setTimeout(this.loadMetamaskUserDetails, 5000);
        }
      });
  }

  async loadPrices(){
    await Core.fetchPriceFromCoinmarketcap(MYBIT_TICKER_COINMARKETCAP)
      .then((priceInfo) => {
        this.setState({
          prices: {
            ...this.state.prices,
            mybit: {
              price: priceInfo.price,
            },
          },
          loading: {
            ...this.state.loading,
            priceMybit: false,
          },
        });
      })
      .catch((err) => {
        debug(err);
        error = true;
      });
  }

  async fund(){
    await Core.fund(this.state.user, 4, 10)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        debug(err);
        error = true;
      });
  }

  async getAllContributionsPerDay(){
    await Core.getAllContributionsPerDay()
      .then((contributions) => {
        this.setState({
          contributions,
        });
      })
      .catch((err) => {
        debug(err);
        error = true;
      });
  }

  handleClickMobileMenu(mobileMenu){
    this.setState({mobileMenu})
  }

  render(){
    if(this.state.hasWeb3 === undefined){
      return null;
    }

    return(
      <AppInfoContext.Provider value={this.state}>
        {this.props.children}
      </AppInfoContext.Provider>
    )
  }
};

export default AppInfo;
