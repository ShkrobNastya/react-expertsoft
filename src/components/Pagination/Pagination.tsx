import Button from "@mui/material/Button";
import classes from "./Pagination.module.scss";

interface PaginationProps {
  ordersPerPage: number;
  totalOrders: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <Button
              onClick={() => paginate(number)}
              className={number === currentPage ? classes.activePage : ''}
              variant="contained"
            >
              {number}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
