import { Fragment } from 'react';
import { Button } from 'antd';
import { shortenAddress } from '../../constants';

const getSuccess = (userName, balance) =>
  <Fragment>
    <div className="Section__title">Connected account:</div>
    <div className="Section--is-metamask-address">{shortenAddress(userName, 9, 9)}</div>
    <div className="Section__title">Ether Account Balance</div>
    <div className="Section__eth">{Number(balance).toLocaleString('en-US', { maximumFractionDigits: 5 })} ETH</div>
  </Fragment>

const getLogin = () =>
  <p className="Section--is-metamask-login">Login to Metamask to contribute and to claim your tokens.</p>

const getMetamaskRequired = (extensionUrl, isBraveBrowser) => {
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

const getRopsten = () =>
  <p className="Section--is-metamask-ropsten">Switch to the Ropsten test network to contribute.</p>

const getConnectMetamask = () =>
  <Button
    className="ant-btn TokenSaleGrid__button TokenSaleGrid__button--is-metamask phaseTable__closed-row-button"
    onClick={() => window.ethereum.enable()}
  >
    Connect Metamask
  </Button>

const Metamask  = ({
  enabled,
  isLoggedIn,
  userName,
  network,
  isMetamaskInstalled,
  extensionUrl,
  isBraveBrowser,
  balance
}) => {

  let metamaskToRender = null;

  if(enabled && isLoggedIn && userName && network === 'ropsten'){
    metamaskToRender = getSuccess(userName, balance);
  } else if(enabled && !isLoggedIn && network === 'ropsten'){
    metamaskToRender = getLogin();
  } else if(!isMetamaskInstalled){
    metamaskToRender = getMetamaskRequired(extensionUrl, isBraveBrowser);
  } else if(network && network != 'ropsten') {
    metamaskToRender = getRopsten();
  } else if(!enabled){
    metamaskToRender = getConnectMetamask();
  }

  return (
    <div className="Section--is-metamask">
      {metamaskToRender}
    </div>
  )
};

export default Metamask;
