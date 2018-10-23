import LocaleIcon from '../static/assets/locale.png'
import { Icon, Menu } from 'antd';
import {Link} from './link';
import classNames from 'classnames'
import stylesheet from './locale.scss'

export const Locale = ({onLocaleChanged, langMenu, lang}) => {
    const languages = Object.keys(langMenu).map((option) => {
      return(
        <Menu.Item key={option} onClick={onLocaleChanged}>
          <div>{langMenu[option].name}</div>
        </Menu.Item>
      )
    })
    const localeIcon = <div>
        <img src={LocaleIcon} className={classNames({'Locale__icon':true})}/>
    </div>;

    const icon = <div className={
          classNames({
            'DropdownCustom__icon': true
          })
        }>
       <Icon type="down" theme="outlined"/>
    </div>;


    return(
     <div className={
      classNames({
        'DropdownCustom': true
      })
      }>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <div className={
              classNames({
                'DropdownCustom__item': true,
                'Locale__item': true
              })
            } >
        {localeIcon}
        <button className={
              classNames({
                'DropdownCustom__btn': true,
                'Locale__btn': true
              })
            }>{lang}</button>
        {icon}
      </div>
      <div className={
              classNames({
                'DropdownCustom__content Locale__content': true
              })
            }>
        <Menu>
        {languages}
        </Menu>
      </div>
    </div>
    )
  }
