import CountdownHours from '../countdownHours';
import { Button } from 'antd';
import Link from 'next/link'

const TokenSaleDetails = ({currentPeriod, secondsUntilNextPeriod, exchangeRate, currentPeriodTotal, active}) => {
  return (
    <div className="TokenSaleDetails TokenSaleDetails--is-active">
      <p className="Banner__title">Period <span className="Banner__title--is-blue">{`#${currentPeriod}`}</span> ends in:
        <span className="TokenSaleDetails__countdown">
        {currentPeriod && (
          <CountdownHours
            time={secondsUntilNextPeriod}
            key={currentPeriod}
          />
        )}
        </span>
      </p>
      <div className="TokenSaleDetails__group">
        <div>
          <p className="TokenSaleDetails__title">Current Exchange Rate</p>
          <p className="TokenSaleDetails__value">{`1ETH/${exchangeRate.toLocaleString('en-US', {maximumFractionDigits: 0})} MYB`}</p>
        </div>
        <div>
          <p className="TokenSaleDetails__title">ETH Contributed</p>
          <p className="TokenSaleDetails__value">{`${currentPeriodTotal.toLocaleString('en-US')} ETH`}</p>
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
