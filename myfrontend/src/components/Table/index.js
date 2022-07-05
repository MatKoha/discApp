import React, { useEffect, useState, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import DataTable from 'react-data-table-component';
import Button from '../Button';
import TableSubHeader from '../TableSubHeader';

import './style.scss';

const Table = ({
  busy,
  data,
  handleRowSelected,
  handleAddClick,
  handleDeleteClick,
  handleEditClick,
  toggledClearRows,
}) => {
  const [searchString, setSearchString] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const searchHandler = e => setSearchString(e.target.value.toLowerCase());
  const isBigScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const columns = [
    {
      name: 'Date added',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'Manufacturer',
      selector: row => row.brand,
      sortable: true,
    },
    {
      name: 'Disc mold',
      selector: row => row.mold,
      sortable: true,
    },
    {
      name: 'Color',
      selector: row => <div className="colorbox" style={{ backgroundColor: row.color }} />,
    },
    {
      name: 'Condition',
      selector: row => row.condition,
      sortable: true,
    },
    {
      name: 'Weight (g)',
      selector: row => row.weight,
      sortable: true,
    },
  ];

  const contextActions = useMemo(() => {
    return (
      <div className="actionbuttons">
        <Button role="edit" onClick={handleEditClick} />
        <Button role="delete" onClick={handleDeleteClick} />
      </div>
    );

  }, [handleEditClick, handleDeleteClick]);

  useEffect(() => {
    const filtered = data.filter(disc => {
      return Object.keys(disc).some(key => disc[key].toString().toLowerCase().search(searchString) !== -1);
    })
    setFilteredData(filtered);
  }, [data, searchString]);

  return (
    <DataTable
      defaultSortFieldId={1}
      defaultSortAsc={false}
      progressPending={busy}
      striped
      title="MyBag"
      columns={columns}
      data={filteredData}
      selectableRows
      selectableRowsSingle
      selectableRowsHighlight
      pagination
      responsive
      onSelectedRowsChange={handleRowSelected}
      contextActions={contextActions}
      subHeader
      dense={!isBigScreen}
      subHeaderComponent={
        <TableSubHeader
          handleAddClick={handleAddClick}
          searchString={searchString}
          searchHandler={searchHandler}
        />}
      clearSelectedRows={toggledClearRows}
    />
  )
}

export default Table;