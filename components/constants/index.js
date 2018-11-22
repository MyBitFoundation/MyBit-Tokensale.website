import { links } from './links'

export const ETHEREUM_TICKER_COINMARKETCAP = 1027;

export const debug = (message) => console.log(message);

export const tokensPerDay = 100000;

export const dayInSeconds = 86400;

export const tokenSaleEvents = {
  fund: '0xd498819977fb9763f29bab6e4eee516c4cf59053922eb6a9fe59370a7bc28b3d',
  claim: '0x33a4ae6c0627280fcb7aaf7e07deb59bbce49aa4808ee5457f8622f77ab5d28c',
};

export const getSecondsUntilNextPeriod = (timestampStartTokenSale) => {
  const currentDay = ((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / dayInSeconds) + 1;
  const past = currentDay % 1;
  const secondsUntilNextPeriod = ((1 - past) * dayInSeconds).toFixed(0);

  return secondsUntilNextPeriod;
}


export const shortenAddress = (address, leftSide=15, rightSide=8) => {
  const size = address.length;
  let splitAddress = [address.slice(0, leftSide), address.slice(size - rightSide, size)]
  return splitAddress[0] + "..." + splitAddress[1];
}

export const getContentForNotification = (type, amount, period, actionType) => {
  if(actionType == 'claim'){
    switch (type) {
      case 'success':
        return {
          title: `#${period} - Received ${amount} MYB successfully!`,
          message: 'Thank you for participating in the token sale.',
        }
        break;
      case 'info':
        return {
          title: `#${period} - Processing your withdrawal`,
          message: 'This action can take several minutes. This message will update as soon as the transaction is processed.',
        }
        break;
      case 'error':
        return {
          title: `#${period} - Failed to withdraw`,
          message: 'Unfortunately your transaction failed.',
        }
        break;
    }
  }
  else {
    switch (type) {
      case 'success':
        return {
          title: `#${period} - Contributed with ${amount} ETH successfully!`,
          message: 'You will be able to claim your MYB tokens as soon as the current period is over.',
        }
        break;
      case 'info':
        return {
          title: `#${period} - Processing your contribution of ${amount} ETH`,
          message: 'This action can take several minutes. This message will update as soon as the transaction is processed.',
        }
        break;
      case 'error':
        return {
          title: `#${period} - Failed to contribute with ${amount} ETH`,
          message: 'Unfortunately your transaction failed.',
        }
        break;
    }
  }
}

export const countdownInfo = {
  finalDate: new Date("Jul 30 2019 12:00:00 GMT-0"),
  title: 'Index page with phase information (bday example)',
  parts: {day:'Days', hour: 'Hours', minut: 'Minutes', second: 'Seconds'}
}

export const myBitAppsHighlights = {
title: 'Applications Powered by MyBit',
description: 'MyBit’s applications offer a new way of owning and distributing wealth. Our applications include everything from investment platforms to payrolls, wills, trusts, and much more. They’re secure, efficient and cost-effective, letting users avoid middlemen and third party fees.',
button: {text: 'View More', url: links.applications},
applications:[{
  id: 1,
  name: 'myBitGo',
  imageUrl: '/static/svgs/my-bit-apps/my-bit-go.svg',
  button: {text: 'Try Now', url: links.mybitGo},
  content:'IoT investment platform '
},
{
  id: 10,
  name: 'myBitMobileIOs',
  imageUrl: '/static/svgs/my-bit-apps/my-bit-mobile.svg',
  button: {text: 'Try Now', url: links.iosMobileWallet},
  content:'iOS mobile wallet'
},
{
  id: 2,
  name: 'myBitMobileAndroid',
  imageUrl: '/static/svgs/my-bit-apps/my-bit-mobile.svg',
  button: {text: 'Try Now', url: links.androidMobileWallet},
  content:'Android mobile wallet'
},
{
  id: 3,
  name: 'myBitTrust',
  imageUrl: '/static/svgs/my-bit-apps/trust.svg',
  button: {text: 'Try Now', url: links.mybitTrust},
  content:'Trust fund for distributing Blockchain assets'
},
{
  id: 4,
  name: 'myBitWill',
  imageUrl: '/static/svgs/my-bit-apps/will.svg',
  button: {text: 'Coming Soon', url: links.mybitWill, type: 'bordered', disabled:true},
  content:'Blockchain-based wills for distributing assets'
},
{
  id: 5,
  name: 'myBitOptions',
  imageUrl: '/static/svgs/my-bit-apps/options.svg',
  button: {text: 'Coming Soon', url: links.mybitOptions, type: 'bordered', disabled:true},
  content:'Automating company token and stock option distributions'
},
{
  id: 6,
  name: 'myBitFork',
  imageUrl: '/static/svgs/my-bit-apps/fork.svg',
  button: {text: 'Coming Soon', url: links.fork, type: 'bordered', disabled:true},
  content: 'Decentralised bill-splitting'
},
{
  id: 7,
  name: 'myBitDropzone',
  imageUrl: '/static/svgs/my-bit-apps/drop-zone.svg',
  button: {text: 'Coming Soon', url: links.dropzone, type: 'bordered', disabled:true},
  content:'Simple and efficient crypto airdrops'
},
{
  id: 8,
  name: 'myBitMydax',
  imageUrl: '/static/svgs/my-bit-apps/mydax.svg',
  button: {text: 'Coming Soon', url: links.mydax, type: 'bordered', disabled:true},
  content:'Decentralised IoT asset exchange'
},
{
  id: 9,
  name: 'myBitPayroll',
  displayPage: 'aplications',
  imageUrl: '/static/svgs/my-bit-apps/payroll-01.svg',
  button: {text: 'Coming Soon', url: links.mybitPayroll, type: 'bordered', disabled:true},
  content: 'Smart contract-based payroll automation'
},
{
  id: 11,
  name: 'myBitCheque',
  displayPage: 'aplications',
  imageUrl: '/static/svgs/my-bit-apps/cheque.svg',
  button: {text: 'Coming Soon', url: '#', type: 'bordered', disabled:true},
  content:'Request payments in cryptocurrency'
},
{
  id: 12,
  name: 'myBitSavings',
  displayPage: 'aplications',
  imageUrl: '/static/svgs/my-bit-apps/my-bit-savings.svg',
  button: {text: 'Coming Soon', url: '#', type: 'bordered', disabled:true},
  content:'Automate saving money while you spend'
},
{
  id: 13,
  name: 'myBitBudget',
  displayPage: 'aplications',
  imageUrl: '/static/svgs/my-bit-apps/my-bit-budget.svg',
  button: {text: 'Coming Soon', url: '#', type: 'bordered', disabled:true},
  content:'Put limits on the amount you spend'
},
]
};

export const latestNews = [{
  imageSrc: '/static/assets/news-banner.png',
  title: 'Latest news',
  innerTitle: 'Data',
  content: '<p>Our Network succeeds with cutting edge technology and an amazing community</p>',
  link: 'https://medium.com/mybit-dapp',
  buttonLabel: 'Read more',
  newTab: true,
},{
  imageSrc: '/static/assets/event-graphic2.png',
  title: 'Upcoming events',
  innerTitle: 'Zug',
  content: '<p>April 1st, 2018 in Zug, Switzerland</p>',
  link: '/community#events',
  buttonLabel: 'Attend',
  newTab: false,
}]

export const formProps = {
  action: '//mybit.us15.list-manage.com/subscribe/post?u=af48b1fdb5278fd9884338f23&id=dbcac41639',
  messages: {
    inputPlaceholder: "Email",
    btnLabel: "Subscribe",
    sending: "Signing up...",
    success: "Thank you! We will update you about any MyBit developments",
    error: "Oops, please try again with other email"
  },
  styles: {
    sending: {
      fontSize: 18,
      color: "auto"
    },
    success: {
      fontSize: 18,
      color: "#3fd0ae"
    },
    error: {
      fontSize: 18,
      color: "red"
    }
  }
}

export const achievements = [{
    title: 'Q1 2017',
    description: 'Idea Conceived'
  }, {
    title: 'Q3 2017',
    description: 'Tokensale August 2017'
  }, {
    title: 'Q4 2017',
    description: 'First 3 partners November 2017'
  }, {
    title: 'Q1 2018',
    description: 'Opens office in Zug, Switzerland'
  }, {
    title: 'Q3 2018',
    description: 'MyBit DApp Inner Alpha'
  }, {
    title: 'Q3 2018',
    description: 'MYDAX Alpha Release'
  }, {
    title: 'Q4 2018',
    description: 'Beta Release'
}];

export const joinCommunityData = {
  title: 'Join the Community',
  subheader: 'get involved and get rewarded',
  url: links.telegram
}

export const signUpForUpdatesData = {
  title: 'Sign up for Updates',
  subtitle: 'and be the first to get the news',
}

export const testAlphaUrl = 'https://alpha.mybit.io/';

export const youtubeVideoId = "SGFGfpKn1dg";

export const exchanges = [{
  imageSrc: '/static/exchanges/bancor.png',
  url: 'https://www.bancor.network/communities/5b16460462bc740001afa01e/currency'
}, {
  imageSrc: '/static/exchanges/latoken.png',
  url: 'https://wallet.latoken.com/market/Crypto/ETH/MYB-ETH'
}, {
  imageSrc: '/static/exchanges/forkdelta.png',
  url: 'https://forkdelta.github.io/#!/trade/MYB-ETH'
}, {
  imageSrc: '/static/exchanges/idex.png',
  url: 'https://idex.market/eth/myb',
  className: "AccessLayer__exchanges-logos--is-idex"
}, {
  imageSrc: '/static/exchanges/ethland.png',
  url: 'https://app.ethlend.io/',
  className: "AccessLayer__exchanges-logos--is-ethland"
}]

export const wallets = [{
    title: 'Android',
    status: 'in development',
    iconClassName: 'android'
  }, {
    title: 'iOS',
    status: 'in development',
    iconClassName: 'ios'
  }, {
    title: 'Mac',
    status: 'in development',
    iconClassName: 'mac'
  }, {
    title: 'Windows',
    status: 'in development',
    iconClassName: 'windows'
  }, {
    title: 'MyEtherWallet',
    status: '<a href="https://www.myetherwallet.com/" target="_blank" rel="noopener noreferrer">Link</a>',
    iconClassName: 'myetherwallet'
  }];

  export const media = [{
    title: 'MyBit Mobile DApp',
    content: '<p>The MyBit Decentralised Application (DApp) is the backbone of the MyBit Network. It enables anyone to invest directly in IoT assets. All at a fraction of the cost of traditional platforms and investment funds. The MyBit DApp is the future of investing.</p>',
  }, {
    title: 'IoT Asset Tracker',
    content: '<p>View all of your MyBit Asset Investments in one place. It’s essentially the blockfolio for IoT assets on the MyBit Platform!</p>'
  }];

  export const highlights = [
    {
      title: 'About Us',
      content: `
  <p><b>MyBit is an IoT investment Network powered by Ethereum</b>. Founded in Switzerland by industry veterans, MyBit believes that people should be able to follow their passion instead of having to work to survive.</p>
  <p>By redefining the way people generate income, MyBit strives to democratise financial services so everyone has equal access to investment opportunities. This becomes critical when the future machine economy automates 800 million jobs by 2030 (Mckinsey, 2017) and the average person, whose job is automated, has no ability to participate in this new economy.</p>
  <p>MyBit provides an Network for the upcoming Trillion dollar IoT industry (Forbes, 2017), with the belief that everyone should have an equal opportunity to participate in this revolution.</p>`
    }, {
      title: 'Our core conviction',
      content: `
  <p>Although we all come from different countries, cultures and (professional) backgrounds there is one thing that connects us. We all share a common vision; to improve the life of everyone.</p>
  <p>While we see the vast potential of IoT and automation, we are aware that it will have major repercussions for the role humans play in the future economy. Instead of fighting this development we have chosen to embrace it.
  </p>
  <p>By utilising our shared resources we are building the first decentralised ecosystem that enables humans to play an active role in the economy of tomorrow.</p>
  <p>MyBit offers everyone to either invest or manage revenue generating machines over the blockchain, resulting in a new way to generate income in an automated world. MyBit lets the machines work for you again so you can enjoy the things that are truly important.</p>`
    }
  ];
