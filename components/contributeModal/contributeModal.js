import React, { Fragment } from 'react'
import stylesheet from './contributeModal.scss'
import { Modal, Select, InputNumber, Button } from 'antd'

const Option = Select.Option;
const tokensaleMetamask = '../../static/tokensale/metamask.svg';

const ContributeModal = ({ visible, handleCancel, handleConfirm, onSelectChange, onContributeChange}) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Modal
          visible={visible}
          title="Contribute"
          onOk={handleConfirm}
          onCancel={handleCancel}
          footer={null}
          width={499}
          wrapClassName="contributeModal__wrapper"
        >
          <div className="contributeModal__content">
            <div className="contributeModal__label">
              Select distribution period
            </div>
            <Select defaultValue="phase6" onChange={onSelectChange}>
              <Option value="phase6">Distribution Period #6</Option>
              <Option value="phase7">Distribution Period #7</Option>
              <Option value="phase8">Distribution Period #8</Option>
            </Select>
            <div className="contributeModal__label">
              How much do you want to contribute?
            </div>
            <InputNumber onChange={onContributeChange} placeholder="Contribution in ETH" />
            <Button block className="contributeModal__confirm" onClick={handleConfirm}>
              Confirm Contribution
              <img src={tokensaleMetamask} alt="Metamask Logo" width="26px"></img>
            </Button>
          </div>
        </Modal>
    </Fragment>
)

export default ContributeModal
