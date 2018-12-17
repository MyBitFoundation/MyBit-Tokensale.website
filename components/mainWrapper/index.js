class MainWrapper extends React.PureComponent{

  render(){
    return(
      <div className={this.props.mobileMenu ? 'MainWrapper__mobileMenu--is-open' : ''}>
        {this.props.children}
      </div>
    )
  }
};

export default MainWrapper;
