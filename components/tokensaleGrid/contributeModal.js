import React, { Fragment } from 'react'
import stylesheet from './tokensaleGrid.scss'
import { Modal, Button } from 'antd'

const ContributeModal = ({ visible, loading, handleCancel, handleConfirm}) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Modal
          visible={visible}
          title="Title"
          onOk={handleConfirm}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleConfirm}>
              Submit
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </Fragment>
)

export default ContributeModal
