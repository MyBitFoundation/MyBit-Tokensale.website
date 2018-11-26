import { Checkbox, Button } from 'antd';

const TermsOfService = ({allCheckBoxesChecked, handleCheckboxChange }) => {
  console.log(allCheckBoxesChecked)
  return(
    <div style={{position: 'relative'}}>
      <div className="TermsOfService">
        <p className="Banner__title">MYB Token Distribution</p>
        <p className="TermsOfService__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
         nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
      <div className="TermsOfService__rectangle">
        <div className="TermsOfService__rectangle-content"/>
      </div>
      <div className="TermsOfService__checkboxes">
        <div className="TermsOfService__checkboxes-group">
          <Checkbox onChange={(event) => handleCheckboxChange(event.target.checked)}>I agree to T&CS</Checkbox>
          <Checkbox onChange={(event) => handleCheckboxChange(event.target.checked)}>I agree to T&CS</Checkbox>
        </div>
        <div className="TermsOfService__checkboxes-group">
          <Checkbox onChange={(event) => handleCheckboxChange(event.target.checked)}>I agree to T&CS</Checkbox>
          <Checkbox onChange={(event) => handleCheckboxChange(event.target.checked)}>I agree to T&CS</Checkbox>
        </div>
      </div>
      <p className="TermsOfService__pleaseCheck">Please check all boxes to continue</p>
      <a
        href={allCheckBoxesChecked ? "/dashboard" : undefined}
        className="TermsOfService__link"
      >
       <Button
          type="primary"
          disabled={!allCheckBoxesChecked}
          className="TermsOfService__btn"
          key={`TermsOfService__continue-btn ${allCheckBoxesChecked}`}
        >
          Continue
        </Button>
      </a>
    </div>
  )
}

export default TermsOfService;
