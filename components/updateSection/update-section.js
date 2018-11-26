import React from 'react';
import PropTypes from 'prop-types';
import { InputForm } from '../inputForm/input-form';
import { signUpForUpdatesData } from '../constants'
import stylesheet from './update-section.scss';

export const UpdateSection = ({header, subheader}) => {
    return(
      <div className="UpdateSection">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="UpdateSection__content">
            <div className="UpdateSection__picture-container">
              <img src="/static/svgs/background/overlay.svg" className="UpdateSection__picture"/>
            </div>
            <div className="UpdateSection__container">
                <div className="UpdateSection__header">
                  {signUpForUpdatesData.title}
                </div>
                <div className="UpdateSection__subheader">
                  {signUpForUpdatesData.subtitle}
                </div>
                <div className="UpdateSection__input-form">
                  <InputForm title="Sign Up" placeholder="Your email address"/>
                </div>

            </div>
        </div>
      </div>
    )
}


InputForm.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string
}

InputForm.defaultProps = {
  header: "",
  subheader: ""
}
