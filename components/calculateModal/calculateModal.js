import React, { Fragment } from 'react'
import stylesheet from './calculateModal.scss'
import { Modal, Select, InputNumber, Icon, Input } from 'antd'

const Option = Select.Option;
const tokensaleMetamask = '../../static/tokensale/metamask.svg';
const mybIcon = '../../static/tokensale/MYB-icon.svg';

const CalculateModal = ({ visible, handleCancel, handleConfirm, onSelectChange, onContributeChange}) => (
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
        >
          <div className="calculateModal__content">
            <div className="calculateModal__label">
              Select distribution period
            </div>
            <Select defaultValue="phase6" onChange={onSelectChange}>
              <Option value="phase6">Distribution Period #6</Option>
              <Option value="phase7">Distribution Period #7</Option>
              <Option value="phase8">Distribution Period #8</Option>
            </Select>
            <div className="calculateModal__label">
              How much do you want to contribute?
            </div>
            <InputNumber onChange={onContributeChange} placeholder="Contribution in ETH" />
            <Icon type="arrow-down" theme="outlined" style={{color: "#1890FF"}} />
            <div className="calculateModal__label">
                Estimated MYB you will receive:
            </div>
            <Input placeholder="Estimated MYB" suffix={(<img src={mybIcon} alt="MYB Token Icon" className="mybIcon"></img>)} />
            <div className="calculateModal__label">
                Effective price per MYB:
            </div>
            <Input placeholder="1 MYB = $0.22" suffix={(<img src={mybIcon} alt="MYB Token Icon" className="mybIcon"></img>)} />
            <button className="calculateModal__confirm" onClick={handleConfirm}>
              Confirm Contribution
              <img src={tokensaleMetamask} alt="Metamask Logo" width="26px"></img>
            </button>
          </div>
        </Modal>
    </Fragment>
)

export default CalculateModal
