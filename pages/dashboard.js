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
import AppInfoContext from '../components/context/AppInfoContext'
import { Pagination, Alert } from 'antd'
import Notifications from '../components/notifications'
import { getSecondsUntilNextPeriod } from '../components/constants'

class Dashboard extends Component {
  state = {
    showContributeModal: false,
    showCalculateModal: false,
    periodsPerPage: 20,
    currentPage: 0,
    selectedDay: this.props.currentDay,
    selectedAmount: undefined,
    type: 'info'
  }

  /* CONTRIBUTE MODAL FUNCTIONS */
  showContributeModal = selectedDay => {
    this.setState({
      showContributeModal: true,
      selectedDay
    })
  }

  handleContributeConfirm = e => {
    this.setState({
      showContributeModal: false,
      showCalculateModal: false,
      selectedAmount: undefined
    })
    this.props.fund(this.state.selectedAmount, this.state.selectedDay)
  }

  handleContributeCancel = e => {
    this.setState({
      showContributeModal: false,
      selectedDay: this.props.currentDay
    })
  }

  onContributeChange = contribution => {
    this.setState({ contribution })
  }

  /* CALCULATE MODAL FUNCTIONS */
  showCalculateModal = e => {
    e.preventDefault()
    this.setState({
      showCalculateModal: true
    })
  }

  handleCalculateCancel = e => {
    e.preventDefault()
    this.setState({
      showCalculateModal: false,
      selectedDay: this.props.currentDay,
      selectedAmount: undefined
    })
  }

  onContributeChange = selectedAmount => {
    this.setState({ selectedAmount })
  }

  onSelectChange = selectedDay => {
    this.setState({ selectedDay })
  }

  render() {
    const { timestampStartTokenSale } = this.props
    const secondsUntilNextPeriod = getSecondsUntilNextPeriod(
      timestampStartTokenSale
    )
    return (
      <AppInfoContext.Consumer>
        {props => (
          <div>
            <ContributeModal
              visible={this.state.showContributeModal}
              handleCancel={this.handleContributeCancel}
              handleConfirm={this.handleContributeConfirm}
              onSelectChange={this.onSelectChange}
              onContributeChange={this.onContributeChange}
              currentDay={props.currentDay}
              selectedDay={this.state.selectedDay}
              contribution={this.state.selectedAmount}
              isLoggedIn={props.isLoggedIn}
            />
            <CalculateModal
              visible={this.state.showCalculateModal}
              handleCancel={this.handleCalculateCancel}
              handleConfirm={this.handleContributeConfirm}
              onSelectChange={this.onSelectChange}
              onContributeChange={this.onContributeChange}
              currentDay={props.currentDay}
              selectedDay={this.state.selectedDay}
              contributions={props.contributions}
              ethPrice={props.ethPrice}
              contribution={this.state.selectedAmount}
              isLoggedIn={props.isLoggedIn}
            />
            <Layout>
              <div className="LandingPage">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div className="headerWrapper">
                  <div className="mainContainer">
                    <Header isDark={false} />
                    <DashboardPageHeader />
                    <TokensaleGrid
                      onShowContributeModal={() =>
                        this.showContributeModal(props.currentDay)
                      }
                      onShowCalculateModal={this.showCalculateModal}
                      currentPeriod={props.currentDay}
                      secondsToGo={secondsUntilNextPeriod}
                      daysOwed={props.daysOwed}
                      totalOwed={props.totalOwed}
                      batchWithdrawal={props.batchWithdrawal}
                      effectivePrice={props.effectivePrice}
                      userName={props.user.userName}
                      balance={props.user.balance}
                      isLoggedIn={props.isLoggedIn}
                      enabled={props.enabled}
                    />
                  </div>
                </div>

                <PhaseTable
                  onShowContributeModal={this.showContributeModal}
                  data={props.contributions}
                  currentPage={this.state.currentPage}
                  timestampStartTokenSale={props.timestampStartTokenSale}
                  withdraw={props.withdraw}
                  ethPrice={props.ethPrice}
                />
                <Pagination
                  onChange={currentPage =>
                    this.setState({ currentPage: currentPage - 1 })
                  }
                  total={365}
                  current={this.state.currentPage + 1}
                  pageSize={25}
                  defaultCurrent={1}
                />
                <Notifications
                  data={props.notifications}
                  removeNotification={props.removeNotification}
                />
                <MyBitFooter />
              </div>
            </Layout>
          </div>
        )}
      </AppInfoContext.Consumer>
    )
  }
}

export default Dashboard
