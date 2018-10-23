import React from 'react';
import Link from 'next/link'
import PropTypes from 'prop-types';
import stylesheet from './footer.scss';
import { footerSections, socialsList, socialsIcons } from '../constants/footer-sections';

export const FooterList = ({ links }) => {
  return (
    <ul className="Footer__list">
      {
        links.map(link => (
          <li key={link.title}>
            {
              link.newTab ?
              (
                <a href={link.url} target="_blank" rel="noopener noreferrer"
                  className={`Footer__link ${link.inactive && 'Footer__link--is-inactive'}`}
                >
                  {link.title}
                </a>
              ) :
              (
                <Link href={link.url}>
                  <a rel="noopener noreferrer"
                    className={`Footer__link ${link.inactive && 'Footer__link--is-inactive'}`}
                  >
                    {link.title}
                  </a>
                </Link>
              )
             }
          </li>
        ))
      }
    </ul>)
};

export const MyBitFooter = () => {
  return (<Footer sections={footerSections} copyright='Copyright &copy; MyBit 2018. All Rights Reserved.' />)
}

export const Footer = ({ copyright, sections }) => {
  return (
    <footer className="Footer">
      <div className="mainContainer">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <div className="Footer__contentWrapper">
          <ul className="Footer__socialsList">
            {
              socialsList.map(icon => (
                <li key={icon.name}><a href={icon.url} target="_blank" rel="noopener noreferrer" className={icon.name}>{socialsIcons[icon.name]}</a></li>
              ))
            }
          </ul>
          {
            sections.map(section => (
              <div key={section.title} className={section.className ? "Footer__section " + section.className : "Footer__section"}>
                <h3 className="Footer__title">{section.title}</h3>
                <FooterList links={section.links} />
              </div>
              )
            )
          }
          <div className="Footer__companyInfo">
            <img src='/static/svgs/icons/mybit-full-white.svg' width='85px' className="Footer__logo" alt="myBit logo"/>
            <p>MyBit Foundation. Dammstrasse 16,</p>
            <p>6300 Zug, Switzerland.</p>
            <p>Registration no. CHE-177.186.963 </p>
            <p>
              <a className="Footer__link Footer__link--is-underlined" href="https://github.com/MyBitFoundation/MyBit.io/blob/develop/TOC.md" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
            </p>
          </div>
        </div>
        <div className="Footer__copyright">{copyright}</div>
      </div>
    </footer>)
};

FooterList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }))
};

FooterList.defaultProps = [];

Footer.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  })),
  copyright: PropTypes.string
}

Footer.defaultProps = [];
