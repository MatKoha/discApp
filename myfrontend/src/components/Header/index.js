import React from 'react';

import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="title">The ultimate fribApp</div>
      <div className="text">
        This is a frisbeegolf (also known as <a href="https://en.wikipedia.org/wiki/Disc_golf" target="_blank">disc golf</a>) related full stack app. <br />
        The database has been implemented using MongoDB. Back-end with nodeJS + express. The front-end was built with React. <br />
        Feel free to add, edit and remove items from "myBag".
      </div>
    </div>
  )
}

export default Header;