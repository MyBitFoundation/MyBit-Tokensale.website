import { Fragment } from 'react';
import { Button } from 'antd';
import {
  shortenAddress,
  correctNetwork,
} from '../../constants';

class Metamask extends React.Component{

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.userName !== nextProps.userName){
      return true;
    } else if (this.props.balance !== nextProps.balance){
      return true;
    } else if (this.props.isLoggedIn !== nextProps.isLoggedIn){
      return true;
    } else if (this.props.enabled !== nextProps.enabled){
      return true;
    }

    return false;
  }

 getSuccess = (userName, balance) =>
  <Fragment>
    <div className="Section__title">Connected Account:</div>
    <div className="Section--is-metamask-address">{shortenAddress(userName, 9, 9)}</div>
    <div className="Section__title">Ether Account Balance</div>
    <div className="Section__eth">{Number(balance).toLocaleString('en-US', { maximumFractionDigits: 5 })} ETH</div>
  </Fragment>

  getLogin = () =>
    <p className="Section--is-metamask-login">Login to Metamask to contribute and to claim your tokens.</p>

  getMetamaskRequired = (extensionUrl, isBraveBrowser) => {
    if(!extensionUrl){
      return(
        <Fragment>
          <div className="Section__title Section--is-metamask-required">Your browser does not support
            <a
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}Metamask.{' '}
            </a>
            <p style={{fontSize: '16px', marginTop: '10px'}}>Please try
            <a
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}Chrome
            </a>,
            <a
              href="https://www.mozilla.org/firefox/new/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}Firefox
            </a>, or
            <a
              href="https://brave.com/download/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}Brave
            </a>.</p>
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div className="Section__title Section--is-metamask-required">Metamask required to contribute.</div>
          <a
            href={isBraveBrowser ? undefined : extensionUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={ (e) => isBraveBrowser && e.preventDefault() }
          >
            <Button
              className="ant-btn TokenSaleGrid__button TokenSaleGrid__button--is-metamask TokenSaleGrid__button--is-metamask-install phaseTable__closed-row-button"
            >
              {isBraveBrowser ? 'Brave is cool.' : 'Install Metamask'}
            </Button>
          </a>
        </Fragment>
      )
    }
  }

  getCorrectNetwork = () =>
    <p className="Section--is-metamask-correctNetwork">Switch to the Ethereum network to contribute.</p>

  getConnectMetamask = () =>
    <Button
      className="ant-btn TokenSaleGrid__button TokenSaleGrid__button--is-metamask phaseTable__closed-row-button"
      onClick={() => window.ethereum.enable()}
    >
      Connect Metamask
    </Button>

  render(){
    let metamaskToRender = null;

    const {
      enabled,
      isLoggedIn,
      userName,
      network,
      isMetamaskInstalled,
      extensionUrl,
      isBraveBrowser,
      balance
    } = this.props;

    if(enabled && isLoggedIn && userName && network === correctNetwork){
      metamaskToRender = this.getSuccess(userName, balance);
    } else if(enabled && !isLoggedIn && network === correctNetwork){
      metamaskToRender = this.getLogin();
    } else if(!isMetamaskInstalled){
      metamaskToRender = this.getMetamaskRequired(extensionUrl, isBraveBrowser);
    } else if(network && network != correctNetwork) {
      metamaskToRender = this.getCorrectNetwork();
    } else if(!enabled){
      metamaskToRender = this.getConnectMetamask();
    }

    return (
      <div className="Section--is-metamask">
        {metamaskToRender}
      </div>
    )
  }

};

export default Metamask;
