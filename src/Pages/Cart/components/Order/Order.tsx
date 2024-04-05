import classes from "./Order.module.scss";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const Order = ({ order }) => {
  return (
    <TableRow
      className={classes.wrapper}
      key="sss"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className={classes.orderNumber} scope="row">
        {order.id}
      </TableCell>
      <TableCell align="right">{order.title}</TableCell>
      <TableCell align="right">{order.count}</TableCell>
      <TableCell align="right">{order.price}</TableCell>
      <TableCell align="right">{order.count * order.price}</TableCell>
    </TableRow>
  );
};

export default Order;
