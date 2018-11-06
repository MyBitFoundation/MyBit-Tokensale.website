import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'
import PhaseTable from '../components/phaseTable/phase-table'
import DashboardPageHeader from '../components/dashboardPageHeader/dashboardPageHeader'
import TokensaleGrid from '../components/tokensaleGrid/tokensaleGrid'

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="LandingPage">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="headerWrapper">
            <div className="mainContainer">
              <Header isDark={false} />
              <DashboardPageHeader />
              <TokensaleGrid />
            </div>
          </div>

          <PhaseTable />

          <MyBitFooter />
        </div>
      </Layout>
    )
  }
}

export default Dashboard
