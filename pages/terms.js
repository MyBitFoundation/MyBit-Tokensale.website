import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { TermsBanner } from '../components/landingBanner/terms-banner'
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
              {<TermsBanner />}
            </div>
          </div>
          <div className="countdownWrapper">
            <h1
              style={{
                textAlign: 'center',
                backgroundColor: 'white',
                margin: '100px'
              }}
            >
              TERMS PAGE SOON
            </h1>
          </div>
          <MyBitFooter />
        </div>
      </Layout>
    )
  }
}

export default HomePage
