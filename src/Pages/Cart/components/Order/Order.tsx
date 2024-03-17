import classes from "./Order.module.scss";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const Order = () => {
  return (
    <TableRow
      className={classes.wrapper}
      key="sss"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className={classes.orderNumber} scope="row">
        lala
      </TableCell>
      <TableCell align="right">11</TableCell>
      <TableCell align="right">dd</TableCell>
      <TableCell align="right">ds</TableCell>
      <TableCell align="right">32</TableCell>
    </TableRow>
  );
};

export default Order;
