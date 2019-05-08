import React, { useContext } from 'react';
import SortForm from "./SortForm";
import Pagination from "./Pagination";
import { MyContext } from "./SearchPage";

const PaginationAndSorting = props => {
  const context = useContext(MyContext);
  return (
      <React.Fragment>
        <div className="col-12 col-md-3 col-xl-4">
          {context.state.total_results ? (
              <p className="pb-1 mb-0 text-center">
                Results found: {context.state.total_results}
              </p>
          ) : null}
        </div>
        <div className="col-12 col-md-3 col-xl-4">
          <Pagination changePage={props.changePage}/>
        </div>
        <div className="col-12 col-md-6 col-xl-4">
          <SortForm setSorting={props.setSorting} />
        </div>
      </React.Fragment>
  )
};

export default PaginationAndSorting;
