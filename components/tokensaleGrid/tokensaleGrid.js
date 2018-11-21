import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Tooltip, Button } from 'antd'

const tokensaleClock = '../../static/tokensale/tokensale_clock.svg';
const tokensaleCoins = '../../static/tokensale/tokensale_coins.svg';
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const tokensaleMyb = '../../static/tokensale/tokensale_myb.svg';
const tokensaleTooltip = '../../static/tokensale/tokensale_questionIcon.svg';
import AnimatedNumber from 'react-animated-number';

import CountdownHours from '../countdownHours';
import { shortenAddress } from '../constants';

const TokensaleGrid = ({
  onShowContributeModal,
  onShowCalculateModal,
  currentPeriod,
  secondsToGo,
  totalOwed,
  daysOwed,
  batchWithdrawal,
  effectivePrice,
  userName,
  balance,
  isLoggedIn,
  enabled,
  isMetamaskInstalled,
  extensionUrl,
  isBraveBrowser,
  network,
  timestampStartTokenSale,
}) => {
  let metamaskToRender = undefined;
  if(enabled && isLoggedIn && userName && network === 'ropsten'){
    metamaskToRender = (
      <Fragment>
        <div className="tokensaleGrid__item-main">Connected account:</div>
        <div className="tokensaleGrid__item-address">{shortenAddress(userName, 9, 9)}</div>
        <div className="tokensaleGrid__item-main">Ether Account Balance</div>
        <div className="tokensaleGrid__item-eth">{Number(balance).toLocaleString('en-US', { maximumFractionDigits: 5 })} ETH</div>
      </Fragment>
    );
  } else if(enabled && !isLoggedIn && network === 'ropsten'){
    metamaskToRender = (
      <p className="tokensaleGrid__item-login">Login to Metamask to contribute and to claim your tokens.</p>
    )
  } else if(!isMetamaskInstalled){
    metamaskToRender = (
      <Fragment>
        <div className="tokensaleGrid__item-main tokensaleGrid__item-main-metamaskRequired">Metamask required to contribute.</div>
        <a
          href={isBraveBrowser ? undefined : extensionUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={ (e) => isBraveBrowser && e.preventDefault() }
        >
          <Button
            className="ant-btn tokensaleGrid__button tokensaleGrid__button--is-metamask tokensaleGrid__button--is-metamask-install phaseTable__closed-row-button"
          >
            {isBraveBrowser ? 'Brave is cool.' : 'Install Metamask'}
          </Button>
        </a>
      </Fragment>
    );
  } else if(network && network != 'ropsten') {
    metamaskToRender = (
      <p className="tokensaleGrid__item-ropsten">Switch to the Ropsten test network to contribute.</p>
    )
  } else if(!enabled){
    metamaskToRender = (
      <Button
        className="ant-btn tokensaleGrid__button tokensaleGrid__button--is-metamask phaseTable__closed-row-button"
        onClick={() => window.ethereum.enable()}
      >
        Connect Metamask
      </Button>
    )
  }

  return (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="tokensaleGrid__container">
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box1" className="tokensaleGrid_tooltip" overlayClassName="tokensaleGrid_tooltip-inner">
                    <img src={tokensaleTooltip} alt="Tokensale Clock" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleClock} alt="Tokensale Clock" className="tokensaleClock"></img>
                <div className="tokensaleGrid__item-main">Phase <span className="tokensaleGrid__blue-span">#{currentPeriod}</span> ends in:</div>
                <div className="tokensaleGrid__item-bold">
                  <CountdownHours
                    time={secondsToGo}
                    key={secondsToGo}
                  />
                </div>
                <Button
                  className="tokensaleGrid__button green"
                  onClick={onShowContributeModal}
                >
                  Get MYB
                </Button>
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box2" className="tokensaleGrid_tooltip" overlayClassName="tokensaleGrid_tooltip-inner">
                    <img src={tokensaleTooltip} alt="Tokensale Coins" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleCoins} alt="Tokensale Clock" className="tokensaleCoins"></img>
                <div className="tokensaleGrid__item-main">MYB Effective Price</div>
                <div className="tokensaleGrid__item-bold">${effectivePrice.toLocaleString()}</div>
                <Button
                  className="tokensaleGrid__button"
                  onClick={onShowCalculateModal}
                  type="primary"
                >
                  Calculate
                </Button>
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box3" className="tokensaleGrid_tooltip" overlayClassName="tokensaleGrid_tooltip-inner">
                    <img src={tokensaleTooltip} alt="Tokensale Metamask Logo" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleMetamask} alt="Tokensale Clock" className="tokensaleMetamask"></img>
                {metamaskToRender}
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="Enumerating objects: 9, done.
Counting objects: 100% (9/9), done." className="tokensaleGrid_tooltip" overlayClassName="tokensaleGrid_tooltip-inner">
                    <img src={tokensaleTooltip} alt="Tokensale MYB Token Logo" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleMyb} alt="Tokensale Clock" className="tokensaleMyb"></img>
                <div className="tokensaleGrid__item-main">MYB Ready to Claim</div>
                <div className="tokensaleGrid__item-bold">
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
                  className="tokensaleGrid__button"
                  onClick={() => batchWithdrawal(daysOwed)}
                  disabled={!totalOwed || totalOwed === 0 || !isLoggedIn}
                  type="primary"
                >
                  Claim
                </Button>
            </div>
        </div>
        <div className="tokensaleGrid__mobile">
            <div className="tokensaleGrid__item">
                <div className="tokensaleGrid__item-main">Phase <span className="tokensaleGrid__blue-span">#{currentPeriod}</span> ends in:</div>
                <div className="tokensaleGrid__item-bold">
                  <CountdownHours
                    time={secondsToGo}
                  />
                </div>
                <div className="tokensaleGrid__item-main">ETH Contributed:</div>
                <div className="tokensaleGrid__item-eth">5 ETH</div>
            </div>
        </div>
    </Fragment>
)}

export default TokensaleGrid
