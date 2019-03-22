import React, { Fragment } from 'react'
import stylesheet from './footerSimplified.scss'

const FooterSimplified = () => (
  <Fragment>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <footer className="FooterSimplified">
      <p className="FooterSimplified__text">Copyright © MyBit Foundation 2019. All Rights Reserved.</p>
    </footer>
  </Fragment>
)

export default FooterSimplified;
