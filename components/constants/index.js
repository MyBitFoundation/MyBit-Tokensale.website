import { links } from './links'

export const countdownInfo = {
  finalDate: new Date("Jul 30 2019 12:00:00 GMT-0"),
  title: 'Index page with phase information (bday example)',
  parts: {day:'Days', hour: 'Hours', minut: 'Minutes', second: 'Seconds'}
}

export const teamDesc = [
  {
    name: 'Ian Worrall',
    job: 'Founder',
    bio:
      'A veteran to the bitcoin industry who began as a miner and trader in 2013. Soon after moved into blockchain applications to fund MyBit in Switzerland.',
    linkedin: 'https://www.linkedin.com/in/ian-m-worrall-1b599a59/',
    imageSrc: '/static/team/v2/ian.jpg',
    imageAlt: 'Founder',
  },{
    name: 'Jose Aguinaga',
    job: 'CTO',
    bio: 'A web engineer with over 8+ years of experience in javascript related technologies, fintech development, and software engineering.',
    linkedin: 'https://www.linkedin.com/in/jjperezaguinaga/',
    imageSrc: '/static/team/v2/jose.jpg',
    imageAlt: 'CTO',
  },{
    name: 'James Halladay',
    job: 'Creative Consultant',
    bio:
      'Creative consultant and Cambridge graduate with experience at some of the UK’s biggest advertising agencies.',
    linkedin: 'https://www.linkedin.com/in/jameshalladay/',
    imageSrc: '/static/team/v2/james.jpg',
    imageAlt: 'Creative Consultant',
  },{
    name: 'Ash Halladay',
    job: 'Creative Lead',
    bio:
      'Brings 8 years creative experience working on brand development, digital design and creative consultancy.',
    linkedin: 'https://www.linkedin.com/in/ashleyhalladay/',
    imageSrc: '/static/team/v2/ash.jpg',
    imageAlt: 'Creative Lead',
  },{
    name: 'Kyle Dewhurst',
    job: 'Lead Solidity Developer',
    bio:
     'A blockchain engineer with experience developing Ethereum dApps for a range of projects since early 2016. He’s been passionate about the potential of blockchain ever since.',
    linkedin: '',
    imageSrc: '/static/team/v2/kyle.jpg',
    imageAlt: 'Lead Solidity Developer',
  },{
    name: 'Peter Phillips',
    job: 'Solidity Developer',
    bio:
      'A developer with five years of experience in data engineering, data visualisation and web app development, who now specialises in Solidity. He was also an early miner of Bitcoin and Ethereum.',
    linkedin: '',
    imageSrc: '/static/team/v2/Peter_Phillips.jpg',
    imageAlt: 'Solidity Developer',
  },{
    name: 'Cristiano Martins',
    job: 'Lead Front End Developer',
    bio:
      'A front end developer and Computer Science graduate with experience from multiple blockchain projects. He now specialises in React while still figuring out how he found his way in.',
    linkedin: '',
    imageSrc: '/static/team/v2/cris.jpg',
    imageAlt: 'Lead Front End Developer',
  },{
    name: 'Branislav Djuric',
    job: 'Full Stack Engineer',
    bio:
      'An experienced software developer and architect who has worked for numerous international tech brands across Belgrade, Zurich, Amsterdam and Berlin.',
    linkedin: '',
    imageSrc: '/static/team/v2/bran.jpg',
    imageAlt: 'Full Stack Engineer',
  },{
    name: 'Hua Li',
    job: 'Chinese Community Manager',
    bio:
      'A community manager who first saw the potential of blockchain in 2013. Since then, he’s been translating for a range of projects as well as following his passion: community management.',
    linkedin: '',
    imageSrc: '/static/team/v2/Hua_Li.jpg',
    imageAlt: 'Chinese Community Manager',
  },{
    name: 'Ivan Ivanov',
    job: 'Front End Engineer',
    bio:
      'A React developer with over three years of professional, front end experience. He’s previously led various web development projects and is now applying his skills to MyBit’s UI.',
    linkedin: '',
    imageSrc: '/static/team/v2/Ivan_Ivanov.jpg',
    imageAlt: 'Front End Engineer',
  },{
    name: 'Attila Ameer',
    job: 'UX Consultant',
    bio:
      'A UX designer who has extensive experience working on user journeys and interfaces for a wide range of financial products.',
    linkedin: '',
    imageSrc: '/static/team/v2/Amer_Attila.jpg',
    imageAlt: 'UX Consultant',
  },{
    name: 'Chris Wyatt',
    job: 'Marketing',
    bio:
      'An experienced digital marketing consultant and agency founder with a track record in international financial advisory.',
    linkedin: '',
    imageSrc: '/static/team/v2/Chris_Wyatt.jpg',
    imageAlt: 'Marketing',
  },{
    name: 'Dan Engler',
    job: 'North American Community Manager',
    bio:
      'An IT security professional, avid crypto enthusiast and all around hustler who helps keep order on the MyBit\'s Telegram channel',
    linkedin: '',
    imageSrc: '/static/team/v2/Dan_Engler.jpg',
    imageAlt: 'North American Community Manager',
  },{
    name: 'Rory Davies',
    job: 'Asia Pacific Community Manager',
    bio:
      'A community manager who’s inspired by the power of blockchain to change business and economics. An active member of the MyBit community, he’s now keeping our Telegram in check.',
    linkedin: '',
    imageSrc: '/static/team/v2/Rory_Davies.jpg',
    imageAlt: 'Asia Pacific Community Manager',
  },{
    name: 'Dayan Petrov',
    job: 'Front End Engineer',
    bio:
      'A front end engineer with over two years of software development experience. A recent graduate of Sheffield University, where he received a Google scholarship, he’s now applying his expertise to the MyBit UI.',
    linkedin: '',
    imageSrc: '/static/team/v2/placeholder.png',
    imageAlt: 'Front End Engineer',
  },{
    name: 'Valeriy Tverdohleb',
    job: 'Front End Engineer',
    bio:
      'A front end engineer with eleven years of experience developing a range of web software solutions. His specialisms include JavaScript libraries and tooling, especially React and Webpack.',
    linkedin: '',
    imageSrc: '/static/team/v2/placeholder.png',
    imageAlt: 'Front End Engineer',
  }
]

export const teamsData = {
  title: 'Empowering Disruptive Teams',
  button: {text: 'Learn More', url: links.fund},
  image: '../../static/svgs/mybit_ventures.svg',
  content: `Whether you want to build a project from scratch, contribute to an existing project,
  or hunt for bugs, MyBit Ventures is here to support everyone who’s serious about our
  Network and the broader Ethereum community.`,
}

export const eventsData = {
  title: 'Upcoming Events',
  button: {text: 'Find an Event', url: links.events, external: true},
  imageUrl: '/static/assets/event-graphic2.png'
}

export const newsData = {
  title: 'Latest News',
  button: {text: 'Read More', url: links.medium, external: true},
  imageUrl: '/static/assets/TokenDistribution.png'
}

export const developersData = {
  title: 'Developers',
  button: {text: 'Get Started', url: links.devs, external: true},
  image: {url: null, alt: 'Code image' },
  content: `We believe in making development effective, efficient and fun. This is why we have designed the MyBit Software Development Kit (SDK) to streamline development. It enables engineers to quickly get concepts off the ground and focus on building the future.`,
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
