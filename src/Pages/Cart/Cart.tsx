import classes from "./Cart.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Order from "./components/Order";
import Pagination from "../../components/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Suspense, useEffect, useState } from "react";
import { IInitialState } from "../../redux/Reducers.tsx";
import { fetchCart, removeItemFromCart } from "../../redux/thunks/cart.ts";
import { useAppDispatch, useAppSelector } from "../../redux/utils.ts";


const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const { items, isLoading, error } = useAppSelector((state:IInitialState) => state.cart);

  const dispatch = useAppDispatch();

  const indexOfLastPost = currentPage * ordersPerPage;
  const indexOfFirstPost = indexOfLastPost - ordersPerPage;
  const currentOrders = items?.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const removeOrder = (orderId: number) => {
    dispatch(removeItemFromCart(orderId));
  }

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch, items.length]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="container">
        <div className={classes.wrapper}>
          {error && <div>{error}</div>}
          {isLoading && (
            <CircularProgress
              sx={{ width: "100px" }}
              color="inherit"
              className="spinner"
            />
          )}
          {!items?.length && (
            <div className={classes.emptyCart}>No Products found</div>
          )}
          {items && (
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableTitle}>
                        Product ID
                      </TableCell>
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
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <Order
                        key={order.id}
                        order={order}
                        removeOrder={removeOrder}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={items?.length}
                paginate={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Cart;
