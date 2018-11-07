import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Tooltip, Button } from 'antd'

const tokensaleClock = '../../static/tokensale/tokensale_clock.svg';
const tokensaleCoins = '../../static/tokensale/tokensale_coins.svg';
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const tokensaleMyb = '../../static/tokensale/tokensale_myb.svg';
const tokensaleTooltip = '../../static/tokensale/tokensale_questionIcon.svg';

const TokensaleGrid = ({onShowContributeModal, onShowCalculateModal }) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="tokensaleGrid__container">
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box1" placement="bottom">
                    <img src={tokensaleTooltip} alt="Tokensale Clock" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleClock} alt="Tokensale Clock" className="tokensaleClock"></img>
                <div className="tokensaleGrid__item-main">Phase <span className="tokensaleGrid__blue-span">#6</span> ends in:</div>
                <div className="tokensaleGrid__item-bold">00:11:34:56</div>
                <Button className="tokensaleGrid__button green" onClick={onShowContributeModal}>Get MYB</Button>
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box2">
                    <img src={tokensaleTooltip} alt="Tokensale Clock" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleCoins} alt="Tokensale Clock" className="tokensaleCoins"></img>
                <div className="tokensaleGrid__item-main">MYB Effective Price</div>
                <div className="tokensaleGrid__item-bold">$0.008</div>
                <Button className="tokensaleGrid__button blue" onClick={onShowCalculateModal}>Calculate</Button>
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box3">
                    <img src={tokensaleTooltip} alt="Tokensale Clock" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleMetamask} alt="Tokensale Clock" className="tokensaleMetamask"></img>
                <div className="tokensaleGrid__item-main">Connected account:</div>
                <div className="tokensaleGrid__item-address">0xce2572515970f…15b5f7567d</div>
                <div className="tokensaleGrid__item-main">Ether Account Balance</div>
                <div className="tokensaleGrid__item-eth">5 ETH</div>
            </div>
            <div className="tokensaleGrid__item">
                <Tooltip title="tooltip for box4">
                    <img src={tokensaleTooltip} alt="Tokensale Clock" className="tokensaleTooltip"></img>
                </Tooltip>
                <img src={tokensaleMyb} alt="Tokensale Clock" className="tokensaleMyb"></img>
                <div className="tokensaleGrid__item-main">MYB Ready to Claim</div>
                <div className="tokensaleGrid__item-bold">115,000 MYB</div>
                <Button className="tokensaleGrid__button blue">Claim</Button>
            </div>
        </div>
    </Fragment>
)

export default TokensaleGrid
