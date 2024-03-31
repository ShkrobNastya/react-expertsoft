import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>Brand Logo</div>
        <ul className={classes.links}>
          <li className={classes.link}>
            <Link to="/">Products</Link>
          </li>
          <li className={classes.link}>
            <Link to="/cart">Cart</Link>
          </li>
          <li className={classes.link}>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
