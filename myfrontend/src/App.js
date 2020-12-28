import React, { useEffect, useState, useRef } from 'react';
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

  // Getting all items from the database
  useEffect(() => {
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
  }, [])

  // Deleting disc by id
  const deleteDisc = index => {
    var id = items[index]._id
    fetch('http://localhost:5000/api/delete/' + id, {
      method: 'delete',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // removing deleted item and updating table
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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
    fetch('http://localhost:5000/api/add', {
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
        fetch('http://localhost:5000/api/getall', {
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
    fetch('http://localhost:5000/api/update/' + id, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedValues),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Reloading the table after successful edit
        fetch('http://localhost:5000/api/getall', {
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
      })
      .catch((error) => {
        console.error(error);
      });
    // closing edit mode after updating
    closeEdit()
  }

  // Edit button enters edit mode
  const editHandler = index => {
    setInEditMode({
      status: true,
      rowKey: items[index]._id
    })
    // Setting state as we enter edit mode, so we dont accidentaly submit empty values
    setEditedValues({
      kiekko: items[index].kiekko,
      valmistaja: items[index].valmistaja,
      vari: items[index].vari,
      nimi: items[index].nimi,
      puhnro: items[index].puhnro
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

  // Filtering search results
  let filteredItems = items.filter(
    (item) => {
      // Returning items based on search results, otherwise returning whole table
      return Object.keys(item).some(key => item[key].toString().toLowerCase().search(search.toLowerCase()) !== -1);
    }
  );

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
        <table>
          <thead>
            <tr>
              {/* Adding table headers to the table */}
              <th>Kiekko</th>
              <th>Valmistaja</th>
              <th>Väri</th>
              <th>Nimi</th>
              <th>Puh. Nro</th>
              <th>Lisätty</th>
              <th></th>
              <th></th>
            </tr>
            {/* Mapping through the items and placing them on a table. If going to the edit mode, input fields will be rendered on the selected table row, otherwise table will be displayed normally */}
            {filteredItems.map((item, index) => (
              <tr key={item._id}>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="kiekko" defaultValue={item.kiekko} ref={kiekkoInput} onChange={editChangeHandler}></input>) : item.kiekko}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="valmistaja" defaultValue={item.valmistaja} ref={valmistajaInput} onChange={editChangeHandler}></input>) : item.valmistaja}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="vari" defaultValue={item.vari} ref={variInput} onChange={editChangeHandler}></input>) : item.vari}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="nimi" defaultValue={item.nimi} ref={nimiInput} onChange={editChangeHandler}></input>) : item.nimi}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="puhnro" defaultValue={item.puhnro} ref={puhnroInput} onChange={editChangeHandler}></input>) : item.puhnro}</td>
                <td>{item.pvm}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<span type="submit" id="ok"><i className="fa fa-check" onClick={updateSubmitHandler} title="Tallenna muutokset" /></span>) : <span id="edit" onClick={() => editHandler(index)}><i className="fa fa-edit" title="Muokkaa" /></span>}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<span><i className="fa fa-close" onClick={closeEdit} title="Peruuta" /></span>) : <span value={item._id} onClick={(e) => { if (window.confirm('Haluatko varmasti poistaa tämän kohteen?')) deleteDisc(index) }} id="trash"><i className="fa fa-trash" title="Poista" /></span>}</td>
              </tr>
            ))}
          </thead>
        </table>
        {/* Input fields to add new discs to the database. Handled by changeHandler */}
        <form onSubmit={submitHandler} id="myForm">
          <table>
            <thead>
              <tr>
                <td><input required type="text" name="kiekko" placeholder="Kiekko" value={values.kiekko} onChange={changeHandler} /></td>
                <td><input required type="text" name="valmistaja" placeholder="Valmistaja" value={values.valmistaja} onChange={changeHandler} /></td>
                <td><input required type="text" name="vari" placeholder="Väri" value={values.vari} onChange={changeHandler} /></td>
                <td><input required type="text" name="nimi" placeholder="Nimi" autoComplete="off" value={values.nimi} onChange={changeHandler} /></td>
                <td><input required type="text" name="puhnro" placeholder="Puh. nro" autoComplete="off" value={values.puhnro} onChange={changeHandler} /></td>
                <td><button id="addButton">Lisää uusi</button></td>
              </tr>
            </thead>
          </table>
        </form>
      </div >
    );
  }
}
export default App;