import React, { Fragment } from 'react'
import stylesheet from './dashboardPageHeader.scss'
import { Button, Alert } from 'antd'
import Logo from '../../static/svgs/icons/mybit-full-white.svg'

const DashboardPageHeader = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="dashboardHeader">
            <Logo className="dashboardHeader__logo"/>
            <Alert message={<p>Contributing on Mobile is not supported.<br />Please visit from your computer.</p>} type="error" closeText="Close" className="dashboardHeader__mobile" />
            <h1 className="dashboardHeader__main-title">Welcome to the MyBit Token Distribution</h1>
            <div className="dashboardHeader__help">Need help getting started? Follow our guide.</div>
            <a
              href="/guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="dashboardHeader__guide">View guide</Button>
            </a>
        </div>
    </Fragment>
)

export default DashboardPageHeader
