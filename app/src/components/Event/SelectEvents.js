import React, { useState } from 'react';
import Select from 'react-select';
import data from '../../data/events.json'
import Moment from 'react-moment';



export default () => {
    const [event, setEvent] = useState()
    const handleChange = (select) => {
        console.log(select);
        setEvent(select)
    }
    return (
        <>
            < Select
                className='event-select'
                placeholder='Find Event'
                onChange={handleChange}
                isSearchable
                options={data}
            />
            {event &&
                <div>
                    <p>Event: {event.label}</p>
                    <p>Street: {event.street_adr}</p>
                    <p>Date:{' '}
                        <Moment format="HH:MM DD/MM/YYYY">
                            {event.start_date}
                        </Moment>
                    </p>

                    <p>Tag: {event.tags}</p>
                </div>
            }
        </>
    )
}