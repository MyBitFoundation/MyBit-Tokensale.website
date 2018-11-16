import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Tooltip, Button } from 'antd'

const tokensaleClock = '../../static/tokensale/tokensale_clock.svg';
const tokensaleCoins = '../../static/tokensale/tokensale_coins.svg';
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const tokensaleMyb = '../../static/tokensale/tokensale_myb.svg';
const tokensaleTooltip = '../../static/tokensale/tokensale_questionIcon.svg';
import CountdownHours from '../countdownHours';
import { shortenAddress } from '../constants';

const TokensaleGrid = ({onShowContributeModal, onShowCalculateModal, currentPeriod, secondsToGo, totalOwed, daysOwed, batchWithdrawal, effectivePrice, userName, balance, isLoggedIn, enabled }) => {
  let metamaskToRender = undefined;
  if(enabled && isLoggedIn && userName){
    metamaskToRender = (
      <Fragment>
        <div className="tokensaleGrid__item-main">Connected account:</div>
        <div className="tokensaleGrid__item-address">{shortenAddress(userName, 9, 9)}</div>
        <div className="tokensaleGrid__item-main">Ether Account Balance</div>
        <div className="tokensaleGrid__item-eth">{Number(balance).toLocaleString('en-US', { maximumFractionDigits: 5 })} ETH</div>
      </Fragment>
    );
  } else if(enabled && !isLoggedIn){
    metamaskToRender = (
      <p className="tokensaleGrid__item-login">Login to Metamask to contribute and to claim your tokens.</p>
    )
  } else if(!enabled){
    metamaskToRender = (
      <Button
        className="ant-btn tokensaleGrid__button tokensaleGrid__button--is-metamask phaseTable__closed-row-button"
        onClick={() => window.ethereum.enable()}
      >
        Connect Metamask
      </Button>
    );
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
                <div className="tokensaleGrid__item-bold">{isLoggedIn ? totalOwed.toLocaleString() : 0} MYB</div>
                <Button
                  className="tokensaleGrid__button"
                  onClick={() => batchWithdrawal(daysOwed)}
                  disabled={totalOwed === 0 || !isLoggedIn}
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
