import Button from "@mui/material/Button";
import classes from "./Pagination.module.scss";

const Pagination = ({ ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Button onClick={() => paginate(number)} variant="contained">
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
