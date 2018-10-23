import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { LandingBanner } from '../components/landingBanner/landing-banner'
import { Countdown } from '../components/Countdown/countdown'
import { MyBitFooter } from '../components/footer/footer'

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div className="LandingPage">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <div className="headerWrapper">
            <div className="mainContainer">
              <Header isDark={false} />
              {<LandingBanner />}
            </div>
          </div>
          <div className="countdownWrapper">
            <Countdown />
          </div>
          <MyBitFooter />
        </div>
      </Layout>
    )
  }
}

export default HomePage
