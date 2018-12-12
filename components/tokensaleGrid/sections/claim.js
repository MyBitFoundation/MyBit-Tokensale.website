import { Fragment } from 'react'
import { Button } from 'antd'
import AnimatedNumber from 'react-animated-number';

const Claim  = ({
  totalOwed,
  daysOwed,
  isLoggedIn,
  batchWithdrawing,
  allowed,
  batchWithdrawal,
  currentPeriod,
}) => (
  <Fragment>
    <div className="Section__title">MYB Ready to Claim</div>
    <div className={currentPeriod ? "Section__bold" : "Section__bold Section__bold--not-started2"}>
      <AnimatedNumber
        component="text"
        style={{
            transition: '0.5s ease-out',
            opacity: 1,
            transitionProperty: 'opacity',
        }}
        frameStyle={perc => (
            perc === 100 ? {} : {opacity: (perc / 100).toFixed(2)}
        )}

        value={totalOwed}
        duration={1000}
        stepPrecision={0}
        formatValue={n => n.toLocaleString()}
      />
    </div>
    <Button
      className="TokenSaleGrid__button"
      onClick={() => batchWithdrawal(daysOwed)}
      disabled={daysOwed.length === 0 || !isLoggedIn || batchWithdrawing || allowed === false}
      type="primary"
    >
      Claim
    </Button>
  </Fragment>
)

export default Claim;
