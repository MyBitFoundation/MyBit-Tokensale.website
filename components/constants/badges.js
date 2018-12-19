import React from 'react';
import VotingBadge from '../../static/tokensale/voting_badge.svg';
import BrandBadge from '../../static/tokensale/iconic_badge.svg';

export const BADGES_DATA = [{
  title: 'Voting badge',
  description: <p>Limit to 1 per address. You get it by contributing to any period of the Token Distribution, any amount.</p>,
  img: () => <VotingBadge className="Badge__img"/>,
}, {
  title: 'Brand Lottery badge',
  description: (
    <p>We are hilding a lottery where 10 unique contributers will be selected at random to become co-owners of the MyBit brand.</p>
  ),
  img: () => <BrandBadge className="Badge__img"/>,
}];
