import Link from "@mui/material/Link";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.logo}>Brand Logo</div>
        <ul className={classes.links}>
          <li className={classes.link}>
            <Link href="#" underline="none">
              Products
            </Link>
          </li>
          <li className={classes.link}>
            <Link href="#" underline="none">
              Cart
            </Link>
          </li>
          <li className={classes.link}>
            <Link href="#" underline="none">
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
