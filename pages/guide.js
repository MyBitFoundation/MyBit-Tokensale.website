import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import stylesheetGuide from '../styles/guide.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'
import HowTo from '../components/howTo'

class Guide extends Component {
  render() {
    return (
      <Layout>
        <div className="LandingPage">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheetGuide }} />
          <div className="headerWrapper">
            <div className="mainContainer">
              <Header isDark={false} />
            </div>
          </div>
          <HowTo />
          <MyBitFooter />
        </div>
      </Layout>
    )
  }
}

export default Guide
