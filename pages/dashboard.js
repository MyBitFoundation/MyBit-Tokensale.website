import React, { Component } from 'react'
import stylesheet from '../styles/main.scss'
import { default as Layout } from '../components/layout/layout'
import { Header } from '../components/header/header'
import { MyBitFooter } from '../components/footer/footer'

class Fund extends Component {
  render() {
    return (
      <Layout>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="headerWrapper">
          <div className="mainContainer">
            <Header isDark={false} />
          </div>
        </div>
        <div className="mainContainer">
          <h1 style={{ textAlign: 'center', margin: '100px' }}>
            DASHBOARD PAGE SOON
          </h1>
          <a href="/">Index</a>
          <a href="/terms">Terms</a>
          <a href="/dashboard">Dashboard</a>
        </div>
        <MyBitFooter />
      </Layout>
    )
  }
}

export default Fund
