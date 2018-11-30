import CountdownHours from '../countdownHours';
import { Button } from 'antd';
import Link from 'next/link'

const TokenSaleDetails = ({currentPeriod, secondsUntilNextPeriod, ethPrice, currentPeriodTotal, active}) => {
  const price = (ethPrice * currentPeriodTotal) / 100000;
  return (
    <div className="TokenSaleDetails TokenSaleDetails--is-active">
      <p className="Banner__title">Period <span className="Banner__title--is-green">{`#${currentPeriod}`}</span> ends in:
        <span className="TokenSaleDetails__countdown">
          <CountdownHours
            time={secondsUntilNextPeriod}
          />
        </span>
      </p>
      <div className="TokenSaleDetails__group">
        <div>
          <p className="TokenSaleDetails__title">Effective Price</p>
          <p className="TokenSaleDetails__value">{`$${price.toLocaleString()} MYB`}</p>
        </div>
        <div>
          <p className="TokenSaleDetails__title">ETH Received</p>
          <p className="TokenSaleDetails__value">{`${currentPeriodTotal.toLocaleString()} ETH`}</p>
        </div>
      </div>
      <a href="/dashboard">
       <Button
          type="primary"
          className="TokenSaleDetails-btn"
        >
          Contribute
        </Button>
      </a>
    </div>
  )
}

export default TokenSaleDetails;
