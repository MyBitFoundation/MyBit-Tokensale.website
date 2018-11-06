import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'
import PhaseTable from '../components/phaseTable/phase-table'
import DashboardPageHeader from '../components/dashboardPageHeader/dashboardPageHeader'
import TokensaleGrid from '../components/tokensaleGrid/tokensaleGrid'
import ContributeModal from '../components/tokensaleGrid/contributeModal'

class Dashboard extends Component {
  state = {
    loading: false,
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleConfirm = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div>
        <ContributeModal
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleConfirm={this.handleConfirm}
          loading={this.state.loading}
        />
        <Layout>
          <div className="LandingPage">
            <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <div className="headerWrapper">
              <div className="mainContainer">
                <Header isDark={false} />
                <DashboardPageHeader />
                <TokensaleGrid onShowModal={this.showModal} />
              </div>
            </div>

            <PhaseTable onShowModal={this.showModal} />
            <MyBitFooter />
          </div>
        </Layout>
      </div>
    )
  }
}

export default Dashboard
