import React, { Fragment } from 'react'
import stylesheet from './phase-table.scss'
import { Table, Button } from 'antd'
import dummyData from './dummyData'

const PhaseTable = ({onShowContributeModal}) => {

  const tableColumns = [{
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`#${value}`}</div>) :
        (<div className="phaseTable__active-row">{`#${value}`}</div>)
    }
  }, {
    title: 'MYB Distributed',
    dataIndex: 'myb_distributed',
    key: 'myb_distributed',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} MYB`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} MYB`}</div>)
    }
  }, {
    title: 'Total ETH',
    dataIndex: 'total_eth',
    key: 'total_eth',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} ETH`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} ETH`}</div>)
    }
  }, {
    title: 'Effective Price',
    dataIndex: 'price',
    key: 'price',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`$${value.toLocaleString()}`}</div>) :
        (<div className="phaseTable__active-row">{`$${value.toLocaleString()}`}</div>)
    }
  }, {
    title: 'Period closed',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{value}</div>) :
        (<div className="phaseTable__active-row">{value}</div>)
    }
  }, {
    title: 'Your contribution',
    dataIndex: 'your_contribution',
    key: 'your_contribution',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} ETH`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} ETH`}</div>)
    }
  }, {
    title: 'MYB received',
    dataIndex: 'myb_received',
    key: 'myb_received',
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} MYB`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} MYB`}</div>)
    }
  }, {
    title: 'Contribute',
    dataIndex: 'contribute',
    key: 'contribute',
    render: (value, record) => {
      if (record.phaseActive) {
        return (<button onClick={onShowContributeModal} className="phaseTable__active-phase-button">Contribute</button>)
      } else {
        return record.closed ?
          (<Button 
              onClick={() => { console.log(`Phase ${record.period} button clicked to claim!`) }} 
              className="phaseTable__closed-row-button"
              disabled={record.your_contribution === 0}>
              Claim
            </Button>) :
          (<Button onClick={onShowContributeModal} className="phaseTable__active-row-button">Contribute</Button>)
      }
    }
  }];

  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <h1 className="phaseTable__main-heading">Token Distribution Dashboard</h1>
      <div className="phaseTableWrapper">
        <Table
          className="phaseTable"
          dataSource={dummyData}
          columns={tableColumns}
          pagination={false}
          rowClassName={(record) => record.phaseActive ? 'phaseTable__active-phase' : ''}
        />
      </div>
    </Fragment>
  )
}

export default PhaseTable
