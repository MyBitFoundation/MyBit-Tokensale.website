import { Menu, Icon } from 'antd';
import stylesheet from './dropdown.scss'
import Link from 'next/link';
import classNames from 'classnames'

export const DropdownCustom = ({name, list, mobile}) => {
  const dropDownContent = list.map((option) => {
    return(
        <Menu.Item key={option.name}>
        {
          option.external ?
          <a target="_blank" rel="noopener noreferrer" href={option.path}>{option.name}</a>
          :
          <Link href={option.path}>
            <a>{option.name}</a>
          </Link>
        }

        </Menu.Item>
    )
  });

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
        'DropdownCustom': true,
      })
    }>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <div className={
              classNames({
                'DropdownCustom__item': true
              })
            } >
        <button className={
              classNames({
                'DropdownCustom__btn': true
              })
            }>{name}</button>
        {icon}
      </div>
      <div className={
              classNames({
                'DropdownCustom__content': true
              })
            }>
        <Menu>
        {dropDownContent}
        </Menu>
      </div>
    </div>
  )
}
