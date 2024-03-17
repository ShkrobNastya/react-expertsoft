import classes from "./Cart.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Order from "./components/Order";

const Cart = () => {
  return (
    <div className={classes.wrapper}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, fontSize: "22px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle}>Product ID</TableCell>
              <TableCell className={classes.tableTitle} align="right">
                Product Name
              </TableCell>
              <TableCell className={classes.tableTitle} align="right">
                Count
              </TableCell>
              <TableCell className={classes.tableTitle} align="right">
                Price
              </TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Order />
            <Order />
            <Order />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Cart;
