import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Tooltip, Button } from 'antd'

import CountdownHours from '../countdownHours';
import Metamask from './sections/metamask';
import Calculate from './sections/calculate';
import GetMyb from './sections/getMyb';
import Claim from './sections/claim';
import Section from './sections/section';

const tokensaleClock = '../../static/tokensale/tokensale_clock.svg';
const tokensaleCoins = '../../static/tokensale/tokensale_coins.svg';
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const tokensaleMyb = '../../static/tokensale/tokensale_myb.svg';
const tokensaleTooltip = '../../static/tokensale/tokensale_questionIcon.svg';

const sections = [{
  img: tokensaleClock,
  imgAlt: 'Clock',
  imgClassName: 'tokensaleClock',
  hasTooltip: true,
  tooltipTitle: 'Clock',
  component: GetMyb,
}, {
  img: tokensaleCoins,
  imgAlt: 'Coins',
  imgClassName: 'tokensaleCoins',
  hasTooltip: true,
  tooltipTitle: 'Coins',
  component: Calculate,
}, {
  img: tokensaleMetamask,
  imgAlt: 'Metamask',
  imgClassName: 'tokensaleMetamask',
  hasTooltip: true,
  tooltipTitle: 'Metamask',
  component: Metamask,
}, {
  img: tokensaleMyb,
  imgAlt: 'Coins',
  imgClassName: 'tokensaleMyb',
  hasTooltip: true,
  tooltipTitle: 'Coins',
  component: Claim,
}]

const TokensaleGrid = (props) => {
  const {
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
    batchWithdrawing,
    allowed
  } = props;
  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <div className="TokenSaleGrid">
        <div className="TokenSaleGrid__container">
          {sections.map(section => (
            <Section
              img={section.img}
              imgAlt={section.imgAlt}
              imgClassName={section.imgClassName}
              hasTooltip={section.hasTooltip}
              tooltipTitle={section.tooltipTitle}
            >
              <section.component
                {...props}
              />
            </Section>
          ))}
        </div>
        <div className="TokenSaleGrid__mobile">
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
      </div>
    </Fragment>
)}

export default TokensaleGrid
