import React, { Fragment } from 'react'
import stylesheet from './calculateModal.scss'
import { Modal, Select, InputNumber, Icon, Input, Button } from 'antd'
import {
  tokensPerDay,
  isDecimal,
} from '../constants';

const Option = Select.Option;
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const mybIcon = '../../static/tokensale/MYB-icon.svg';

class CalculateModal extends React.Component{

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.visible !== nextProps.visible){
      return true;
    } else if (this.props.selectedDay !== nextProps.selectedDay){
      return true;
    } else if(this.props.contribution !== nextProps.contribution){
      return true;
    } else if(this.props.contributions !== nextProps.contributions){
      return true;
    } else if(this.props.ethPrice !== nextProps.ethPrice){
      return true;
    }
    return false;
  }

  render(){
    const {
      visible,
      handleCancel,
      handleConfirm,
      onSelectChange,
      onContributeChange,
      currentDay,
      contributions,
      ethPrice,
      contribution,
      isLoggedIn,
      isMetamaskInstalled,
      network,
      enabled,
      allowed,
    } = this.props;

    let {
      selectedDay,
    } = this.props;

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
      let contributionFinal = +contribution;
      const totalEther = contributions[selectedDay - 1].total_eth;
      effectivePrice = ((totalEther + contributionFinal) * ethPrice) / tokensPerDay;
      effectivePrice = Number(effectivePrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 3,
      });
      estimatedMyb = totalEther === 0 ? 100000 : contributionFinal === 0 ? 0 : Math.round(tokensPerDay * (contributionFinal / (totalEther + contributionFinal)));
      estimatedMyb = estimatedMyb.toLocaleString('en-US', {maximumFractionDigits: 3});
    } else {
      effectivePrice = null;
      estimatedMyb = null;
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
            <Input
             autoFocus
             onChange={onContributeChange}
             placeholder="Contribution in ETH"
            />
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
              disabled={!contribution || contribution === 0 || !isLoggedIn || !isDecimal(contribution) || enabled === false  || allowed === false}
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
    )
  }
}

export default CalculateModal
