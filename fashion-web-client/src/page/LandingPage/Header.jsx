import "../../assets/css/LandingPageHeader.css";
import CartIcon from "../../components/CartIcon";
function Header(props) {
  //const user = useSelector(getUser);

  return (
    <header className="landing-page-header">
      {/* Header */}
      <div className="container-1139">
        <div className="header-logo">LOGO</div>
        <ul className="menu">
          <li className="menu-item">
            <a href="#top" className="menu-link">
              MEN
            </a>
          </li>
          <li className="menu-item">
            <a href="#top" className="menu-link">
              WOMEN
            </a>
          </li>
          <li className="menu-item">
            <a href="#top" className="menu-link">
              KID
            </a>
          </li>
          <li className="menu-item">
            <a href="#top" className="menu-link">
              COLLECTION
            </a>
          </li>
          <li className="menu-item">
            <a href="#top" className="menu-link">
              TRENS
            </a>
          </li>
        </ul>
        <div className="header-auth">
          <CartIcon style={{ width: "25px", height: "25px", color: "white" }} />
        </div>
      </div>
    </header>
  );
}
export default Header;
