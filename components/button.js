import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import stylesheet from './button.scss'

export const Button = ({ disabled, label, onClick, isLight, isSecondary, isLink, isRounded, url, newTab, isCentered, className, isDark }) => {
  const ButtonClass = classNames({
    'Button': true,
    'Button--is-light': isLight,
    'Button--is-dark': isDark,
    'Button--is-secondary': isSecondary,
    'Button--is-disabled': disabled,
    'Button--is-rounded': isRounded
  })

  const LinkClass = classNames({
    'Button__wrapper': true,
    'Button__wrapper--is-centered': isCentered,
    [className]: true,
  })

  let button =       
    (
      <div>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <button disabled={disabled} onClick={onClick} className={ButtonClass}>
          <span>{label}</span>
        </button>
      </div>
    )

  if(isLink){
    button =
      (
        <a 
          className={className ? className : LinkClass}
          href={disabled ? undefined : url} 
          target={newTab ? "_blank" : undefined} 
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {button}
        </a>
      )
  }

  return button;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isLight: PropTypes.bool,
  isSecondary: PropTypes.bool,
  isLink: PropTypes.bool,
  isRounded: PropTypes.bool,
  url: PropTypes.string,
  newTab: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  isLight: false,
  isSecondary: false,
  isDark: false,
  isLink: true,
  isRounded: true,
  url: "",
  newTab: false,
  className: "",
}
