import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';

const Button = ({
  disabled,
  role,
  onClick,
}) => {

  const determineIcon = () => {
    if (role === 'delete') return "trash";
    if (role === 'edit') return "pen";
    if (role === 'add') return "plus";
  }
  return (
    <button className={`button ${role}`} type="button" onClick={onClick} disabled={disabled}>
      <FontAwesomeIcon icon={determineIcon()} />
    </button>
  )
}

export default Button;