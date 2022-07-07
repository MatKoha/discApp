import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import Table from '../Table';
import CreateForm from '../CreateForm';
import EditForm from '../EditForm';
import DeleteForm from '../DeleteForm';
import API from '../../API';
import './style.scss';

const Index = () => {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      const result = await API.Disc.list();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error);
      }
      setFetching(false);
    };
    if (fetching) {
      asyncFunc();
    }
  }, [fetching]);


  const handleRowSelected = rows => setSelectedRows(rows.selectedRows);
  const handleEditClick = () => setEditing(!editing);
  const handleAddClick = () => setCreating(!creating);
  const handleDeleteClick = () => setDeleting(!deleting);
  const handleClearRows = () => setToggleClearRows(!toggledClearRows);

  const handleCompleteEdit = () => {
    setSelectedRows([]);
    handleClearRows();
    setEditing(false);
    setFetching(true);
  }

  const handleCompleteRemoval = () => {
    handleClearRows();
    setSelectedRows([]);
    setFetching(true);
    setDeleting(false);
  }

  const handleCompleteCreate = () => {
    setFetching(true);
    setCreating(false);
  }


  return (
    <div className="index">
      <div className="intro">
        This is a frisbeegolf (also known as <a href="https://en.wikipedia.org/wiki/Disc_golf" target="_blank">disc golf</a>) related full stack app.
        The following tools were used:<br /><br />
        <div className="row">
          <div className="title">Database:</div>
          <div className="text">MongoDB</div>
        </div>
        <div className="row">
          <div className="title">Back-end:</div>
          <div className="text">NodeJS + express</div>
        </div>
        <div className="row">
          <div className="title">Front-end:</div>
          <div className="text">React.js</div>
        </div>
        <div className="row">
          <div className="title">Git Repo:</div>
          <div className="text"><a href="https://github.com/MatKoha/discApp" target="_blank">https://github.com/MatKoha/discApp</a></div>
        </div>
        Feel free to add, edit and remove items from "myBag".
      </div>
      <Modal show={editing} onCancel={() => setEditing(false)} title="Edit disc">
        <EditForm
          data={selectedRows[0]}
          onClose={handleEditClick}
          onSubmit={handleCompleteEdit}
        />
      </Modal>
      <Modal show={creating} title="Add a new disc">
        <CreateForm
          onClose={handleAddClick}
          onSubmit={handleCompleteCreate}
        />
      </Modal>
      <Modal show={deleting} title="Disc removal">
        <DeleteForm
          onClose={handleDeleteClick}
          data={selectedRows[0]}
          onSubmit={handleCompleteRemoval}
        />
      </Modal>
      {error && error}
      <Table
        busy={fetching}
        data={data}
        selectedRows={selectedRows}
        toggledClearRows={toggledClearRows}
        handleRowSelected={handleRowSelected}
        handleAddClick={handleAddClick}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />
    </div>
  )
}

export default Index;