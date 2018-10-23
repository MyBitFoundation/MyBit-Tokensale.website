import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import HamburgerButton from '../../static/svgs/icons/menu-icon.svg'
import { mobileMenu, headerMenu, headerMenuDropDown, headerMenuButton, headerMenuLanguage } from '../constants/menu'
import {Link} from '../link';
import stylesheet from './menu.scss'
import { Button } from '../button'
import { IconListMobileMenu } from '../icon'
import { DropdownCustom } from '../dropdown'
import { Locale } from '../locale'
import { withRouter } from 'next/router'
import { Icon, Menu as MenuAnt } from 'antd';

const SubMenu = MenuAnt.SubMenu;
const MenuItem = MenuAnt.Item;

class CustomMenu extends React.Component {
  constructor(props){
   super(props);
   this.state = {lang: headerMenuLanguage["en"].name, dropdownItem: null}
  }

  toggleMobileDropdown = (evt) => {
    const dropdownItem = this.state.dropdownItem !== evt.currentTarget.innerText ? evt.currentTarget.innerText : null;
    this.setState({dropdownItem})
  }

  handleLocaleChange = (evt) => {
    const lang = headerMenuLanguage[evt.key].name;
    this.setState({lang})
  }

  render(){
    const { lang } = this.state;
    const toRender = headerMenu.map((option) => {
      return(
        <Link
          key={option.path}
          path={option.path}
          isLight
          name={option.name}
          external={option.external}
          className={
            classNames({
              'Menu__item': true,
              'active': this.props.router.pathname.indexOf(option.name.toLocaleLowerCase()) !== -1
            })
          }
        />
      )
    })

    const toRenderDropdowns = headerMenuDropDown.map((option) => {
      return(
        <DropdownCustom
          key={option.name}
          name={option.name}
          list={option.list}
          className={
            classNames({
              'Menu__item': true
            })
          }
        />
      )
    })

    toRender.push(toRenderDropdowns);
    /*toRender.push(<Locale key='locale'
                          className={classNames({'Menu__item': true})}
                          langMenu={headerMenuLanguage}
                          lang={lang}
                          onLocaleChanged={this.handleLocaleChange}
                          />);*/
    toRender.push(<Button
      key='button'
      label={headerMenuButton.name}
      url={headerMenuButton.url}
      newTab={headerMenuButton.external}
      isSecondary
      isLight
      isLink
      isCentered
      isRounded
      className={
        classNames({
          'Menu__item': true,
          'Menu__btn': true
        })
      }
    />);

    const toRenderMobile = [];
    const menuToRender =
      (
        <Fragment key="mobileMenu">
           <MenuAnt
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            className="MobileMenu"
          >
            {mobileMenu.map((option => {
              if (option.dropdown) {
                const menuItems = option.menuItems.map(item => (
                  <MenuAnt.Item key={item.name}>
                    <a href={item.url} target={item.external ? '_blank' : ''} rel={item.external ? 'noopener noreferrer' : ''}>{item.name}</a>
                  </MenuAnt.Item>
                ))
                return(
                  <SubMenu key={option.name} title={<span><span>{option.name}</span><Icon className="MobileMenu__arrow" type="down" /></span>}>
                    {menuItems}
                  </SubMenu>
                )
              } else {
                return(
                  <MenuItem key={option.name}>
                    <a href={option.path.url} key={option.name} target={option.external ? '_blank' : ''} rel={option.external ? 'noopener noreferrer' : ''}>{option.name}</a>
                  </MenuItem>
                )
              }

            }))}
          </MenuAnt>
        </Fragment>
      )

    toRenderMobile.push(menuToRender);
    toRenderMobile.push(<IconListMobileMenu key='IconListMobileMenu'/>)

    return (
      <div
        className={
          classNames({
            'Menu': true,
            'Menu--is-video-open': this.props.videoOpen
          })
        }
      >
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        {toRender}
        <div
          className={
            classNames({
              'Menu__hamburger-button': true,
            })
          }
        >
          <a onClick={() => this.props.handleClick(true)}>
            <HamburgerButton />
          </a>
        </div>
        <div
          className={
            classNames({
              'SidebarMobile': true,
              'SidebarMobile--is-visible' : this.props.mobileMenu,
            })
          }
        >
          <a
            className={
              classNames({
                'SidebarMobile__overlay-btn-close': true,
                'SidebarMobile__overlay-btn-close--is-visible' : this.props.mobileMenu,
              })
            }
            onClick={() => this.props.handleClick(false)}
          >
            &times;
          </a>
          {toRenderMobile}
        </div>
      </div>
    )
  }
}

CustomMenu.propTypes = {
  setMobileMenuState: PropTypes.func,
}
export const Menu = withRouter(CustomMenu);

