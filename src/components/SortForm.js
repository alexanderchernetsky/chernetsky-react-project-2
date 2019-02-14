import React from 'react';

const SortForm = (props) => {
  return (
      <form>
        <span>Sort by: date</span><input type="radio" name="sort" value="date" onClick={props.setSorting}/>
        {' '}
        <span>vote average</span><input type="radio" name="sort" value="vote_average" onClick={props.setSorting}/>
        {' '}
        <span>no</span><input type="radio" name="sort" value="no" defaultChecked onClick={props.setSorting}/>
      </form>
  )
};

export default SortForm;