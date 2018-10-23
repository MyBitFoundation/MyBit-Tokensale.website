import React, { Fragment } from 'react'

//import 'gridlex/src/gridlex.scss';

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'


import { Header } from '../components/header/header';
import { Statement, LandingPageStatements } from '../components/statement';
import { ResponsiveWrapper } from '../components/responsive-wrapper';

import * as StatementData from '../components/constants/statement';
import * as EventsData from '../components/constants/roadmap';

import TeamMembers from '../components/teamSection/team-members';
import Achievements from '../components/achievements';
import { Highlights, Highlight } from '../components/highlights';
import { Bit } from '../components/bit';
import { VideoPlayer } from '../components/video-player';
import { Wallets, Wallet } from '../components/wallets';
import { Button } from '../components/button';
import { Icon, IconList, PartnersList, MediaList } from '../components/icon';
import { Media, Medium } from '../components/media';
import { MediaCTA } from '../components/media-cta';
import { achievements, highlights, wallets, media } from '../components/constants';
import { diamondHighlights, mediaHighlights } from '../components/constants/button-components';
import { resourcesDropDown, aboutDropDown } from '../components/constants/menu'
import { HeroParagraph } from '../components/hero-paragraph';
import { MainTitle } from '../components/main-title';
import { BackgroundVideo } from '../components/background-video';
import { HeroBanner } from '../components/hero-banner';
import { Link } from '../components/link';
import { Menu } from '../components/menu';
import { Container } from '../components/layout/container';
import { MyBitFooter } from '../components/footer/footer';
import { Subscribe } from '../components/subscribe';
import { ColumnList } from '../components/column-list';
import { Event, Events } from '../components/events';
import { EventCard, EventCards } from '../components/event-cards';
import { SliderMediaList } from '../components/slider';
import { MyBitAppLications } from '../components/myBitAplications/my-bit-applications';
import { DevelopersCards } from '../components/developersCards/developers-cards';
import { TeamCards } from '../components/teamCards/team-cards';
import { NewsEventsSection } from '../components/newsEventsSection/news-events-section';
import { MybitVentures } from '../components/mybitVentures/mybit-ventures';
import { CommunityInitiatives } from '../components/communityInitiatives/community-initatives';
import { AboutUsSection } from '../components/aboutUs/about-us';
import { TwoColumnsCard } from '../components/twoColumnsCard/two-columns-card';
import { MyBitTokenSection } from '../components/myBitTokenSection/mybit-token-section';
import { LandingBanner } from '../components/landingBanner/landing-banner';
import { Roadmap } from '../components/roadmap/roadmap';
import { WeWorkWith } from '../components/weWorkWith/WeWorkWith';
import { Exchanges } from '../components/exchanges/exchanges';
import { GetFunding } from '../components/getFunding/get-funding';

import { DropdownCustom } from '../components/dropdown';
import { Locale } from '../components/locale';
import { Countdown } from '../components/Countdown/countdown';
import { InputForm } from '../components/inputForm/input-form';
import { UpdateSection } from '../components/updateSection/update-section';
import { JoinSection } from '../components/joinSection/join-section';
import { HowDoesItWork } from '../components/howDoesItWork/how-does-it-work';
import { HowToUse } from '../components/howToUse/how-to-use'

import { devToolsData } from '../components/constants/dev-tools-and-white-label';
import { waysToContributeData } from '../components/constants/ways-to-contribute';
import { teamDesc } from '../components/constants';

import { TokenSale } from '../components/tokenSale/tokenSale';

const [ diamondHighlight ] = diamondHighlights;
const [ highlight ] = highlights;
const [ wallet ] = wallets;
const [ medium ] = media;

const darkDecorator = (storyFn) => (
  <div style={{ backgroundColor: '#001358', padding: '30px' }}>
    {storyFn()}
  </div>
);

const events = [{
  title: 'My sample image',
  description: 'Lorem ipsum dolor sit amet ...',
  imageSrc: '/static/social/mybit_facebook_cover.png',
  imageAlt: 'Sample image',
  button: <Button isLight label="See more" onClick={action('button-click')} />
}, {
  title: 'My second sample image',
  description: 'Lorem ipsum dolor sit amet ...',
  imageSrc: '/static/social/mybit_facebook_cover.png',
  imageAlt: 'Sample image two',
  button: <Button isLight label="See more" onClick={action('button-click')} />
}];

const team = [
  {
    name: 'Ian Worrell',
    intro:
      'a veteran to the bitcoin industry who began as a miner and trader and moved into blockchain applications in 2013.',
    bio: 'this is the bio.',
    linkedin: 'https://linkedin.com/in/'
  },
  {
    name: 'Jose Aguinaga',
    intro: 'this is an intro.',
    bio:
      'josé is a web engineer with multiple years of experience in javascript related technologies and software engineering. having worked for different startups in various cities across the world like zürich, san francisco, méxicocity, and bali, josé has developed an insider’s understanding of the startup culture within the fintech and blockchain Network.',
    linkedin: 'https://linkedin.com/in/'
  },
  {
    name: 'Connor',
    intro:
      'a blockchain engineer, who has experience not only in the blockchain industry for some years, but also the cyber security industry.',
    bio: 'this is the bio.',
    linkedin: 'https://linkedin.com/in/'
  },
  {
    name: 'Joost',
    intro:
      'studied international business with a specialization in branding and marketing.',
    bio: 'this is the bio.',
    linkedin: 'https://linkedin.com/in/'
  },
  {
    name: 'Ash',
    intro:
      'brings 8 years creative experience working on brand development, digital design and creative consultancy.',
    bio: 'this is the bio.',
    linkedin: 'https://linkedin.com/in/'
  },
  {
    name: 'Kyle',
    intro:
      'A blockchain engineer, developing Ethereum Dapps for various projects since early 2016.',
    bio: 'This is the bio.',
    linkedin: 'https://linkedin.com/in/'
  }
]

storiesOf('Sections', module)
.addWithJSX(
  'Update section',
  () => <UpdateSection header="Sign up for updates" subheader="and be the first to get the news"/>
)
.addWithJSX(
  'Join section',
  () => <JoinSection header="Join the community" subheader="get involved and get rewarded"/>
)

storiesOf('Input form', module)
.addWithJSX(
  'Signup form',
  () => <div  style={{width:"469px"}}><InputForm title="Sign Up"/></div>
)

storiesOf('Countdown', module)
  .addWithJSX(
    'Initial countdown',
    () => <div  style={{backgroundColor:"#001358"}}><Countdown /></div>
  )

storiesOf('Button', module)
  .add('Button', () => (
    <Button label="Learn more" onClick={action('button-click')} />
  ))
  .addDecorator(darkDecorator)
  .add('Light Button', () => (
    <Button isLight label="Sign up" onClick={action('button-click')} />
  ))

storiesOf('Locale', module)
  .addWithJSX(
    'Initial locale',
    () => <div  style={{backgroundColor:"#001358"}}><Locale /></div>
  )

storiesOf('Dropdown', module)
  .addWithJSX(
    'Resources',
    () => <div style={{backgroundColor:"#001358"}}><DropdownCustom name='Recources' list={resourcesDropDown}/></div>
  )
  .addWithJSX(
    'About',
    () => <div style={{backgroundColor:"#001358"}}><DropdownCustom name='About' list={aboutDropDown}/></div>
  )

storiesOf('Header', module)
  .add(
    'Light',
    () => <Header isLight/>
  )
  .add(
    'With Banner',
    () =>
    <div className="headerWrapper" >
      <Header isDark={false}/>
      <LandingBanner/>
    </div>
  )

storiesOf('Menu', module)
  .add(
    'New',
    () => <Menu />
  );

storiesOf('Link', module)
  .addDecorator(story => <div style={{height:"100px", backgroundColor:"#516ba4"}}>{story()}</div>)
  .add(
    'Default',
    () => <div style={{paddingTop: "25px", width:"max-content", margin: "0px auto"}}> <Link name="Explore" path="#" /> </div>
  );

storiesOf('Media', module)
  .add(
    'Media carousel',
    () => <SliderMediaList type="chevron"/>
  )

  storiesOf('My Bit Aplications Grid', module)
  .add(
    'Aplications Grid',
    () => <MyBitAppLications/>
  )

  storiesOf('Cards Grid', module)
  .add(
    'Developers',
    () => <DevelopersCards/>
  )
  .add(
    'Teams',
    () => <TeamCards/>
  )
  .add(
    'News Events',
    () => <NewsEventsSection/>
  )
  .add(
    'MyBit Ventures',
    () => <MybitVentures/>
  )
  .add(
    'Developer Tools',
    () => <TwoColumnsCard columnsData={devToolsData}/>
  )
  .add(
    'Ways to contribute',
    () => <TwoColumnsCard columnsData={waysToContributeData}/>
  )
  .add(
    'How does it work',
    () => <HowDoesItWork />
  )
  .add(
    'How to use',
    () => <HowToUse />
  )

  .add(
    'The MyBit token',
    () => <MyBitGraphic/>
  )


storiesOf('Community Initiatives', module)
  .add(
    'Community Initiatives',
    () => <CommunityInitiatives/>
  )

  storiesOf('My Bit Token', module)
  .add(
    'My Bit Token',
    () => <MyBitTokenSection/>
  )

  storiesOf('About Us', module)
  .add(
    'About Us',
    () => <AboutUsSection/>
  )

storiesOf('Team Members (v2)', module)
  .add('Default', () => (
    <TeamMembers team={teamDesc} />
  ))

storiesOf('Achievements (v2)', module)
  .add('Default', () => (
    <Achievements achievements={achievements} />
  ))

storiesOf('Highlights (v2)', module)
  .add('Highlight', () => (
    <Highlight title={highlight.title} content={highlight.content} isRectangle />
  ))
  .add('Highlights', () => <Highlights highlights={highlights} isRectangle />)
  .add('Diamond Highlight', () => (
    <Highlight
      title={diamondHighlight.title}
      content={diamondHighlight.content}
      isDiamond
    />
  ))
  .add('Diamond Highlight (Light)', () => (
    <Highlight
      title={diamondHighlight.title}
      content={diamondHighlight.content}
      isDiamond
      isLight
    />
  ))
  .add('Media Highlight', () => (
    <Highlight
      title={highlight.title}
      content={highlight.content}
      icon="MyBitDappIcon"
      isCentered
      isLight
    />
  ))
  .add('Media Highlights', () => <Highlights highlights={mediaHighlights} />)
  .add('Media Diamond Highlight', () => (
    <Highlight
      title={diamondHighlight.title}
      content={diamondHighlight.content}
      icon="MyBitDappIcon"
      isDiamond
      isCentered
      isLight
    />
  ))
  .add('Grouped Diamond Highlights', () => (
    <Highlights
      highlights={diamondHighlights}
      isDiamond
      startsFromLight={false}
    />
  ))
storiesOf('Token Sale', module)
  .add(
    'Token Sale',
    () => <TokenSale />
  )

storiesOf('Icon (v2)', module)
  .add('Icon', () => <Icon name="medium" />)
  .add('Icon List', () => <IconList />)
  .add('Partner List', () => <PartnersList />)
  .add('Media List', () => <MediaList />)

storiesOf('Footer (v2)', module)
  .add(
    'Mobile footer',
  () => <MyBitFooter />
  );

storiesOf('Subscribe (v2)', module)
  .addDecorator(darkDecorator)
  .add(
    'Subscription',
    () => <Subscribe onSubmit={action('form-submit')} label='To our email list' buttonLabel='Send' placeholder='Enter email address' />
  ).add(
    'Subscription with error',
    () => <Subscribe errorMessage='Error subscribing' onSubmit={action('form-submit')} label='To our email list' buttonLabel='Send' placeholder='Enter email address' />
  ).add(
    'Subscription with success',
    () => <Subscribe successMessage='Thank you for subscribing' onSubmit={action('form-submit')} label='To our email list' buttonLabel='Send' placeholder='Enter email address' />
  ).add(
    'Subscription sending',
    () => <Subscribe sending errorMessage='' onSubmit={action('form-submit')} label='To our email list' buttonLabel='Send' placeholder='Enter email address' />
  );

storiesOf('Column List (v2)', module)
  .addDecorator(darkDecorator)
  .add(
    'Column list',
    () => (
      <ColumnList
        links={[{
          title: 'My link 1',
          url: '#'
        }, {
          title: 'My link 2',
          url: '#'
        }, {
          title: 'List text'
        }, {
          title: 'My link 3',
          url: '#',
          inactive: true
        }]}
      />)
  );

storiesOf('Events', module)
  .add(
    'Events with two Event molecules',
    () => <Events events={events}/>
  )
  .add(
    'Events with four Event molecules',
    () => <Events events={[...events, ...events]} />
  )
  .addDecorator(darkDecorator)
  .add(
    'Event molecule',
    () => <Event {...events[0]} />
  );

storiesOf('Roadmap', module)
  .add(
    'Roadmap',
    () => <Roadmap events={EventsData.roadmapEvents} />
);

storiesOf('WeWorkWith', module)
  .add(
    'We work with',
    () => <WeWorkWith />
);

storiesOf('Exchanges', module)
  .add(
    'Exchanges',
    () => <Exchanges />
);

storiesOf('GetFunding', module)
  .add(
    'Get Funding',
    () => <GetFunding />
);
