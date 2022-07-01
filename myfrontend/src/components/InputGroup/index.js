import React, { useEffect } from 'react';

import './style.scss';

const InputGroup = ({
  label,
  value,
  type,
  onChange,
  invalid,
  id,
  min,
  max,
}) => {

  const cns = ['inputgroup'];
  if (invalid) {
    cns.push('invalid');
  }

  useEffect(() => {
    if (invalid) {
      document.getElementById(id).focus();
    }
  }, [invalid]);

  return (
    <div className={cns.filter(i => i).join(' ')}>
      <label>{label}</label>
      <input value={value} type={type} onChange={onChange} id={id} max={max} min={min} />
    </div>
  )
}

export default InputGroup;