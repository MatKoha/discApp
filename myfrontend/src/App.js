import React, { useEffect, useState, useRef } from 'react';
import Datatable from './components/datatable'
import Addtable from './components/addtable'
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });
  // values for new discs
  const [values, setValues] = useState({
    kiekko: '',
    valmistaja: '',
    vari: '',
    nimi: '',
    puhnro: '',
  });
  // values for edited disc, to avoid conflicts
  const [editedValues, setEditedValues] = useState({
    kiekko: '',
    valmistaja: '',
    vari: '',
    nimi: '',
    puhnro: '',
  });
  // Creating refs for uncontrolled components. Refs will be used to get form values from the DOM
  const kiekkoInput = useRef();
  const valmistajaInput = useRef();
  const variInput = useRef();
  const nimiInput = useRef();
  const puhnroInput = useRef();

  // function to get all items from the database
  function getAllItems() {
    fetch('/api/getall', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      )
  }

  // Getting all items from the database  after rendering
  useEffect(() => {
    getAllItems()
  }, [])

  // Deleting disc by id
  const deleteDisc = item => {
    fetch('/api/delete/' + item._id, {
      method: 'delete',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Reloading the table after successful delete
        getAllItems()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Search state gets updated as the user types
  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  // Handling changes to input fields when adding new discs
  const changeHandler = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  // Adding a new disc to the database
  const submitHandler = (e) => {
    e.preventDefault();
    fetch('/api/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.alert(data);
        // Clearing the state to avoid conflicts with other input fields
        setValues({
          kiekko: '',
          valmistaja: '',
          vari: '',
          nimi: '',
          puhnro: ''
        })
        // Reloading the table after successful add
        getAllItems()
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Updating values as user types in edit mode
  const editChangeHandler = (e) => {
    e.persist();
    setEditedValues({
      kiekko: kiekkoInput.current.value,
      valmistaja: valmistajaInput.current.value,
      vari: variInput.current.value,
      nimi: nimiInput.current.value,
      puhnro: puhnroInput.current.value
    })
  };

  // Updating changes after editing the disc on the table
  const updateSubmitHandler = (e) => {
    e.preventDefault()
    var id = inEditMode.rowKey;
    fetch('/api/update/' + id, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedValues),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Reloading the table after successful edit
        getAllItems()
      })
      .catch((error) => {
        console.error(error);
      });
    // closing edit mode after updating
    closeEdit()
  }

  // Edit button enters edit mode
  const editHandler = (item) => {
    setInEditMode({
      status: true,
      rowKey: item._id
    })
    // Setting state as we enter edit mode, so we dont accidentaly submit empty values
    setEditedValues({
      kiekko: item.kiekko,
      valmistaja: item.valmistaja,
      vari: item.vari,
      nimi: item.nimi,
      puhnro: item.puhnro
    })
  }

  // close edit mode
  const closeEdit = (e) => {
    setInEditMode({
      status: false
    })
    // Clearing the state to avoid conflicts with other input fields
    setEditedValues({
      kiekko: '',
      valmistaja: '',
      vari: '',
      nimi: '',
      puhnro: ''
    })
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        {/* SEARCH BAR */}
        <input className="searchBar" type="search" placeholder="Hae..." value={search} onChange={updateSearch}></input>
        <div className="search"></div>
        {/* database items are displayed in this table */}
        <Datatable
        items={items}
        search={search}
        kiekkoInput={kiekkoInput}
        valmistajaInput={valmistajaInput}
        variInput={variInput}
        nimiInput={nimiInput}
        puhnroInput={puhnroInput}
        inEditMode={inEditMode}
        editChangeHandler={editChangeHandler}
        updateSubmitHandler={updateSubmitHandler}
        editHandler={editHandler}
        closeEdit={closeEdit}
        deleteDisc={deleteDisc}
        />
        {/* Table to add new items to the database */}
        <form onSubmit={submitHandler}>
          <Addtable
          values={values}
          changeHandler={changeHandler} />
        </form>
      </div >
    );
  }
}
export default App;