import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import GoogleFontLoader from 'react-google-font-loader';
import { runCountdown, getTime, getLocation } from './countdown.helpers'

const Div = styled.div`
  margin: auto;
  text-align: center;
  text-shadow: 0 1px #fff;

  span {
    font-size: 66px;
    font-family: Orbitron;
    color: red;
    font-weight:bold;
    text-shadow: 0 1px #000;
  }

`;

function Countdown() {
    const [time, setTime] = useState(getTime);
    const [location, setLocation] = useState({ 
        city: "n/a", 
        country: "n/a", 
        drink: "n/a", 
        note: "n/a"
    });
    
    useEffect(() => {
        const fetchData = async () => getLocation().then((location) => setLocation(location));
        fetchData();
    }, []);
      
    useEffect(() => {
        const interval = setInterval(() => {
            let currentTime = {...time};
            let displayTime = runCountdown(currentTime);
            if(displayTime.minutes === 59 && displayTime.seconds === 59)
                getLocation().then((location) => setLocation(location))
            setTime(displayTime)
        }, 1000);
        return () => clearInterval(interval);
      }, [time]);

    const {city, country, drink, note} = location;
    const {seconds, minutes} = time;

    return (
        <Div>
            <GoogleFontLoader
                fonts={[
                {
                    font: 'Orbitron',
                    weights: [400, '400i'],
                }
                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
            <h1>It's always happy hour somewhere!</h1>
            <div>Count down until 5 pm</div>
            <span>{minutes} : {seconds}</span>
            <p>{drink} is the drink of choice in <br />{city}, {country}</p>
            <p>{note}</p>
        </Div>
    )
}

export default Countdown;
