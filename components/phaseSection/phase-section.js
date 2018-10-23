import React, { Fragment } from 'react'
import stylesheet from './phase-section.scss'
import { Row, Col } from 'antd'

const PhaseSection = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="current-phase-account-full-container">
          <div className="contentWrapper">
            <Row>
              <Col span={12} className="phaseData_bg">
                <div className="phaseData">
                  <div className="phaseData__title">Distribution Period #6</div>
                  <p className="phaseData__stats">Total MYB for period: 100,000 MYB</p>
                  <p className="phaseData__stats">Current period ends in: 15hr 43 mins</p>
                  <p className="phaseData__stats">Total contributed: 8.3 ETH</p>
                  <p className="phaseData__stats">MYB price: $0.002</p>
                  <button className="phaseData_button">Contribute</button>
                </div>
              </Col>
              <Col span={12}>
                <div className="accountData">
                  <div className="accountData__title">Account balance</div>
                  <div className="accountData__entry">
                    Connected account: <span className="accountData__entry-bold">0xa7a13659692239c143dae3136d5b5c18d26c</span>
                  </div>
                  <div className="accountData__entry">
                    MYB ready to claim: <span className="accountData__entry-bold">115,000 MYB</span>
                  </div>
                  <div className="accountData__entry">
                    Ether account Balance: <span className="accountData__entry-bold">5 ETH</span>
                  </div>
                  <button className="accountData_button">Claim</button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
    </Fragment>
)

export default PhaseSection