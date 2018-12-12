import { Modal, Button } from 'antd'
import stylesheet from './howTo.scss'
import * as MyBitToken from '../constants/contracts/MyBitToken';

const Section = ({imgSrc, title, desc}) => (
  <div className="HowTo__wrapper-step">
    <img src={imgSrc}/>
    <p className="HowTo__wrapper-step-title">{title}</p>
    <p className="HowTo__wrapper-step-desc">{desc}</p>
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
  desc: <a>How to buy Ether</a>,
}, {
  imgSrc: '/static/tokensale/mybit-logo-circular.svg',
  title: 'Token Distribution Dashboard',
}]

const HowTo = ({visible, onClose }) => (
  <React.Fragment>
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Modal
      visible={visible}
      onOk={() => {}}
      onCancel={() => onClose(false)}
      footer={null}
      width={'auto'}
      wrapClassName="HowTo__wrapper"
      mask={false}
    >
      <p className="HowTo__wrapper-title">Token Distribution Guide</p>
      <div className="HowTo__wrapper-paddedSection">
        <p className="HowTo__wrapper-title-desc">Welcome to our token distribution guide. Here you will find all of the key information about our token distribution-as well as a step by step walkthrough to invest and claim your MYB</p>
        <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-small">Key Details</p>
        <p>Token distribution starts Jan 1. 2019 12:00 UTC.</p>
        <p>The token distribution lasts <b>365</b> days.</p>
        <p>Each period lasts <b>24 hours</b>.</p>
        <p>During each period <b>100,000</b> MYB is distributed.</p>
        <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-small">How is the amount of MYB you received determined?</p>
        <p>There is no set price, the amount you will received is based entirely on demand. In short,
        you will receive a proportion of the MyBit tokens depending on how much ETH was contributed during that 24 hour period.</p>
        <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-small HowTo__wrapper-subtitle--is-left">This is calculated using the following formula:</p>
        <div className="HowTo__wrapper-img-calculate">
          <p className="HowTo__wrapper-img-calculate-formula">(Your Contribution / (ETH) / Total(ETH)) * 100,000</p>
          <p className="HowTo__wrapper-img-calculate-example">For example. If 10ETH is contributed during one and you contributed 1 ETH of that, you would receive 10% or 10,000 MYB.</p>
        </div>
      </div>
      <div className="HowTo__wrapper-paddedSection">
        <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-medium">Steps to Participate:</p>
        <p>To take part in the tokensale you will need MetaMask and an Ethereum address (as well as the ETH you wish to invest).</p>
        <div className="HowTo__wrapper--steps">
          {sections.map(section => (
            <Section {...section}/>
          ))}
        </div>
        <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-medium">To invest:</p>
        <p>Choose the period in which you want to invest; you can invest in both current and future periods.</p>
        <p>To invest in the current period, click the green 'Get MYB' button.</p>
      </div>
      <div className="HowTo__wrapper-img-template" />
      <div className="HowTo__wrapper-paddedSection"><p>Choose the amount of ETH and click Contribute</p></div>
      <div className="HowTo__wrapper-img-template" />
      <div className="HowTo__wrapper-paddedSection"><p>Then sign the transaction in MetaMask.</p></div>
      <div className="HowTo__wrapper-img-template" />
      <div className="HowTo__wrapper-paddedSection"><p>To invest in a future period, click the blue calculate button.</p></div>
      <div className="HowTo__wrapper-img-template" />
      <div className="HowTo__wrapper-paddedSection"><p>and select a future period.</p></div>
      <div className="HowTo__wrapper-img-template" />

      <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-medium">To claim:</p>
      <p>After each period ends, you are able to withdraw MYB to your MetaMask account. <br />
      Click the claim button and confirm with MetaMask. That's it!</p>
      <div className="HowTo__wrapper-img-template" />
      <p className="HowTo__wrapper-subtitle HowTo__wrapper-subtitle--is-small">Contribute now</p>
        <Button
          onClick={() => {
            onClose(true);
          }}
          className="HowTo__wrapper-btn"
        >
          Contribute
        </Button>
      <p className="HowTo__wrapper-address-text">Token sale contract address:</p>
      <a
        className="HowTo__wrapper-address"
        href={`https://ropsten.etherscan.io/address/${MyBitToken.ADDRESS}#code`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {MyBitToken.ADDRESS}
      </a>
    </Modal>
  </React.Fragment>
)

export default HowTo;
