export default [{
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
        if(record.phaseActive) {
            return (<button className="phaseTable__active-phase-button">Contribute</button>)
        } else {
            return record.closed ?
            (<button onClick={() => {console.log(`Phase ${record.period} button clicked!`)}} className="phaseTable__closed-row-button">Claim</button>) :
            (<button onClick={() => {console.log(`Phase ${record.period} button clicked!`)}} className="phaseTable__active-row-button">Contribute</button>)
        }
    }
}];