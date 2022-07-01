import React from 'react';

import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <img src="http://puskasoturit.com/sites/default/files/Tekstilogo_0.png" alt="logo" />
      <div className="title">Oletko hävittänyt frisbeegolfkiekkosi Espoon radoilla?</div>
      <div className="text">
        Espoon radoilta löytyy huima määrä kiekkoja, joiden omistajat ovat kateissa. Etsimmekin näille kiekoille omistajia.<br />
        Listalta löydät löydetyt kiekot, jotka ovat päätyneet Puskasotureiden löytökiekkoihin.<br />
        Kiekot ovat noudettavissa ennaltamäärättyinä ajankohtina, jotka ilmoitetaan Puskasotureiden Facebookissa.<br />
        Kiekkojen noutaminen on maksutonta, mutta halutessaan voi maksaa vapaaehtoisen löytöpalkkion. Löytöpalkkioiden tuotto käytetään junioritoiminnan kehittämiseen ja tukemiseen.<br />
        Voit käyttää sivun hakutoimintoa etsiäksesi haluttua kiekkoa, nimeä tai numeroa.
      </div>
    </div>
  )
}

export default Header;