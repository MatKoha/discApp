import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Button';

import './style.scss';

const TableSubHeader = ({
  handleAddClick,
  searchString,
  searchHandler,
}) => {

  return (
    <div className="tablesubheader">
      <div className="searchbar">
        <input
          type="text"
          onChange={searchHandler}
          value={searchString}
          placeholder="Search"
        />
        <FontAwesomeIcon icon="magnifying-glass" />
      </div>
      <Button role="add" onClick={handleAddClick} />
    </div>
  )
}

export default TableSubHeader;