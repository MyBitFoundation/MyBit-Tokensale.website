import { Fragment } from 'react'
import { Button } from 'antd'

const Calculate  = ({
  onShowCalculateModal,
  currentPeriod,
  exchangeRate
}) => (
  <Fragment>
    <div className="Section__title">Current exchange rate</div>
    <div className={currentPeriod ? "Section__bold" : "Section__bold Section__bold--not-started2"}>{`1 ETH = ${exchangeRate.toLocaleString('en-US', {minimumFractionDigits: 3})} MYB`}</div>
    <Button
      className="TokenSaleGrid__button"
      onClick={onShowCalculateModal}
      type="primary"
    >
      Calculate
    </Button>
  </Fragment>

)

export default Calculate;
