import React from 'react';

import './style.scss';

const Modal = ({
  children,
  title,
  show,
}) => {

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="inner">
        {title !== null && <h2>{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
