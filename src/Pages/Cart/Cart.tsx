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
import useFetch from "../../hooks/useFetch";
import { Suspense, useState } from "react";

const Cart = () => {
  const {
    data: cart = [],
    isPending,
    error,
  } = useFetch("http://localhost:8000/cart");

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);

  const indexOfLastPost = currentPage * ordersPerPage;
  const indexOfFirstPost = indexOfLastPost - ordersPerPage;
  const currentOrders = cart?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="container">
        <div className={classes.wrapper}>
          {error && <div>{error}</div>}
          {isPending && (
            <CircularProgress
              sx={{ width: "100px" }}
              color="inherit"
              className="spinner"
            />
          )}
          {cart && (
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentOrders.map((order) => (
                      <Order key={order.id} order={order} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={cart?.length}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Cart;
