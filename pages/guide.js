import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import stylesheetGuide from '../styles/guide.scss'
import { default as Layout } from '../components/layout/layout'
import FooterSimplified from '../components/footerSimplified'
import HowTo from '../components/howTo'
import Logo from '../static/svgs/icons/mybit-full-white.svg'

class Guide extends Component {
  render() {
    return (
      <Layout>
        <div className="LandingPage">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          <style dangerouslySetInnerHTML={{ __html: stylesheetGuide }} />
          <div className="headerWrapper">
            <div className="mainContainer">
              <Logo className="headerWrapper__logo" />
            </div>
          </div>
          <HowTo />
          <FooterSimplified />
        </div>
      </Layout>
    )
  }
}

export default Guide
