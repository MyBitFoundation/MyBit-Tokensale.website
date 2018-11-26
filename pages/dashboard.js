import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
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
import {
  getSecondsUntilNextPeriod,
  tokensPerDay,
  periodsPerPage
} from '../components/constants'

class Dashboard extends Component {
  static async getInitialProps({ req, query }) {
    if (req) {
      const response = await fetch(`http://localhost:8080/api/contributions`)
      const jsonResponse = await response.json()
      const { contributions, currentDay, ethPrice } = jsonResponse
      const totalEthContributed = contributions[currentDay - 1].total_eth
      const effectivePrice =
        totalEthContributed > 0
          ? (ethPrice * totalEthContributed) / tokensPerDay
          : 0

      return {
        ...jsonResponse,
        currentDayServer: currentDay,
        effectivePrice,
        query
      }
    }

    return {}
  }

  state = {
    showContributeModal: false,
    showCalculateModal: false,
    currentPage: undefined,
    selectedDay: this.props.currentDay,
    selectedAmount: undefined
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
    const {
      contributions,
      timestampStartTokenSale,
      currentDay,
      ethPrice,
      effectivePrice,
      currentDayServer,
      isLoggedIn,
      daysOwed,
      totalOwed,
      batchWithdrawal,
      user,
      enabled,
      withdraw,
      notifications,
      removeNotification,
      isMetamaskInstalled,
      extensionUrl,
      isBraveBrowser,
      network,
      batchWithdrawing,
      query
    } = this.props

    const secondsUntilNextPeriod = getSecondsUntilNextPeriod(
      timestampStartTokenSale
    )

    const { allowed } = query
    const warningMessageCountry = allowed === false && (
      <div className="CountryBanned">
        People located in the USA are not allowed to participate in the Token
        Distribution.
      </div>
    )

    // when using SSR set the page to whichever page inclues the current period
    let currentPage = Math.floor(currentDayServer / periodsPerPage) + 1
    // client takes control
    if (this.state.currentPage) {
      currentPage = this.state.currentPage
    }

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <ContributeModal
          visible={this.state.showContributeModal}
          handleCancel={this.handleContributeCancel}
          handleConfirm={this.handleContributeConfirm}
          onSelectChange={this.onSelectChange}
          onContributeChange={this.onContributeChange}
          currentDay={currentDay ? currentDay : currentDayServer}
          selectedDay={this.state.selectedDay}
          contribution={this.state.selectedAmount}
          isLoggedIn={isLoggedIn}
          isMetamaskInstalled={isMetamaskInstalled}
          network={network}
          enabled={enabled}
          allowed={allowed}
        />
        <CalculateModal
          visible={this.state.showCalculateModal}
          handleCancel={this.handleCalculateCancel}
          handleConfirm={this.handleContributeConfirm}
          onSelectChange={this.onSelectChange}
          onContributeChange={this.onContributeChange}
          currentDay={currentDay ? currentDay : currentDayServer}
          selectedDay={this.state.selectedDay}
          contributions={contributions}
          ethPrice={ethPrice}
          contribution={this.state.selectedAmount}
          isLoggedIn={isLoggedIn}
          isMetamaskInstalled={isMetamaskInstalled}
          network={network}
          enabled={enabled}
          allowed={allowed}
        />
        <Layout>
          <div className="LandingPage">
            {warningMessageCountry}
            <div className="headerWrapper">
              <div className="mainContainer">
                <Header isDark={false} />
                <DashboardPageHeader />
                <TokensaleGrid
                  onShowContributeModal={() =>
                    this.showContributeModal(
                      currentDay ? currentDay : currentDayServer
                    )
                  }
                  onShowCalculateModal={this.showCalculateModal}
                  currentPeriod={currentDay ? currentDay : currentDayServer}
                  secondsToGo={secondsUntilNextPeriod}
                  daysOwed={daysOwed}
                  totalOwed={totalOwed}
                  batchWithdrawal={batchWithdrawal}
                  effectivePrice={effectivePrice}
                  userName={user.userName}
                  balance={user.balance}
                  isLoggedIn={isLoggedIn}
                  enabled={enabled}
                  isMetamaskInstalled={isMetamaskInstalled}
                  extensionUrl={extensionUrl}
                  isBraveBrowser={isBraveBrowser}
                  network={network}
                  timestampStartTokenSale={timestampStartTokenSale}
                  batchWithdrawing={batchWithdrawing}
                  allowed={allowed}
                />
              </div>
            </div>

            <PhaseTable
              onShowContributeModal={this.showContributeModal}
              data={contributions}
              currentPage={currentPage - 1}
              timestampStartTokenSale={timestampStartTokenSale}
              withdraw={withdraw}
              ethPrice={ethPrice}
            />
            <Pagination
              onChange={currentPage =>
                this.setState({ currentPage: currentPage })
              }
              total={365}
              current={currentPage}
              pageSize={periodsPerPage}
              defaultCurrent={1}
            />
            <Notifications
              data={notifications}
              removeNotification={removeNotification}
            />
            <MyBitFooter />
          </div>
        </Layout>
      </div>
    )
  }
}

export default Dashboard
