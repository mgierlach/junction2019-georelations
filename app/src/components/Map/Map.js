import React, { useState } from 'react';
import '../../App.css';
import MyMap from './MyMap';
import TimeRadio from './TimeRadio'
import SwitchComp from './SwitchComp'

export default function Home() {
    const [stateSwitch, setStateSwitch] = useState({
        cor: true,
        flow: false,
    });

    const [valueTime, setValueTime] = React.useState('d');


    return (
        <>
            <div className='map-header'>
                <h1 className='title'>GeoRelations</h1>
                <TimeRadio valueTime={valueTime} setValueTime={setValueTime} />
                <SwitchComp stateSwitch={stateSwitch} setStateSwitch={setStateSwitch} />
            </div>

            <MyMap stateSwitch={stateSwitch} valueTime={valueTime} />
        </>
    );
}