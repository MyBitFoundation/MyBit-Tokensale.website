import React, { Fragment } from 'react'
import stylesheet from './calculate-contribution.scss'
import { Input } from 'antd'

const CalculateContribution = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="contentWrapper">
          <h2 className="calculateContribution__title">Calculate Your Contribution</h2>
          <div className="calculateContribution__input">
          <Input placeholder="Conribution in ETH" /> = <Input placeholder="Estimated MYB" />
          </div>
        </div>
    </Fragment>
)

export default CalculateContribution