import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../App.tsx";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <header className={classes.header}>
      <div className={classes.wrapper}>
        <div className={classes.topBlock}>
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
        <div>
          {theme.palette.mode} mode
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
