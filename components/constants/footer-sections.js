import { links } from './links';
import TelegramIcon  from '../../static/svgs/social/telegram-1.svg';
import MediumIcon  from '../../static/svgs/social/medium.svg';
import FacebookIcon  from '../../static/svgs/social/facebook-white.svg';
import RedditIcon  from '../../static/svgs/social/reddit-white.svg';
import TwitterIcon  from '../../static/svgs/social/twitter-white.svg';

export const footerSections = [
  {
    title: 'Products',
    className: 'products',
    isContentNode: true,
    links:[{
        title: 'SDKs',
        url: links.devs,
        newTab: true,
      }, {
        title: 'MyBit Go',
        // inactive: true,
        url: links.mybitGo,
        newTab: true,
      }, {
        title: 'Other dApps',
        // inactive: true,
        url: links.applications,
        newTab: false,
      }
    ]
  },
  {
    title: 'Resources',
    className: 'resources',
    isContentNode: true,
    links: [
      {
        title: 'Token Distribution',
        url: links.tokenSale,
        newTab: true,
      },
      {
        title: 'Whitepaper',
        url: links.whitepaper,
        newTab: true,
      },
      {
        title: 'Github',
        url: links.github,
        newTab: true,
      },
    ]
  },
  {
    title: 'About',
    isContentNode: true,
    className: 'about',
    links: [
      {
        title: 'Company',
        url: links.aboutPage,
        newTab: true,
      },
      {
        title: 'Token',
        url: links.token,
        newTab: true,
      },
      {
        title: 'Blog',
        url: links.medium,
        newTab: true,
      }]
  },
  {
    title: 'Social Media',
    className: 'socialMedia',
    isContentNode: true,
    links: [
    {
      title: 'Telegram',
      url: links.telegram,
      newTab: true,
    },
    {
      title: 'Medium',
      url: links.medium,
      newTab: true,
    },
    {
     title: 'Facebook',
     url: links.facebook,
     newTab: true,
    },
    {
      title: 'Reddit',
      url: links.reddit,
      newTab: true,
    },
    {
      title: 'Twitter',
      url: links.twitter,
        newTab: true,
    }]
  }
];

export const socialsList = [
  { id: 1, name: 'telegram', url: links.telegram},
  { id: 2, name: 'medium', url: links.medium},
  { id: 3, name: 'facebook',  url: links.facebook},
  { id: 4, name: 'reddit', url: links.reddit},
  { id: 5, name: 'twitter', url: links.twitter},
]

export const socialsIcons = {
  telegram: <TelegramIcon />,
  medium: <MediumIcon />,
  facebook: <FacebookIcon />,
  reddit: <RedditIcon />,
  twitter: <TwitterIcon />
}
