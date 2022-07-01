import React from 'react';

import './style.scss';

const ButtonGroup = ({
  onCancel,
  onSubmit
}) => {

  return (
    <div className="buttongroup">
      <button className="cancel" onClick={onCancel}>Cancel</button>
      <button className="confirm" onClick={onSubmit}>Confirm</button>
    </div>
  )
}

export default ButtonGroup;