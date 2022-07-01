import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputColor from 'react-input-color';
import API from '../../API';
import ButtonGroup from '../ButtonGroup';
import InputGroup from '../InputGroup';
import Spinner from '../Spinner';

import './style.scss';

const EditForm = ({ data, onClose, onSubmit }) => {
  const [editedData, setEditedData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [valid, setValid] = useState(true);
  const [highlightInvalid, setHighlightInvalid] = useState(false);

  useEffect(() => {
    const obj = {
      brand: {
        value: data.brand,
        valid: true,
      },
      mold: {
        value: data.mold,
        valid: true,
      },
      color: {
        value: data.color,
        valid: true,
      },
      condition: {
        value: data.condition,
        valid: true,
      },
      weight: {
        value: data.weight,
        valid: true,
      }
    }
    setEditedData(obj);
  }, []);

  const handleDataChange = (key, re) => e => {
    const obj = {
      value: e.target.value,
      valid: !!e.target.value.match(re),
    };
    const newData = { ...editedData }
    newData[key] = obj;
    setEditedData(newData);
    validateData(newData);
  }

  const validateData = obj => {
    let allValid = true;
    Object.keys(obj).forEach(key => {
      if (!obj[key].valid) {
        allValid = false;
      }
    });
    setValid(allValid);
  };

  const handleColorChange = e => {
    setEditedData({ ...editedData, color: { value: e.hex, valid: true } });
  }

  const handleSubmit = async () => {
    if (!valid) {
      setHighlightInvalid(true);
      return;
    }
    const obj = {};
    Object.keys(editedData).forEach(key => {
      obj[key] = editedData[key].value;
    });
    setBusy(true);
    await API.Disc.modify(data._id, obj);
    onSubmit();
  }

  return (
    <div className="createform">
      {!!editedData && (
        <>
          <InputGroup
            label="Manufacturer"
            value={editedData.brand.value}
            onChange={handleDataChange('brand', /\S{2,}/)}
            invalid={highlightInvalid && !editedData.brand.valid}
            id="brand"
            type="text"
          />
          <InputGroup
            label="Disc Mold"
            value={editedData.mold.value}
            onChange={handleDataChange('mold', /\S{2,}/)}
            invalid={highlightInvalid && !editedData.mold.valid}
            id="mold"
            type="text"
          />
          <div className="colorform">
            <label>Color</label>
            <InputColor
              initialValue={editedData.color.value}
              onChange={handleColorChange}
            />
          </div>
          <InputGroup
            label="Condition (1-10)"
            value={editedData.condition.value}
            onChange={handleDataChange('condition', /\b([1-9]|10)\b/)}
            invalid={highlightInvalid && !editedData.condition.valid}
            id="condition"
            type="number"
            min="1"
            max="10"
          />
          <InputGroup
            type="number"
            label="Weight (grams)"
            value={editedData.weight.value}
            onChange={handleDataChange('weight', /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$/)}
            invalid={highlightInvalid && !editedData.weight.valid}
            id="weight"
            min="1"
            max="200"
          />
          <Spinner show={busy} />
          {highlightInvalid && !valid &&
            <div className="validwarning">
              <FontAwesomeIcon icon="triangle-exclamation" />Please check the fields
            </div>
          }
          {highlightInvalid && !valid && !editedData.weight.valid &&
            <div className="validwarning">
              <FontAwesomeIcon icon="triangle-exclamation" />Weight must be between 1-200 grams
            </div>
          }
          {highlightInvalid && !valid && !editedData.condition.valid &&
            <div className="validwarning">
              <FontAwesomeIcon icon="triangle-exclamation" />Condition must be between 1-10
            </div>
          }
          <ButtonGroup onCancel={onClose} onSubmit={handleSubmit} />
        </>
      )}
    </div>
  )
}

export default EditForm;