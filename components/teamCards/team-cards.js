import React from 'react'
import Link from 'next/link'
import { Row, Col, Card, Button } from 'antd';
import { teamsData } from '../constants';
import stylesheet from './team-cards.scss'

export class TeamCards extends React.Component {
  render() {
    return (
        <Row type="flex" className="teamCards">
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
            <Col xs={0} md={12}>
              <Card bordered={false} className="imageCard imageCard--dark">
                <div className="imageCard-imageContainer">
                  <img src={teamsData.image}/>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card bordered={false} className="textCard textCard-text--right">
                <div className="textCard-contentWrapper">
                  <h2 className="textCard-header">{teamsData.title}</h2>
                  <p className="textCard-content">
                    {teamsData.content}
                  </p>
                  {
                  teamsData.button &&
                  <Link href={teamsData.button.url}>
                  <Button type="primary" className="developersCard-btn">
                    {teamsData.button.text}
                  </Button>
                  </Link>
                  }
                </div>
              </Card>
            </Col>
        </Row>
    );
  }
}
