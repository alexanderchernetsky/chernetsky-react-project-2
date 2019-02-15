import React from 'react';
import PropTypes from 'prop-types';

const SortForm = (props) => {
  return (
      <form className="pb-1 text-center">
        <span>Sort by: date</span><input type="radio" name="sort" value="date" onClick={props.setSorting}/>
        {' '}
        <span>vote average</span><input type="radio" name="sort" value="vote_average" onClick={props.setSorting}/>
        {' '}
        <span>no</span><input type="radio" name="sort" value="no" defaultChecked onClick={props.setSorting}/>
      </form>
  )
};

SortForm.propTypes = {
  setSorting: PropTypes.func,
};

export default SortForm;