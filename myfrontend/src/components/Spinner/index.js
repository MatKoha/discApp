import React from 'react';

import './style.scss';

const Spinner = ({ show, label }) => {

  if (!show) {
    return null;
  }
  return (
    <div className="spinner">{label}</div>
  )
}

export default Spinner;