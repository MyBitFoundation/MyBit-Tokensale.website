import React, { Fragment } from 'react'
import stylesheet from './contributeModal.scss'
import { Modal, Select, InputNumber, Button } from 'antd'

const Option = Select.Option;
const tokensaleMetamask = '../../static/tokensale/metamask.svg';

const ContributeModal = ({
  visible,
  handleCancel,
  handleConfirm,
  onSelectChange,
  onContributeChange,
  currentDay,
  selectedDay,
  contribution,
  isLoggedIn,
  isMetamaskInstalled,
  network
}) => {
  const periodsLeft = [];
  for(let i = currentDay; i <= 365; i++){
    periodsLeft.push(
      <Option key={i} value={i}>{`Distribution Period #${i}`}</Option>
    )
  }
  return (
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
            <Select key={new Date().getTime()} defaultValue={selectedDay && selectedDay > 0 ? selectedDay : currentDay} onChange={onSelectChange}>
              {periodsLeft}
            </Select>
            <div className="contributeModal__label">
              How much do you want to contribute?
            </div>
            <InputNumber autoFocus value={contribution} onChange={onContributeChange} placeholder="Contribution in ETH" />
            <Button disabled={!contribution || contribution === 0 || !isLoggedIn} block className="contributeModal__confirm" onClick={handleConfirm}>
              {!isMetamaskInstalled ?  'Install Metamask' : network !== 'ropsten' ? 'Switch to the Ropsten test network' :  'Confirm Contribution'}
              <img src={tokensaleMetamask} alt="Metamask Logo" width="26px"></img>
            </Button>
          </div>
        </Modal>
    </Fragment>
)}

export default ContributeModal
