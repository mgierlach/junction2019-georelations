import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import './icon.css'
import station from '../../data/station.json'
import TextPath from 'react-leaflet-textpath';
import Snackbar from './Snackbar'



export default ({ stateSwitch, valueTime }) => {
    const map = {
        lat: 60.165,
        lng: 24.948,
        zoom: 13,
        number: 1
    };

    const position = [map.lat, map.lng];

    const [stationArray, setStationArray] = useState([]);
    const [clickStation, setClickStation] = useState(null);
    const [dataFetch, setDataFetch] = useState(null);
    const [open, setOpen] = useState({ open: false, message: '' });


    useEffect(() => {
        // console.log(station.list);
        setStationArray(station.list)
    }, []);

    useEffect(() => {
        if (clickStation) {
            console.log('fetch station', clickStation);
            console.log('fetch time', valueTime);
            const url = `https://crowd-control-junction.herokuapp.com/correlation_and_routes?serial=${clickStation.serial}&time=${valueTime}`
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    if (json.data.length > 0) {
                        setDataFetch(json)
                    } else {
                        setDataFetch(null)
                        setOpen({ open: true, message: 'No enough information for calculation' })
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    setDataFetch(null)
                    // alert('Server is down')
                    setOpen({ open: true, message: 'Server is down' })
                })
        }
    }, [clickStation, valueTime]);

    const handleClickMarker = (mark) => {
        // console.log('clickMarker');

        const clickStationSerial = (mark.target.options.icon.options.className.split(' ')[0]);
        setClickStation(stationArray.find(station => station.serial === clickStationSerial))
    }
    const handleClickMap = (click) => {
        // console.log('click', click);
        setClickStation(null)
        setDataFetch(null)

    }
    // console.log('clickStation', clickStation);


    return (
        <div className='my-map'>
            <Map
                style={{ height: "80vh" }}
                center={position}
                zoom={map.zoom}
                // zoomControl={false}
                // scrollWheelZoom={false}
                onClick={handleClickMap}

            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://cdn.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"
                />
                {stationArray.map(station => {
                    const stationPosition = [station.latitude, station.longitude];
                    let paddingCor = 7
                    let colorStatus = ''
                    if (stateSwitch.cor && dataFetch) {
                        // paddingCor = 1
                        if (dataFetch.base_station !== station.serial) {
                            const dataStation = dataFetch.data.find(data => data.serial === station.serial)

                            if (dataStation) {
                                const cor = Math.abs(Math.round(dataStation.correlation * 10))
                                paddingCor = 2 + cor

                                if (dataStation.correlation > 0) {
                                    colorStatus = 'blue'
                                } else {
                                    colorStatus = 'red'
                                }
                            } else {
                                colorStatus = 'hide'
                            }

                        }
                    }
                    return (
                        <Marker
                            key={station.serial}
                            position={stationPosition}
                            icon={L.divIcon({
                                className: `${station.serial} my-div-icon 
                                ${clickStation && clickStation.serial === station.serial ? 'selected' : ''}
                                padding-${paddingCor} color-${colorStatus}
                                `
                            })}
                            onClick={handleClickMarker}
                            opacity={0.8}
                        >
                            <Popup>
                                {`Station:${station.description}`}
                            </Popup>
                        </Marker>
                    );
                })}
                {clickStation && stateSwitch.flow && stationArray.map(station => {
                    if (clickStation.serial === station.serial) {
                        return null
                    }
                    let text = ''
                    if (dataFetch) {
                        if (dataFetch.base_station !== station.serial) {
                            const dataStation = dataFetch.data.find(data => data.serial === station.serial)
                            if (dataStation && (dataStation.moveForward || dataStation.moveBackwards)) {
                                text = `▶ ${Math.round(dataStation.moveForward * 10) / 10} | ${Math.round(dataStation.moveBackwards * 10) / 10} ◀`
                            } else {
                                text = null
                            }

                        }
                    }
                    if (!text) {
                        return null
                    }
                    return <TextPath
                        key={station.serial}
                        positions={
                            (clickStation.longitude < station.longitude) ?
                                [[clickStation.latitude, clickStation.longitude], [station.latitude, station.longitude]] :
                                [[station.latitude, station.longitude], [clickStation.latitude, clickStation.longitude]]
                        }
                        text={text}
                        center
                        offset={-5}
                        // orientation={clickStation.latitude < station.latitude ? 180 : 0}
                        // below={clickStation.latitude < station.latitude ? false : true}
                        color={'RoyalBlue'} />
                })}
            </Map>
            <Snackbar open={open} setOpen={setOpen} />
        </div>
    );
};