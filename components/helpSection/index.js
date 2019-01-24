import Button from 'antd/lib/button';
import Collapse from 'antd/lib/collapse';
import { FAQ } from '../constants/helpSection';
import stylesheet from './helpSection.scss'

const { Panel } = Collapse;

const HelpSection = () => (
  <div className="HelpSection">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <Collapse defaultActiveKey="Issues with contributing?" onChange={() => {}} accordion>
      {FAQ.map(section => (
        <Panel header={section.title} key={section.title}>
          {section.content.map(content => (
            <div key={content.question}>
              <p className="HelpSection-question">{content.question}</p>
              {content.answer}
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  </div>
)

export default HelpSection;
