import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import classNames from 'classnames'
import Logo from '../../static/svgs/icons/mybit-full-white.svg'
import {Menu} from '../menu/menu'
import stylesheet from './header.scss'
import AppInfoContext from '../context/AppInfoContext';

export const Header = ({isDark}) => {
  return (
    <div id="top">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <header
        className={
          classNames({
            'Header': true,
            'Header--is-dark': isDark
          })
        }
      >
        <div className={
                  classNames({
                    'Header__header-content': true
                  })
                }>
          <div  className={
                  classNames({
                    'Header__logo-container': true
                  })
                }>
            <a href="/">
              <Logo
                className={
                  classNames({
                    'Header__logo': true,
                  })
                }
              />
            </a>
          </div>
        <AppInfoContext.Consumer>
          {({
            mobileMenu,
            handleClickMobileMenu
          }) => (
            <Menu
              mobileMenu={mobileMenu}
              handleClick={handleClickMobileMenu}
            />
          )}
        </AppInfoContext.Consumer>
        </div>
      </header>
    </div>
  )
};

Header.propTypes = {
  setMobileMenuState: PropTypes.func,
}

Header.defaultProps = {
  isDark: true
}
