import ReactMarkdown from 'react-markdown';
import { Checkbox, Button } from 'antd';
import { termsAndConditions } from './terms';
import {
  getUserAcceptedTermsOfService,
  setUserAcceptedTermsOfService
 } from '../../utils';
import stylesheet from './style.scss'

class TermsOfService extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hitBottom: false,
      checkBoxesChecked: 0,
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleScroll(e){
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !this.state.bottom){
      this.setState({
        hitBottom: true,
      });
    }
  }

  handleCheckboxChange(value){
    const { checkBoxesChecked } = this.state;
    this.setState({
      checkBoxesChecked: value ? checkBoxesChecked + 1 : checkBoxesChecked - 1,
    });
  }

  continueToContribute(){
    setUserAcceptedTermsOfService();
    this.props.continueToContribute();
  }

  render(){
    const {
      allCheckBoxesChecked,
    } = this.props;

    const { 
      hitBottom,
      checkBoxesChecked,
    } = this.state;

    return(
      <div>
         <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="TermsOfService">
          <p className="Banner__title">MYB Token Distribution</p>
          <p className="TermsOfService__description">PLEASE READ THE MYBIT TOKEN DISTRIBUTION TERMS AND CONDITIONS,
          THE MYBIT NETWORK TECHNICAL WHITEPAPER, AND CONFIRM THE FACTS IN THE CHECKBOXES BELOW IN ORDER TO PROCEED.</p>
        </div>
        <div className="TermsOfService__rectangle" onScroll={this.handleScroll}>
          <ReactMarkdown
            source={termsAndConditions}
            className="TermsOfService__rectangle-content"
          />
        </div>
        <div className="TermsOfService__checkboxes">
          <div className="TermsOfService__checkboxes-group">
            <div style={{position: 'relative', width: '48%'}}>
              <Checkbox
                onChange={(event) => this.handleCheckboxChange(event.target.checked)}
              />
              <p>
                Click here to confirm that you are NOT a U.S. citizen, resident
                or entity (each a "U.S. Person") nor are you purchasing MYB Tokens or
                signing on behalf of a U.S. Person.
              </p>
            </div>
            <div style={{position: 'relative', width: '48%'}}>
              <Checkbox
                onChange={(event) => this.handleCheckboxChange(event.target.checked)}
              />
              <p>
                Click here to confirm that you are NOT a citizen or resident of the People's
                Republic of China or an entity formed under the laws of the Peopl's Republic
                of China (each a "Chinese Person") nor are you purchasing MYB Tokens or
                signing on behalf of a Chinese Person.
              </p>
            </div>
          </div>
          <div className="TermsOfService__checkboxes-group">
            <div style={{position: 'relative', width: '48%'}}>
              <Checkbox
                onChange={(event) => this.handleCheckboxChange(event.target.checked)}
                disabled={!hitBottom}
              />
              <p>
                Check here to confirm that you have read, understand, and agree to the <a href="https://files.mybit.io/files/MyBit_TokenSaleToC.pdf" target="_blank" rel="noopener noreferrer">MyBit Token Distribution Terms and Conditions</a>.
              </p>
            </div>
            <div style={{position: 'relative', width: '48%'}}>
              <Checkbox
                onChange={(event) => this.handleCheckboxChange(event.target.checked)}
              />
              <p>
                Check here to confirm that you have read and FULLY understand the <a href="https://files.mybit.io/files/MyBit_Whitepaper_v4.0.0.pdf" target="_blank" rel="noopener noreferrer">MyBit Network Technical Whitepaper</a>.
              </p>
            </div>
          </div>
        </div>
        <p className="TermsOfService__pleaseCheck">Please check all boxes to continue</p>
       <Button
          type="primary"
          disabled={checkBoxesChecked !== 4}
          className="TermsOfService__btn"
          key={`TermsOfService__continue-btn ${allCheckBoxesChecked}`}
          onClick={this.continueToContribute}
        >
          Continue
        </Button>
      </div>
    )
  }
};

export default TermsOfService;
