import { testAlphaUrl } from './';
import { links } from '../constants/links';

export const mobileMenu = [{
    name: "Developer",
    path: { url: links.devs },
    external: true,
  },{
    name: "Fund",
    path: { url: links.fund }
  },{
    name: "Applications",
    path: { url: links.applications }
  },{
    name: "Resources",
    dropdown: true,
    menuItems: [
      {name: "Token Distribution", url: links.tokenSale, external:true},
      {name: "Whitepaper", url: links.whitepaper, external:true},
      {name: "Github", url: links.github, external:true}
    ]
  },{
    name: "About",
    dropdown: true,
    menuItems: [
      {name: "Company", url: links.aboutPage},
      {name: "Token", url: links.token},
      {name: "Blog", url: links.medium, external:true}
    ]
  },
  ,{
    name: "Go to DDF",
    button: true,
    path: { url: links.ddf, external: true }
    }
];

/*TODO: update path*/
export const headerMenu = [{
    name: "Developer",
    path: "http://developer.mybit.io/",
    external: true,
  },{
    name: "Fund",
    path: links.fund
  },{
    name: "Applications",
    path: links.applications
}];

export const resourcesDropDown = [
  {
    name: "Token Distribution",
    external: true,
    path: links.tokenSale
  },{
    name: "Whitepaper",
    external: true,
    path: "https://mybit.io/whitepaperv2.0"
  },{
    name: "Github",
    external: true,
    path: "https://github.com/MyBitFoundation/",
    external: true
}];

export const aboutDropDown = [
  {
    name: "Company",
    external: false,
    path: links.aboutPage
  },{
    name: "Token",
    external: false,
    path: links.token
  },{
    name: "Blog",
    external: true,
    path: "https://medium.com/mybit-dapp",
    external: true
}];

export const headerMenuDropDown = [{
    name: "Resources",
    path: links.aboutPage,
    list: resourcesDropDown
  },{
    name: "About",
    path: links.aboutPage,
    list: aboutDropDown
}];


export const headerMenuLanguage = {
  en: {
    name: "Eng",
  },
  cn: {
    name: "中文",
  }
}

export const headerMenuButton =
  {
    name: "Go to DDF",
    url: "https://ddf.mybit.io",
    external: true
  }
