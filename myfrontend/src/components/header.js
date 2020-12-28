import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img className="responsive" src="http://puskasoturit.com/sites/default/files/Tekstilogo_0.png"></img>
                <h1>Oletko hävittänyt frisbeegolfkiekkosi Espoon radoilla?</h1>
                <p>Espoon radoilta löytyy huima määrä kiekkoja, joiden omistajat ovat kateissa. Etsimmekin näille kiekoille omistajia.
                Listalta löydät löydetyt kiekot, jotka ovat päätyneet Puskasotureiden löytökiekkoihin.</p>
                <p>Kiekot ovat noudettavissa ennaltamäärättyinä ajankohtina, jotka ilmoitetaan Puskasotureiden Facebookissa.
                    Kiekkojen noutaminen on maksutonta, mutta halutessaan voi maksaa vapaaehtoisen löytöpalkkion. Löytöpalkkioiden tuotto käytetään junioritoiminnan kehittämiseen ja tukemiseen.</p>
                <p>Voit käyttää sivun hakutoimintoa etsiäksesi haluttua kiekkoa, nimeä tai numeroa.</p>
            </div>
        )
    }
}

export default Header 