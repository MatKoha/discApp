import React from 'react';
import './App.css';
import Popup from "reactjs-popup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateSubmitHandler = this.updateSubmitHandler.bind(this);
    // Creating refs for uncontrolled components
    this.kiekkoInput = React.createRef();
    this.valmistajaInput = React.createRef();
    this.variInput = React.createRef();
    this.nimiInput = React.createRef();
    this.puhnroInput = React.createRef();
    // Setting state
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      kiekko: '',
      valmistaja: '',
      vari: '',
      nimi: '',
      puhnro: '',
      search: '',
    };
  }

  // Getting all items from the database
  componentDidMount() {
    fetch("/api/getall")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          })
          // Printing the results to the console
          console.log(result);
        },
        // Handling errors
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
          console.log(error);
        }
      )
  }

  // Deletes one discs by id
  // Each Delete button has an id value set
  // The function retrieves the id when the button is clicked and inserts the id into the url address. 
  // Example: delete/5eb1a1763c95c0291846603d

  deleteDisc = (e) => {
    // Retrieving the ID of the disc
    var id = e.currentTarget.getAttribute("value");
    fetch('/api/delete/' + id, {
      method: 'delete',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Updating the table
        fetch("/api/getall")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              })
              // Printing the results to the console
              console.log(result);
            },
            // Handling errors
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              console.log(error);
            }
          )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Finding disc by id. Currently not in use
  // findDisc = (e) => {
  //   var id = e.currentTarget.getAttribute("value");
  //   fetch('http://localhost:5000/api/get/' + id, {
  //     method: 'get',
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  // Updating one disc by ID
  // ID value is found when clicking "Edit" and is then inserted into the address
  // Example: update/5eb1a1763c95c0291846603d
  updateSubmitHandler = (e) => {
    e.preventDefault()
    // Retrieving the ID of the disc
    var id = e.currentTarget.getAttribute("value");
    console.log(this.state)
    // Setting the values of the input fields to State
    this.setState({
      kiekko: this.kiekkoInput.current.value,
      valmistaja: this.valmistajaInput.current.value,
      vari: this.variInput.current.value,
      nimi: this.nimiInput.current.value,
      puhnro: this.puhnroInput.current.value
    }, function () {
      fetch('/api/update/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          window.alert(data);
          // Clearing the state to avoid conflicts with other input fields
          this.setState({
            kiekko: '',
            valmistaja: '',
            vari: '',
            nimi: '',
            puhnro: ''
          })
          // Updating the table
          fetch("/api/getall")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                })
                // Printing the results to the console
                console.log(result);
              },
              // Handling errors
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
                console.log(error);
              }
            )
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  // Updating the searchable item as the user types
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  // Adding data from input fields to State when submitting the form
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // Adding a disc to the database when submitting the form
  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    fetch('/api/add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.alert(data);
        // Clearing the state to avoid conflicts with other input fields
        this.setState({
          kiekko: '',
          valmistaja: '',
          vari: '',
          nimi: '',
          puhnro: ''
        })
        // Updating the table after successful add
        fetch("/api/getall")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              })

              // Printing the results to the console
              console.log(result);
            },
            // Handling errors
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              console.log(error);
            }
          )
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Toggles the "add new" button
  Toggle = (e) => [
    this.setState({ on: !this.state.on })
  ]


  render() {
    const { error, isLoaded, items, kiekko, valmistaja, vari, nimi, puhnro } = this.state;
    let filteredItems = items.filter(
      (item) => {
        // Returning items based on search results, otherwise returning whole table
        return Object.keys(item).some(key => item[key].toString().toLowerCase().search(this.state.search.toLowerCase()) !== -1);
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
          {/* this.state.search gets updated onChange, so the table updates instantly */}
          <input className="searchBar" type="search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder="Hae..."
          ></input>
          <div className="search"></div>
          <div>
            {/* Add new - button. Form is not visible, but is toggled when clicking the button */}
            <button className="toggle" onClick={this.Toggle}>Uusi +</button>
            {this.state.on && (
              <div className="container">
                <form onSubmit={this.submitHandler}>
                  <div className="row">
                    <div className="col-25">
                      <label>Kiekko</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        name="kiekko"
                        value={kiekko}
                        placeholder="Kiekko"
                        onChange={this.changeHandler}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Valmistaja</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        name="valmistaja"
                        value={valmistaja}
                        placeholder="Valmistaja"
                        onChange={this.changeHandler}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Väri</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        name="vari"
                        value={vari}
                        placeholder="Väri"
                        onChange={this.changeHandler}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Nimi</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        name="nimi"
                        value={nimi}
                        placeholder="Nimi"
                        onChange={this.changeHandler}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-25">
                      <label>Puh. Nro</label>
                    </div>
                    <div className="col-75">
                      <input
                        type="text"
                        name="puhnro"
                        value={puhnro}
                        placeholder="Puhelinnro"
                        onChange={this.changeHandler}
                      ></input>
                    </div>
                  </div>
                  <div className="row">
                    <button className="addNew" type="submit">Lisää uusi kiekko</button>
                    <button className="cancel" onClick={this.Toggle}>Sulje</button>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Add new - form ends here */}
          {/* Displaying items from the database */}
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
              {/* Looping through the items and inserting them to the table */}
              {filteredItems.map(item => (
                <tr key={item._id} id={item._id}>
                  <td data-label="Kiekko">{item.kiekko} </td>
                  <td data-label="Valmistaja">{item.valmistaja}</td>
                  <td data-label="Väri">{item.vari}</td>
                  <td data-label="Nimi">{item.nimi}</td>
                  <td data-label="Puh. Nro">{item.puhnro}</td>
                  <td data-label="Lisätty pvm">{item.pvm}</td>
                  {/* Edit button. It opens a poput window, so the user can edit discs */}
                  <td data-label="Muokkaa"><Popup trigger={<span id="edit"><i className="fa fa-edit" /></span>} modal>
                    {close => (
                      <div className="container">
                        <span className="close" onClick={close}>&times;</span>
                        {/* Submitting the form calls updateSubmitHandler function */}
                        <form value={item._id} onSubmit={this.updateSubmitHandler}>
                          <div className="row">
                            <div className="col-25">
                              <label>Kiekko</label>
                            </div>
                            <div className="col-75">
                              <input
                                type="text"
                                name="kiekko"
                                // The input fields have default values set, so user doesn't have to write every value again
                                defaultValue={item.kiekko}
                                // Using ref to get form values from the DOM, instead of using event handlers
                                // Default values caused issues, so we have to use uncontrolled components to handle forms
                                ref={this.kiekkoInput}
                              >
                              </input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-25">
                              <label>Valmistaja</label>
                            </div>
                            <div className="col-75">
                              <input
                                type="text"
                                name="valmistaja"
                                defaultValue={item.valmistaja}
                                ref={this.valmistajaInput}
                              >
                              </input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-25">
                              <label>Väri</label>
                            </div>
                            <div className="col-75">
                              <input
                                type="text"
                                name="vari"
                                defaultValue={item.vari}
                                ref={this.variInput}
                              >
                              </input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-25">
                              <label>Nimi</label>
                            </div>
                            <div className="col-75">
                              <input
                                type="text"
                                name="nimi"
                                defaultValue={item.nimi}
                                ref={this.nimiInput}
                              >
                              </input>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-25">
                              <label>PuhNro</label>
                            </div>
                            <div className="col-75">
                              <input
                                type="text"
                                name="puhnro"
                                defaultValue={item.puhnro}
                                ref={this.puhnroInput}
                              >
                              </input>
                            </div>
                          </div>
                          <div className="row">
                            <button className="addNew" value={item._id} type="submit">Päivitä</button>
                          </div>
                        </form>
                        <button className="cancel" onClick={() => { close(); }}>Sulje Ikkuna</button>
                      </div>
                    )}
                  </Popup>
                    {/* Edit -popup window ends here */}
                  </td>
                  {/* Delete button */}
                  <td data-label="Poista"><span value={item._id} onClick={(e) => { if (window.confirm('Haluatko varmasti poistaa tämän kohteen?')) this.deleteDisc(e) }} id="trash"><i className="fa fa-trash" /></span></td>
                </tr>
              ))}
            </thead>
          </table>
        </div >
      );
    }
  }
}
export default App;