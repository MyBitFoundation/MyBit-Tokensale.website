import { Fragment } from 'react'
import { Button } from 'antd'

const Calculate  = ({
  effectivePrice,
  onShowCalculateModal,
}) => (
  <Fragment>
    <div className="Section__title">MYB Effective Price</div>
    <div className="Section__bold">${effectivePrice.toLocaleString()}</div>
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
