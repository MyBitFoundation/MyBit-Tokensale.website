import React, { Fragment } from 'react'
import stylesheet from './calculateModal.scss'
import { Modal, Select, InputNumber, Icon, Input, Button } from 'antd'
import { tokensPerDay } from '../constants';

const Option = Select.Option;
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const mybIcon = '../../static/tokensale/MYB-icon.svg';
const CalculateModal = ({
  visible,
  handleCancel,
  handleConfirm,
  onSelectChange,
  onContributeChange,
  currentDay,
  selectedDay,
  contributions,
  ethPrice,
  contribution,
  isLoggedIn,
  isMetamaskInstalled,
  network,
  enabled,
  allowed,
}) => {
  const periodsLeft = [];
  for(let i = currentDay || 1; i <= 365; i++){
    periodsLeft.push(
      <Option key={i} value={i}>{`Distribution Period #${i}`}</Option>
    )
  }
  let effectivePrice = undefined;
  let estimatedMyb = undefined;
  selectedDay = selectedDay > 0 ? selectedDay : currentDay ? currentDay : 1;
  if(!isNaN(contribution)){
    const totalEther = contributions[selectedDay - 1].total_eth;
    effectivePrice = ((totalEther + contribution) * ethPrice) / tokensPerDay;
    effectivePrice = Number(effectivePrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
    });
    estimatedMyb = totalEther === 0 ? 100000 : contribution === 0 ? 0 : Math.round(tokensPerDay * (contribution / (totalEther + contribution)));
    estimatedMyb = estimatedMyb.toLocaleString();
  }
  if(contribution === 0 || !contribution || (contribution && contribution.toString().indexOf('.') + 1 === contribution.toString().length)){
    estimatedMyb = undefined;
    effectivePrice = undefined;
  }
  return (
  <Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <Modal
        visible={visible}
        title="Calculate Your Contribution"
        onOk={handleConfirm}
        onCancel={handleCancel}
        footer={null}
        width={499}
        wrapClassName="calculateModal__wrapper"
        destroyOnClose
      >
        <div className="calculateModal__content">
          <div className="calculateModal__label">
            Select distribution period
          </div>
          <Select defaultValue={selectedDay} onChange={onSelectChange}>
            {periodsLeft}
          </Select>
          <div className="calculateModal__label">
            How much do you want to contribute?
          </div>
          <InputNumber autoFocus value={contribution} onChange={onContributeChange} placeholder="Contribution in ETH" />
          <Icon type="arrow-down" theme="outlined" style={{color: "#1890FF"}} />
          <div className="calculateModal__label">
              Estimated MYB you will receive:
          </div>
          <Input disabled value={estimatedMyb} placeholder="Estimated MYB" suffix={(<img src={mybIcon} alt="MYB Token Icon" className="mybIcon"></img>)} />
          <div className="calculateModal__label">
              Effective price per MYB:
          </div>
          <Input disabled value={effectivePrice} placeholder="1 MYB = $0.22" suffix={(<img src={mybIcon} alt="MYB Token Icon" className="mybIcon"></img>)} />
          <Button
            disabled={!contribution || contribution === 0 || !isLoggedIn || enabled === false  || allowed === false}
            block
            className="calculateModal__confirm"
            onClick={handleConfirm}
          >
            {!isMetamaskInstalled
              ? 'Install Metamask'
              : network !== 'ropsten'
                ? 'Switch to the Ropsten test network'
                : !isLoggedIn
                  ? 'Login to Metamask'
                  : enabled === false
                    ? 'Connect Metamask'
                    : allowed === false
                      ? 'Not allowed to participate'
                      : 'Confirm Contribution'
                    }
            <img src={tokensaleMetamask} alt="Metamask Logo" width="26px"></img>
          </Button>
        </div>
      </Modal>
  </Fragment>
)}

export default CalculateModal
