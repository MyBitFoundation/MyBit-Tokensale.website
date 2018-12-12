import { Modal, Button } from 'antd'
import stylesheet from './howTo.scss'
import * as MyBitToken from '../constants/contracts/MyBitToken';

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
  title: 'Token Distribution Dashboard',
}]

const HowTo = () => (
  <div className="HowTo">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className="HowTo__paddedSection">
      <p className="HowTo__title">Token Distribution Guide</p>
      <p className="HowTo__title-desc">Welcome to our token distribution guide. Here you will find all of the key information about our token distribution-as well as a step by step walkthrough to invest and claim your MYB.</p>
    </div>
    <section>
      <p className="HowTo__subtitle HowTo__subtitle--is-medium">Key Details</p>
      <p>Token distribution starts Jan 1. 2019 12:00 UTC.</p>
      <p>The token distribution lasts <b>365</b> days.</p>
      <p>Each period lasts <b>24 hours</b>.</p>
      <p>During each period <b>100,000</b> MYB is distributed.</p>
    </section>
    <div className="HowTo__paddedSection">
      <p className="HowTo__subtitle HowTo__subtitle--is-medium" style={{marginTop: '20px'}}>How is the amount of MYB you received determined?</p>
      <p>There is no set price, the amount you will received is based entirely on demand. In short,
      you will receive a proportion of the MyBit tokens depending on how much ETH was contributed during that 24 hour period.</p>
      <p className="HowTo__subtitle HowTo__subtitle--is-medium HowTo__subtitle--is-left">This is calculated using the following formula:</p>
      <div className="HowTo__img-calculate">
        <p className="HowTo__img-calculate-formula">(Your Contribution / (ETH) / Total(ETH)) * 100,000</p>
        <p className="HowTo__img-calculate-example">For example. If 10ETH is contributed during one and you contributed 1 ETH of that, you would receive 10% or 10,000 MYB.</p>
      </div>
    </div>
    <section>
      <p className="HowTo__subtitle HowTo__subtitle--is-big">Steps to Participate:</p>
      <p>To take part in the tokensale you will need MetaMask and an Ethereum address <br /> (as well as the ETH you wish to invest).</p>
      <div className="HowTo__steps">
        {sections.map(section => (
          <Section {...section}/>
        ))}
      </div>
    </section>
    <div className="HowTo__paddedSection">
      <p className="HowTo__subtitle" style={{marginTop: '20px'}}>To invest:</p>
      <p>Choose the period in which you want to invest; you can invest in both current and future periods.</p>
      <p>To invest in the current period, click the green 'Get MYB' button.</p>
    </div>
    <video loop controls autoPlay muted>
      <source src="/static/tokensale/investing.mp4" type="video/mp4" />
    </video>
    <div className="HowTo__paddedSection"><p>Choose the amount of ETH and click Contribute</p></div>
    <div className="HowTo__img-template" />
    <div className="HowTo__paddedSection"><p>Then sign the transaction in MetaMask.</p></div>
    <div className="HowTo__img-template" />
    <div className="HowTo__paddedSection"><p>To invest in a future period, click the blue calculate button.</p></div>
    <div className="HowTo__img-template" />
    <div className="HowTo__paddedSection"><p>and select a future period.</p></div>
    <div className="HowTo__img-template" />

    <div className="HowTo__paddedSection">
      <p className="HowTo__subtitle HowTo__subtitle--is-big">To claim:</p>
      <p>After each period ends, you are able to withdraw MYB to your MetaMask account. <br />
      Click the claim button and confirm with MetaMask. That's it!</p>
      <div className="HowTo__img-template" />
      <p className="HowTo__subtitle HowTo__subtitle--is-medium">Contribute now</p>
        <a
          href="/dashboard"
        >
        <Button
          className="HowTo__btn"
        >
          Contribute
        </Button>
      </a>
      <p className="HowTo__address-text">Token sale contract address:</p>
      <a
        className="HowTo__address"
        href={`https://ropsten.etherscan.io/address/${MyBitToken.ADDRESS}#code`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {MyBitToken.ADDRESS}
      </a>
    </div>
  </div>
)

export default HowTo;
