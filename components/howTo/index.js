import { Modal, Button } from 'antd'
import stylesheet from './howTo.scss'
import * as MyBitToken from '../constants/contracts/MyBitToken';
import {
  MYBIT_DISTRIBUTION_CODE_AUDIT
} from '../constants';

const Section = ({imgSrc, title, desc}) => (
  <div className="HowTo__step">
    <img src={imgSrc}/>
    <p className="HowTo__step-title">{title}</p>
    <p className="HowTo__step-desc">{desc}</p>
  </div>
);

const sections = [{
  imgSrc: '/static/tokensale/metamask.svg',
  title: 'MetaMask',
  desc: <a
          href="https://metamask.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download here
        </a>,
}, {
  imgSrc: '/static/tokensale/etherBlack.svg',
  title: 'Ether',
  desc: <a
          href="https://www.coinbase.com/buy-ethereum"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to buy Ether
        </a>,
}, {
  imgSrc: '/static/tokensale/mybit-logo-circular.svg',
  title:  <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Token Distribution Dashboard
          </a>,
}]

const HowTo = () => (
  <React.Fragment>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className="HowTo">

      <div className="HowTo__paddedSection">
        <p className="HowTo__title">Token Distribution Guide</p>
        <p className="HowTo__title-desc">Welcome to our token distribution guide. Here you will find all of the key information about our token distribution, as well as a step by step walkthrough to contribute ETH and claim your MYB.</p>
      </div>
      <section>
        <p className="HowTo__subtitle HowTo__subtitle--is-medium">Key Details</p>
        <p>Token distribution starts <b>Jan 1. 2019 12:00 UTC</b>.</p>
        <p>The token distribution lasts <b>365 days</b>.</p>
        <p>Each period lasts <b>24 hours</b>.</p>
        <p>During each period <b>100,000 MYB</b> are distributed.</p>
        <p>A total of <b>36.5 million MYB</b> will be distributed.</p>
      </section>
      <div className="HowTo__paddedSection">
        <p className="HowTo__subtitle HowTo__subtitle--is-small" style={{marginTop: '20px'}}>How is the amount of MYB you receive determined?</p>
        <p>There is no set price, the amount you will receive is based entirely on demand. In short,
        you will receive a proportion of the 100,000 MYB depending on how much ETH was contributed during that 24 hour period.</p>
        <p className="HowTo__subtitle HowTo__subtitle--is-small HowTo__subtitle--is-left">This is calculated using the following formula:</p>
        <div className="HowTo__img-calculate">
          <p className="HowTo__img-calculate-formula">(Your contribution in ETH / Total ETH contributed) * 100,000</p>
          <p className="HowTo__img-calculate-example">For example: If 10 ETH is contributed during a period and you contributed 1 ETH, you would receive 10% or 10,000 MYB.</p>
        </div>
      </div>
      <section>
        <p className="HowTo__subtitle HowTo__subtitle--is-medium">Steps to Participate:</p>
        <p>To take part in the token distribution you will need MetaMask <br /> (as well as the ETH you wish to contribute).</p>
        <div className="HowTo__steps">
          {sections.map(section => (
            <Section {...section}/>
          ))}
        </div>
      </section>
      <div className="HowTo__paddedSection">
        <p className="HowTo__subtitle">How to contribute to the curent period:</p>
        <p>To contribute to the current period click the "Connect MetaMask" button. Once connected, click the green "Get MYB" button and select your contribution amount in ETH.</p>
        <p>Wait for the transaction to confirm and you're done.</p>
      </div>
      <video loop controls muted>
        <source src="/static/tokensale/investing.mp4" type="video/mp4" />
      </video>

      <div className="HowTo__paddedSection">
        <p className="HowTo__subtitle" style={{marginTop: '20px'}}>How to contribute to a future period:</p>
        <p>To contribute to a future period click the blue "Calculate" button and select a future period from the dropdown.</p>
      </div>
      <video loop controls muted>
        <source src="/static/tokensale/invest_future.mp4" type="video/mp4" />
      </video>


      <div className="HowTo__paddedSection">
        <p className="HowTo__subtitle">How to claim your MYB:</p>
        <p>After each period has ended you are able to withdraw MYB to your metamask account. Click the blue "Claim" button and sign via MetaMask.</p>
      </div>
      <video loop controls muted>
        <source src="/static/tokensale/claiming.mp4" type="video/mp4" />
      </video>

      <div className="HowTo__paddedSection">
        <p className="HowTo__subtitle HowTo__subtitle--is-contribute">Contribute Now</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <Button
            className="HowTo__btn"
          >
            Contribute
          </Button>
        </a>
        <p className="HowTo__address-text">Token Distribution contract address:</p>
        <a
          className="HowTo__address"
          href={`https://ropsten.etherscan.io/address/${MyBitToken.ADDRESS}#code`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {MyBitToken.ADDRESS}
        </a>
        <p>Code Audit{' '}(
          <a
            href="#"
            href={MYBIT_DISTRIBUTION_CODE_AUDIT}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          )
        </p>
        <img
          className="HowTo__solidified"
          src="/static/tokensale/solidified-ico.png"
        />
      </div>
    </div>
  </React.Fragment>
)

export default HowTo;
