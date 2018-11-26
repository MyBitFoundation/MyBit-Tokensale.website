import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import stylesheet from './news-events-section.scss';
import { eventsData, newsData } from '../constants'

export class NewsEventsSection extends React.Component {
  render() {
    return (
      <section className="newsEventsSection mainContainer">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Row type="flex" className="newsEventsCards" gutter={{ xs:0, md:24 }}>
          <Col xs={24} md={12}>
            <Card bordered={false} className="newsCard" >
              <h2 className="newsEventsCards-header">{newsData.title}</h2>
              <div className="newsEventsCards-imageContainer">
                <img src={newsData.imageUrl} className="newsCard-image"/>
              </div>
              {
                newsData.button &&
                <Button 
                  type="primary" 
                  className="newsEventsCards-btn" 
                  href={newsData.button.url}
                  rel={newsData.button.external ? 'noopener noreferrer' : null}
                  target={newsData.button.external ? '_blank' : null}
                >
                  {newsData.button.text}
                </Button>
              }
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card bordered={false} className="eventsCard" >
              <h2 className="newsEventsCards-header">{eventsData.title}</h2>
              <div className="newsEventsCards-imageContainer">
                <img src={eventsData.imageUrl} className="newsCard-image"/>
              </div>
              {
                eventsData.button &&
                <Button 
                  type="primary" 
                  className="newsEventsCards-btn" 
                  href={eventsData.button.url}
                  rel={eventsData.button.external ? 'noopener noreferrer' : null}
                  target={eventsData.button.external ? '_blank' : null}
                >
                  {eventsData.button.text}
                </Button>
              }
            </Card>
          </Col>
        </Row>
      </section>
    );
  }
}
