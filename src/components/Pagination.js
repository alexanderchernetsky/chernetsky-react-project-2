import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  const {total_pages, total_results, page} = props.results;
  return (
      <React.Fragment>
        {total_results&&<p>Results found: {total_results}</p>}
        {page&&
        <p>
          {total_pages&&page !==1&&
          <span onClick={() => props.changePage(-1)} className="badge badge-secondary">previous</span>}
          Page: {page} from {total_pages}
          {total_pages&&total_pages !==1&&(page !== total_pages)&&
          <span onClick={() => props.changePage(1)} className="badge badge-secondary">next</span>}
        </p>}
      </React.Fragment>
  )
}

Pagination.propTypes = {
  changePage: PropTypes.func,
  results: PropTypes.shape({
    total_pages: PropTypes.number,
    page: PropTypes.number,
    total_results: PropTypes.number,
  })
};

export default Pagination;
