import React, { Fragment } from 'react'
import stylesheet from './dashboardPageHeader.scss'

const DashboardPageHeader = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="dashboardHeader">
          <h1 className="dashboardHeader__main-title">MYB Token Distribution</h1>
          <div className="dashboardHeader__help">Need help? Follow our guide!</div>
          <button className="dashboardHeader__guide">Guide</button>
        </div>
    </Fragment>
)

export default DashboardPageHeader
