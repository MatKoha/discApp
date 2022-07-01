import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputColor from 'react-input-color';
import API from '../../API';
import ButtonGroup from '../ButtonGroup';
import Spinner from '../Spinner';
import InputGroup from '../InputGroup';

import './style.scss';

const CreateForm = ({ onClose, onSubmit }) => {
  const [busy, setBusy] = useState(false);
  const [valid, setValid] = useState(false);
  const [highlightInvalid, setHighlightInvalid] = useState(false);
  const [data, setData] = useState({
    brand: {
      value: '',
      valid: false,
    },
    mold: {
      value: '',
      valid: false,
    },
    color: {
      value: '#5e72e4',
      valid: true,
    },
    condition: {
      value: 10,
      valid: true,
    },
    weight: {
      value: 175,
      valid: true,
    }
  })

  const handleDataChange = (key, re) => e => {
    const obj = {};
    if (key === 'weight' || key === 'condition') {
      obj.value = parseInt(e.target.value, 10);
      // obj.valid = !!(parseInt(e.target.value, 10)).match(re);
    } else {
      obj.value = e.target.value;
    }
    obj.valid = !!e.target.value.match(re);
    const newData = { ...data }
    newData[key] = obj;
    setData(newData);
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
    setData({ ...data, color: { value: e.hex, valid: true } });
  }

  // Adding a new disc to the database
  const handleSubmit = async () => {
    if (!valid) {
      setHighlightInvalid(true);
      return;
    }
    const obj = {};
    Object.keys(data).forEach(key => {
      obj[key] = data[key].value;
    });
    setBusy(true);
    await API.Disc.add(obj);
    onSubmit();
  };

  return (
    <div className="createform">
      <InputGroup
        label="Manufacturer"
        value={data.brand.value}
        onChange={handleDataChange('brand', /\S{2,}/)}
        invalid={highlightInvalid && !data.brand.valid}
        id="brand"
        type="text"
      />
      <InputGroup
        label="Disc Mold"
        value={data.mold.value}
        onChange={handleDataChange('mold', /\S{2,}/)}
        invalid={highlightInvalid && !data.mold.valid}
        id="mold"
        type="text"
      />
      <div className="colorform">
        <label>Color</label>
        <InputColor
          initialValue={data.color.value}
          onChange={handleColorChange}
        />
      </div>
      <InputGroup
        label="Condition (1-10)"
        value={data.condition.value}
        onChange={handleDataChange('condition', /\b([1-9]|10)\b/)}
        invalid={highlightInvalid && !data.condition.valid}
        id="condition"
        type="number"
        min="1"
        max="10"
      />
      <InputGroup
        label="Weight (grams)"
        value={data.weight.value}
        onChange={handleDataChange('weight', /^([1-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$/)}
        invalid={highlightInvalid && !data.weight.valid}
        id="weight"
        type="number"
        min="1"
        max="200"
      />
      <Spinner show={busy} />
      {highlightInvalid && !valid &&
        <div className="validwarning">
          <FontAwesomeIcon icon="triangle-exclamation" />Please check the fields
        </div>
      }
      {highlightInvalid && !valid && !data.weight.valid &&
        <div className="validwarning">
          <FontAwesomeIcon icon="triangle-exclamation" />Weight must be between 1-200 grams
        </div>
      }
      {highlightInvalid && !valid && !data.condition.valid &&
        <div className="validwarning">
          <FontAwesomeIcon icon="triangle-exclamation" />Condition must be between 1-10
        </div>
      }
      <ButtonGroup onCancel={onClose} onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateForm;