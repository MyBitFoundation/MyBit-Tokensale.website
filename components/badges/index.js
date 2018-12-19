import React from 'react';
import stylesheet from './badges.scss'

const Badges = ({ data }) => (
  <React.Fragment>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <section className="Badges">
      <p className="Badges__title">Contribution Badges</p>
      <p className="Badges__description">MyBit badges are used to increase engagement within our community and reward those who are active. <br/>
      We have massive plans for erc-721 badges in 2019, this is just the beginning.</p>
      <div className="Badges__container">
        {data.map(badge => (
          <div className="Badge">
            {badge.img()}
            <p className="Badge__title">{badge.title}</p>
            <p className="Badge__description">{badge.description}</p>
          </div>
        ))}
      </div>
      <p className="Badges__learn-more">Learn more about MyBit badges
        <a
          href="https://badges.mybit.io"
          target="_blank"
        >
          {' '}here
        </a>
      </p>
    </section>
  </React.Fragment>
)

export default Badges;
