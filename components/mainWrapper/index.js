const MainWrapper = ({mobileMenu, children}) => (
  <div className={mobileMenu ? 'MainWrapper__mobileMenu--is-open' : ''}>
    {children}
  </div>
)

export default MainWrapper;
