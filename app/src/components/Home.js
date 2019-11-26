import React from 'react';
import logo from '../junction.png';
import businessFinland from '../businessFinland.png';
import '../App.css';



export default function Home() {

    return (
        <main className="main">
            <img src={logo} className="App-logo" alt="logo" />
            <a
                className="App-link"
                href="https://www.hackjunction.com/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Junction 2019
            </a>
            <img src={businessFinland} className="businessFinland-logo" alt="logo" />
            <p>
                The <code>DNA</code> of Helsinki.
            </p>
            <div className='team'>
                <p >
                    Mateusz Gierlach, Moritz Lange, Andres Huertas, Stanislav Bondarenko, Steve Phuc
                </p>
                <p className='copyright'>GeoRelations © CrowdControl 2019</p>
            </div>
        </main>
    );
}