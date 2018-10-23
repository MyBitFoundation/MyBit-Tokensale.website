import React from 'react'
import App, { Container } from 'next/app'
import { I18n as I18nR, I18nextProvider } from 'react-i18next'
import initialI18nInstance from '../i18n'
import AppInfo from '../components/context/AppInfo'
import MainWrapper from '../components/mainWrapper'
import AppInfoContext from '../components/context/AppInfoContext'
import Head from '../components/head'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    const { i18n, initialI18nStore, initialLanguage } = pageProps || {}

    return (
      <Container>
        <I18nextProvider
          i18n={i18n || initialI18nInstance}
          initialI18nStore={initialI18nStore}
          initialLanguage={initialLanguage}
        >
          <React.Fragment>
            <Head />
            <AppInfo>
              <AppInfoContext.Consumer>
                {({ mobileMenu, handleClickMobileMenu }) => (
                  <MainWrapper mobileMenu={mobileMenu}>
                    <Component {...pageProps} />
                  </MainWrapper>
                )}
              </AppInfoContext.Consumer>
            </AppInfo>
          </React.Fragment>
        </I18nextProvider>
      </Container>
    )
  }
}
