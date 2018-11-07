import React, { Fragment } from 'react'
import stylesheet from './dashboardPageHeader.scss'
import { Button } from 'antd'

const DashboardPageHeader = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="dashboardHeader">
          <h1 className="dashboardHeader__main-title">MYB Token Distribution</h1>
          <div className="dashboardHeader__help">Need help? Follow our guide!</div>
          <Button className="dashboardHeader__guide">Guide</Button>
        </div>
    </Fragment>
)

export default DashboardPageHeader
