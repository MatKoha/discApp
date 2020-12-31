import React from 'react';

function Addtable({ values, changeHandler}) {

        return (
            <table>
            <tbody>
              <tr>
                <td><input type="text" name="kiekko" placeholder="Kiekko" value={values.kiekko} onChange={changeHandler} /></td>
                <td><input type="text" name="valmistaja" placeholder="Valmistaja" value={values.valmistaja} onChange={changeHandler} /></td>
                <td><input type="text" name="vari" placeholder="Väri" value={values.vari} onChange={changeHandler} /></td>
                <td><input type="text" name="nimi" placeholder="Nimi" autoComplete="off" value={values.nimi} onChange={changeHandler} /></td>
                <td><input type="text" name="puhnro" placeholder="Puh. nro" autoComplete="off" value={values.puhnro} onChange={changeHandler} /></td>
                <td><button id="addButton">Lisää uusi</button></td>
              </tr>
            </tbody>
          </table>
        )
    
}

export default Addtable 