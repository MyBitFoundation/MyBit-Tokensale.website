import React, { Fragment } from 'react'
import stylesheet from './contract-info.scss'

const MybContract = (props) => (
    <Fragment>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="mainContainer">
            <div className="mybContract">
                <h3 className="title">MYB Token Distribution Contract</h3>
                <a className="address" href="#">0xa7a13659692239c143dae313a011b5c18d26c</a>
            </div>
        </div>
    </Fragment>
)

export default MybContract