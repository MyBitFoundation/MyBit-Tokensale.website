import React, { Fragment } from 'react'
import stylesheet from './phase-table.scss'
import { Table, Button } from 'antd'
import { tokensPerDay, dayInSeconds } from '../constants';
import Dayjs from 'dayjs';
import CountdownHours from '../countdownHours';


const PhaseTable = ({ onShowContributeModal, data, currentPage, timestampStartTokenSale, withdraw, ethPrice }) => {
  const currentDay = ((Math.floor(Date.now() / 1000) - timestampStartTokenSale) / dayInSeconds) + 1;
  const past = currentDay % 1;
  const secondsUntilNextPeriod = ((1 - past) * dayInSeconds).toFixed(0);

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
    className: "phaseTable__xs-hide",
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${tokensPerDay.toLocaleString()} MYB`}</div>) :
        (<div className="phaseTable__active-row">{`${tokensPerDay.toLocaleString()} MYB`}</div>)
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
      const contributedEth = record.total_eth;
      const effectivePrice = record.total_eth > 0 ? (ethPrice * contributedEth) / tokensPerDay : 0;
      return record.closed ?
        (<div className="phaseTable__closed-row">{`$${effectivePrice.toLocaleString()}`}</div>) :
        (<div className="phaseTable__active-row">{`$${effectivePrice.toLocaleString()}`}</div>)
    }
  }, {
    title: 'Period ends',
    dataIndex: 'deadline',
    key: 'deadline',
    render: (value, record) => {
      return record.closed
        ? (<div className="phaseTable__closed-row">{record.date}</div>)
        : record.phaseActive
          ? <CountdownHours
             time={secondsUntilNextPeriod}
            />
          : (<div className="phaseTable__active-row">{record.date}</div>)
    }
  }, {
    title: 'Your contribution',
    dataIndex: 'your_contribution',
    key: 'your_contribution',
    className: "phaseTable__xs-hide",
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} ETH`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} ETH`}</div>)
    }
  }, {
    title: 'MYB received',
    dataIndex: 'myb_received',
    key: 'myb_received',
    className: "phaseTable__xs-hide",
    render: (value, record) => {
      return record.closed ?
        (<div className="phaseTable__closed-row">{`${value.toLocaleString()} MYB`}</div>) :
        (<div className="phaseTable__active-row">{`${value.toLocaleString()} MYB`}</div>)
    }
  }, {
    title: 'Contribute',
    dataIndex: 'contribute',
    key: 'contribute',
    className: "phaseTable__xs-hide",
    render: (value, record) => {
    if (!record.closed) {
        return (
          <Button
            onClick={() => onShowContributeModal(record.period)}
            className={record.phaseActive ? 'phaseTable__active-phase-button' : undefined}
            type="primary"
            size="small"
          >
            Get MYB
          </Button>
        )
      } else {
        return record.closed && record.owed > 0 ? (
          <Button
            onClick={() => withdraw(record.period)}
            className="phaseTable__closed-row-button"
          >
            Claim
          </Button>)
        : null;
      }
    }
  }];

  //slice results for pagination
  const startIndex = currentPage * 25;
  let endIndex = (currentPage + 1) * 25;
  const periodsToRender = data.slice(startIndex, endIndex)

  return (
    <Fragment>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <h1 className="phaseTable__main-heading">Token Distribution Dashboard</h1>
      <div className="phaseTableWrapper">
        <Table
          className="phaseTable"
          dataSource={periodsToRender}
          columns={tableColumns}
          pagination={false}
          rowClassName={(record) => record.phaseActive ? 'phaseTable__active-phase' : ''}
        />
      </div>
    </Fragment>
  )
}

export default PhaseTable
