import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd';
import TelegramSvg from '../../static/svgs/social/telegram-1.svg'
import {joinCommunityData} from '../constants'
import stylesheet from './join-section.scss'

export const JoinSection = ({header, subheader}) => {
    return(
      <div className="JoinSection">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="JoinSection__content">
            <div className="JoinSection__picture-container">
              <img src="../../static/svgs/background/overlay.svg" className="JoinSection__picture" alt="background image"/>
            </div>
            <div className="JoinSection__container">
                <div className="JoinSection__header">
                  {joinCommunityData.title}
                </div>
                <Button type="primary" className="JoinSection__btn" target="_blank" href={joinCommunityData.url}>
                  <Icon component={TelegramSvg} className="JoinSection__icon" />
                    Telegram
                </Button>
            </div>
        </div>
      </div>
    )
}

JoinSection.propTypes = {
  header: PropTypes.string,
  subheader: PropTypes.string
}

JoinSection.defaultProps = {
  header: "",
  subheader: ""
}
