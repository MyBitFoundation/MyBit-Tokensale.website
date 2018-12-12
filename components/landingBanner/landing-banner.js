import React, {Fragment} from 'react'
import { Row, Col, Card, Button } from 'antd';
import { links } from '../constants/links';
import stylesheet from './landing-banner.scss';

const bannerImageUrl = '../../static/svgs/landingGraphic.svg';

const lendingBannerData = {
  title: <h2 className="textCard-header">Leaders in Distributing <br/> Wealth</h2>,
  button: {text: 'Discover MyBit', url: links.aboutPage},
  content:
  <Fragment>
    <p>
      MyBit makes it easy to build financial applications on the Blockchain.
    </p>
    <p>
      Our vision is to distribute wealth using technology, not middlemen. Everything
      from investments, payrolls, wills, trusts, and much more. All without lawyers,
      brokers and excessive third party fees. All powered by MyBit.
    </p>
  </Fragment>
};

export class LandingBanner extends React.Component {
  render() {
    return (
      <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Row type="flex" className="landing-banner">
          <Col xs={24} lg={12}>
            <Card bordered={false} className="textCard">
              {lendingBannerData.title}
              <div className="textCard-content">
                {lendingBannerData.content}
              </div>
              {lendingBannerData.button &&
                <Button type="primary" className="textCard-btn" href={lendingBannerData.button.url}>
                  {lendingBannerData.button.text}
                </Button>
              }
            </Card>
          </Col>
          <Col xs={0} lg={12}>
            <Card bordered={false} className="imageCard">
              <img src={bannerImageUrl} alt="Landing banner"></img>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
