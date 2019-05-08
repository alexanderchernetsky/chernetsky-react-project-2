import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MyContext } from "./SearchPage";

function Pagination(props) {
  const context = useContext(MyContext);
  const { total_pages, page } = context.state.results;
  return (
    <React.Fragment>
      {page && (
        <p className="pb-1 mb-0 text-center">
          {total_pages && page !== 1 && (
            <span
              onClick={() => props.changePage(-1)}
              className="badge badge-primary"
            >
              previous
            </span>
          )}
          Page: {page} from {total_pages}
          {total_pages && total_pages !== 1 && page !== total_pages && (
            <span
              onClick={() => props.changePage(1)}
              className="badge badge-primary"
            >
              next
            </span>
          )}
        </p>
      )}
    </React.Fragment>
  );
}

Pagination.propTypes = {
  changePage: PropTypes.func,
  results: PropTypes.shape({
    total_pages: PropTypes.number,
    page: PropTypes.number
  })
};

export default Pagination;
