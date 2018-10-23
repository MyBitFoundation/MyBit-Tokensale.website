import AppInfoContext from './AppInfoContext';

class AppInfo extends React.Component {
  constructor(props){
    super(props);
    this.handleClickMobileMenu = this.handleClickMobileMenu.bind(this);
    this.state = {
      mobileMenu: false,
      handleClickMobileMenu: this.handleClickMobileMenu,
    };
  }

  handleClickMobileMenu(mobileMenu){
    this.setState({mobileMenu})
  }

  render(){
    return(
      <AppInfoContext.Provider value={this.state}>
        {this.props.children}
      </AppInfoContext.Provider>
    )
  }
};

export default AppInfo;
