import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'
import MybContractInfo from '../components/mybContractInfo/contract-info'
import PhaseSection from '../components/phaseSection/phase-section'
import CalculateContribution from '../components/calculateContribution/calculate-contribution'
import PhaseTable from '../components/phaseTable/phase-table'

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="headerWrapper">
          <div className="mainContainer">
            <Header isDark={false} />
          </div>
        </div>

        <MybContractInfo />
        <PhaseSection />
        <CalculateContribution />
        <PhaseTable />

        <MyBitFooter />
      </Layout>
    )
  }
}

export default Dashboard
