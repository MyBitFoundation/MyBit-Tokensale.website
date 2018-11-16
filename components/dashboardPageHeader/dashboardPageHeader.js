import React, { Fragment } from 'react'
import stylesheet from './dashboardPageHeader.scss'
import { Button, Alert } from 'antd'

const DashboardPageHeader = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="dashboardHeader">
            <Alert message="Metamask required to participate." type="error" closeText="Close" className="dashboardHeader__mobile" />
            <h1 className="dashboardHeader__main-title">MYB Token Distribution</h1>
            <div className="dashboardHeader__help">Welcome to the next era of wealth management applications,<br />Want to get started? Follow our guide </div>
            <Button className="dashboardHeader__guide">How-to guide</Button>
        </div>
    </Fragment>
)

export default DashboardPageHeader
