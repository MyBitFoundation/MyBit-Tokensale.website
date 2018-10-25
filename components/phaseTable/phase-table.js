import React, { Fragment } from 'react'
import stylesheet from './phase-table.scss'
import { Table } from 'antd'
import columnData from './tableHead'
import dummyData from './dummyData'

const PhaseTable = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="phaseTableWrapper">
          <Table 
            className="phaseTable"
            dataSource={dummyData} 
            columns={columnData} 
            pagination={false} 
            rowClassName={(record) => record.phaseActive ? 'phaseTable__active-phase' : ''} 
          />
        </div>
    </Fragment>
)

export default PhaseTable
