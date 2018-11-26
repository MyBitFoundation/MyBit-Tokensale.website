import React from 'react'
import Link from 'next/link'
import { Col, Card, Button } from 'antd';
import { myBitAppsHighlights } from '../constants';
import stylesheet from './my-bit-applications.scss';


export class MyBitApplications extends React.Component {
  render() {
    const {page}=this.props;
    const isApps = page === "applications";
    return (
      <section className="appsSection mainContainer">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <h2 className={`appsSection-header ${isApps ? "appsSection-header--applications" : null}`}>
          {myBitAppsHighlights.title}
        </h2>
        {
          isApps &&
          <p className="appsSection-text">{myBitAppsHighlights.description}</p>
        }
        <div className="appsSection-gridContainer">
          { myBitAppsHighlights.applications.map((app) => (
                <Col xs={12} md={6} key={app.id} style={{'padding': 0}} className={`appsSection-col appsSection-col--${app.name}`} hidden={app.displayPage==="aplications" && !page}>
                  <Card bordered={false} className="appCard">
                    <div className="appCard-image">
                      {app.imageUrl &&
                      <img src={app.imageUrl} alt={app.name} className={app.name}/>
                      }
                    </div>
                    <div className="appCard-content">
                      <p>{app.content}</p>
                      {
                        app.button &&
                        <Button type="primary" href={app.button.url} target="_blank"
                        rel="noopener noreferrer" className={`appCard-btn ${app.button.type}`} disabled={app.button.disabled}>
                          {app.button.text}
                        </Button>
                      }
                    </div>
                  </Card>
                </Col>
            )
          )}
        </div>
        {
          myBitAppsHighlights.button && !isApps &&
          <Link prefetch href={myBitAppsHighlights.button.url}>
            <Button type="primary" href={myBitAppsHighlights.button.url} className="appsSection-btn">
              {myBitAppsHighlights.button.text}
            </Button>
          </Link>
        }
      </section>
    );
  }
}
