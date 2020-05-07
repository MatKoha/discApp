import React from 'react'

const Contacts = ({ discs }) => {
    return (
        <div>
            <center><h1>Contact List</h1></center>
            {discs.map((discs) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{discs.valmistaja}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{discs.malli}</h6>
                        <p class="card-text">{discs.paino}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Contacts