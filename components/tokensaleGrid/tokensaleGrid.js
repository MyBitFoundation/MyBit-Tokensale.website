import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Tooltip, Button } from 'antd'

import Metamask from './sections/metamask';
import Calculate from './sections/calculate';
import GetMyb from './sections/getMyb';
import Claim from './sections/claim';
import Mobile from './sections/mobile';
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
  hasTooltip: false,
  component: GetMyb,
}, {
  img: tokensaleCoins,
  imgAlt: 'Coins',
  imgClassName: 'tokensaleCoins',
  hasTooltip: true,
  tooltipTitle: 'The number of MYB you receive is based entirely on the amount of ETH contributed and therefore may change constantly throughout a period. The exchange rate below is just an estimate and by no means a guarantee.',
  component: Calculate,
}, {
  img: tokensaleMetamask,
  imgAlt: 'Metamask',
  imgClassName: 'tokensaleMetamask',
  hasTooltip: false,
  component: Metamask,
}, {
  img: tokensaleMyb,
  imgAlt: 'Coins',
  imgClassName: 'tokensaleMyb',
  hasTooltip: true,
  tooltipTitle: 'Once a period ends, you can claim your MYB here.',
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
    allowed,
    currentPeriodTotal,
    exchangeRate,
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
        <Section
          hasTooltip={false}
        >
          <Mobile
            currentPeriod={currentPeriod}
            totalEthContributed={currentPeriodTotal}
            secondsToGo={secondsToGo}
          />
       </Section>
        </div>
      </div>
    </Fragment>
)}

export default TokensaleGrid
