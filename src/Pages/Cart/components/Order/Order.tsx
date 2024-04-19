import classes from "./Order.module.scss";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import OrderType from "../../../../models/Order.model.tsx";
import ClearIcon from "@mui/icons-material/Clear";

interface OrderProps {
  order: OrderType;
  removeOrder: (orderId: number) => void;
}

const Order = ({ order, removeOrder }: OrderProps) => {
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
      <TableCell
        align="right"
        className={classes.crossButton}
        onClick={() => removeOrder(order.id)}
      >
        <ClearIcon />
      </TableCell>
    </TableRow>
  );
};

export default Order;
