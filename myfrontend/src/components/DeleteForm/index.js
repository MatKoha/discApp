import React, { useState } from 'react';
import API from '../../API';
import ButtonGroup from '../ButtonGroup';
import Spinner from '../Spinner';

import './style.scss';

const DeleteForm = ({ data, onClose, onSubmit }) => {
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    setBusy(true);
    await API.Disc.remove(data._id);
    onSubmit();
  }

  return (
    <div className="createform">
      <div>Are you sure you want to delete the selected disc?</div>
      <Spinner show={busy} />
      <ButtonGroup onCancel={onClose} onSubmit={handleSubmit} />
    </div>
  )
}

export default DeleteForm;