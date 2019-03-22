import React, { Component, Fragment } from 'react'
import fetch from 'isomorphic-unfetch'
import stylesheet from '../styles/main.scss'
import stylesheetTerms from '../components/termsOfService/style.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import FooterSimplified from '../components/footerSimplified'
import PhaseTable from '../components/phaseTable/phase-table'
import DashboardPageHeader from '../components/dashboardPageHeader/dashboardPageHeader'
import TokensaleGrid from '../components/tokensaleGrid/tokensaleGrid'
import ContributeModal from '../components/contributeModal/contributeModal'
import CalculateModal from '../components/calculateModal/calculateModal'
import AppInfoContext from '../components/context/AppInfoContext'
import { Pagination, Alert } from 'antd'
import Notifications from '../components/notifications'
import TermsOfService from '../components/termsOfService'

import {
  getSecondsUntilNextPeriod,
  tokensPerDay,
  periodsPerPage,
  debug,
  isDecimal,
  MyBitTokenSaleAPIEndpoint
} from '../components/constants'

import {
  getUserAcceptedTermsOfService,
  setUserAcceptedTermsOfService
} from '../utils'

class Dashboard extends Component {
  static async getInitialProps({ req, query }) {
    if (req) {
      const response = await fetch(
        `${MyBitTokenSaleAPIEndpoint}/token-sale/contributions`
      )
      const jsonResponse = await response.json()
      const {
        contributions,
        currentDay,
        ethPrice,
        loaded,
        currentPeriodTotal
      } = jsonResponse
      if (loaded) {
        let totalEthContributed, effectivePrice

        if (currentDay) {
          totalEthContributed = contributions[currentDay - 1].total_eth
          effectivePrice =
            totalEthContributed > 0
              ? (ethPrice * totalEthContributed) / tokensPerDay
              : 0
        }

        return {
          ...jsonResponse,
          currentDayServer: currentDay,
          effectivePrice,
          query,
          currentPeriodTotal
        }
      }
    }

    return {}
  }

  state = {
    showContributeModal: false,
    showCalculateModal: false,
    currentPage: undefined,
    selectedDay: this.props.currentDay || this.props.currentDayServer || 1,
    selectedAmount: undefined,
    acceptedTermsOfService: getUserAcceptedTermsOfService(),
    termsOfService: false
  }

  /* CONTRIBUTE MODAL FUNCTIONS */
  showContributeModal = selectedDay => {
    if (!this.state.acceptedTermsOfService) {
      this.setState({
        termsOfService: true
      })
      this.handleConfirmTerms = () => {
        this.setState({
          showContributeModal: true,
          termsOfService: false,
          acceptedTermsOfService: true,
          selectedDay
        })
      }
    } else {
      this.setState({
        showContributeModal: true,
        selectedDay
      })
    }
  }

  handleContributeConfirm = e => {
    if (this.clicked) {
      return
    }
    this.clicked = true
    console.log(this.state.selectedAmount)
    setTimeout(() => (this.clicked = false), 1000)
    this.props.fund(this.state.selectedAmount, this.state.selectedDay)
    this.setState({
      showContributeModal: false,
      selectedAmount: undefined,
      showCalculateModal: undefined
    })
  }

  handlePopupCancel = e => {
    e.preventDefault()
    this.setState({
      showContributeModal: false,
      selectedDay: this.props.currentDay,
      selectedAmount: undefined,
      showCalculateModal: false
    })
  }

  onContributeChange = e => {
    const selectedAmount = e.target.value
    // don't update the state if its not a valid number
    if (!isDecimal(selectedAmount)) {
      return
    }
    this.setState({ selectedAmount })
  }

  /* CALCULATE MODAL FUNCTIONS */
  showCalculateModal = e => {
    e.preventDefault()
    if (!this.state.acceptedTermsOfService) {
      this.setState({
        termsOfService: true
      })
      this.handleConfirmTerms = () => {
        this.setState({
          showCalculateModal: true,
          termsOfService: false,
          acceptedTermsOfService: true
        })
      }
    } else {
      this.setState({
        showCalculateModal: true
      })
    }
  }

  onSelectChange = selectedDay => {
    this.setState({ selectedDay })
  }

  handleTermsOfServiceCancel = () => {
    this.setState({
      termsOfService: false
    })
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
      query,
      currentPeriodTotal,
      exchangeRate
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
    let currentPage = currentDayServer
      ? Math.floor(currentDayServer / periodsPerPage) + 1
      : 1
    // client takes control
    if (this.state.currentPage) {
      currentPage = this.state.currentPage
    }

    return (
      <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <style dangerouslySetInnerHTML={{ __html: stylesheetTerms }} />
        <TermsOfService
          visible={this.state.termsOfService}
          onCancel={this.handleTermsOfServiceCancel}
          handleConfirm={this.handleConfirmTerms}
        />
        <ContributeModal
          visible={this.state.showContributeModal}
          handleCancel={this.handlePopupCancel}
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
          handleCancel={this.handlePopupCancel}
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
                <DashboardPageHeader />
                <TokensaleGrid
                  onShowContributeModal={() =>
                    this.showContributeModal(
                      currentDay || currentDayServer || 1
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
                  currentPeriodTotal={currentPeriodTotal}
                  exchangeRate={exchangeRate}
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
              allowed={allowed}
              network={network}
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
            <FooterSimplified />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

export default Dashboard
