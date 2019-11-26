import React from 'react';
import '../../App.css';
import SelectEvents from './SelectEvents'
import { TextField } from '@material-ui/core';



export default function Home() {



    return (
        <main className="main">
            <div className='event'>
                <div>
                    <h3>Select Events</h3>
                    <SelectEvents />
                </div>
                <div>
                    <h3>Select Date</h3>
                    <form noValidate>
                        <TextField
                            id="date"
                            type="date"
                            className='date-select'
                            defaultValue="2019-09-01"
                        />
                    </form>
                </div>
                <div>
                    <h3>Your Location</h3>
                    <form noValidate>
                        <TextField
                            id="location"
                            type="text"
                            className='date-select'
                        />
                    </form>
                </div>
            </div>
        </main>
    );
}