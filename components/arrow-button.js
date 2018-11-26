import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import stylesheet from './arrow-button.scss'

export const ArrowButton = ({rotate, onClick, disabled, fullOpacity, isBig, type}) => (
  <button
    onClick={disabled ? () => {} : onClick}
    className={
        classNames({
          "ArrowButton": true,
          [type]: true,
          "ArrowButton--is-disabled": disabled,
          "ArrowButton--is-full-opacity": fullOpacity,
          "ArrowButton--is-big": isBig,
        })}
    style={{transform: rotate ? "rotate(180deg)" : "rotate(0deg)"}}
  >
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className={classNames({"ArrowButton__arrow": type === 'default'})}/>
  </button>
)

ArrowButton.defaultProps = {
  rotate: false,
  fullOpacity: false,
  disabled: false,
  isBig: false,
  type: 'default'
}


ArrowButton.propTypes = {
  rotate: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  fullOpacity: PropTypes.bool,
  isBig: PropTypes.bool,
  type: PropTypes.string
}
