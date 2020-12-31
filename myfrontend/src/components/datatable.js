import React from 'react';

function Datatable({ items, search, kiekkoInput, valmistajaInput, variInput, nimiInput, puhnroInput, inEditMode, editChangeHandler, updateSubmitHandler, closeEdit, deleteDisc, editHandler }) {

    // Filtering search results
  let filteredItems = items.filter(
    (item) => {
      // Returning items based on search results, otherwise returning whole table
      return Object.keys(item).some(key => item[key].toString().toLowerCase().search(search.toLowerCase()) !== -1);
    }
  );

        return (
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
            </thead>
            <tbody>
            {/* Mapping through the items and placing them on a table. If going to the edit mode, input fields will be rendered on the selected table row, otherwise table will be displayed normally */}
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="kiekko" defaultValue={item.kiekko} ref={kiekkoInput} onChange={editChangeHandler}></input>) : item.kiekko}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="valmistaja" defaultValue={item.valmistaja} ref={valmistajaInput} onChange={editChangeHandler}></input>) : item.valmistaja}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="vari" defaultValue={item.vari} ref={variInput} onChange={editChangeHandler}></input>) : item.vari}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="nimi" defaultValue={item.nimi} ref={nimiInput} onChange={editChangeHandler}></input>) : item.nimi}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<input type="text" name="puhnro" defaultValue={item.puhnro} ref={puhnroInput} onChange={editChangeHandler}></input>) : item.puhnro}</td>
                <td>{item.pvm}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<span type="submit" id="ok"><i className="fa fa-check" onClick={updateSubmitHandler} title="Tallenna muutokset" /></span>) : <span className="edit" value={item} onClick={(e) => editHandler(item)}><i className="fa fa-edit" title="Muokkaa" /></span>}</td>
                <td>{inEditMode.status && inEditMode.rowKey === item._id ? (<span><i className="fa fa-close" onClick={closeEdit} title="Peruuta" /></span>) : <span value={item._id} onClick={(e) => { if (window.confirm('Haluatko varmasti poistaa tämän kohteen?')) deleteDisc(item) }} className="trash"><i className="fa fa-trash" title="Poista" /></span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )
    
}

export default Datatable 