import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'
import PhaseTable from '../components/phaseTable/phase-table'
import DashboardPageHeader from '../components/dashboardPageHeader/dashboardPageHeader'
import TokensaleGrid from '../components/tokensaleGrid/tokensaleGrid'
import ContributeModal from '../components/contributeModal/contributeModal'
import CalculateModal from '../components/calculateModal/calculateModal'

class Dashboard extends Component {
  state = {
    showContributeModal: false,
    showCalculateModal: false
  }

  /* CONTRIBUTE MODAL FUNCTIONS */
  showContributeModal = () => {
    this.setState({
      showContributeModal: true
    })
  }

  handleContributeConfirm = e => {
    this.setState({ showContributeModal: false })
    console.log('Contribute Modal Confirmed!')
  }

  handleContributeCancel = e => {
    this.setState({ showContributeModal: false })
    console.log('Contribute Modal Canceled!')
  }

  onContributeChange = value => {
    console.log('Amount to Contribute Changed! ', value)
  }

  onSelectChange = value => {
    console.log('Phase Select Changed! ', value)
  }

  /* CALCULATE MODAL FUNCTIONS */
  showCalculateModal = e => {
    e.preventDefault()
    this.setState({
      showCalculateModal: true
    })
  }

  handleCalculateConfirm = e => {
    e.preventDefault()
    this.setState({ showCalculateModal: false })
    console.log('Calculate Modal Confirmed!')
  }

  handleCalculateCancel = e => {
    e.preventDefault()
    this.setState({ showCalculateModal: false })
    console.log('Calculate Modal Canceled!')
  }

  onContributeChange = value => {
    console.log('Amount to Calculate Changed! ', value)
  }

  onSelectChange = value => {
    console.log('Phase Select Changed! ', value)
  }

  render() {
    return (
      <div>
        <ContributeModal
          visible={this.state.showContributeModal}
          handleCancel={this.handleContributeCancel}
          handleConfirm={this.handleContributeConfirm}
          onSelectChange={this.onSelectChange}
          onContributeChange={this.onContributeChange}
        />
        <CalculateModal
          visible={this.state.showCalculateModal}
          handleCancel={this.handleCalculateCancel}
          handleConfirm={this.handleCalculateConfirm}
          onSelectChange={this.onSelectChange}
          onContributeChange={this.onContributeChange}
        />
        <Layout>
          <div className="LandingPage">
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <div className="headerWrapper">
              <div className="mainContainer">
                <Header isDark={false} />
                <DashboardPageHeader />
                <TokensaleGrid
                  onShowContributeModal={this.showContributeModal}
                  onShowCalculateModal={this.showCalculateModal}
                />
              </div>
            </div>

            <PhaseTable onShowContributeModal={this.showContributeModal} />
            <MyBitFooter />
          </div>
        </Layout>
      </div>
    )
  }
}

export default Dashboard
