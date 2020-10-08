import spacetime from 'spacetime';
import {getLocations} from '../../Admin/Location/location.api'

/*
 * There was an issue where where its 5pm would give me zones off by 1 hour.
 * This will take out invalid city from the
 */
function validateZoneNames (names) {
    var validZones = []  
    for (const property in names) {
        const s = spacetime();
        const zone = s.goto(names[property]);
        var hours = zone.hour()

        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12;

        try {
            let options = {
                timeZone: names[property],
                hour: 'numeric',
            },
            formatter = new Intl.DateTimeFormat([], options);    

            if(formatter.format(new Date()) === hours+" "+AmOrPm)
                validZones.push(names[property])

        } catch (err) {
            continue;
        }
    }

    return validZones
}

export const getTime = () => {
    var date = new Date();
    var seconds = date.getSeconds();
    seconds = 60 - seconds;
    var minutes = date.getMinutes();
    minutes = 59 - minutes;
    return {
        minutes,
        seconds
    }
}

export const runCountdown = (currentTime) => {
    let {minutes, seconds} = currentTime;
    if(minutes === 0 & seconds === '01') {
        minutes = 59;
        seconds = 59;
    } else {
        if(parseInt(seconds) === 0) {
            minutes = minutes - 1;
            seconds = 59;
        } else {
            seconds = seconds - 1;
        }
        seconds = seconds.toString();
        if(seconds.length === 1) 
            seconds = seconds.padStart(2,'0');
    }
    
    return {
        "minutes": minutes,
        "seconds": seconds
    };
};

export const getLocation = async () => {
    var supportedCities = await getLocations();
    var fallbackInfo = {
        city : "N/A",
        country: "N/A",
        drink: "N/A",
        note: "N/A",
    }
    if(!supportedCities) return fallbackInfo;
    var names = spacetime.whereIts("4:00pm");
    var validNames = validateZoneNames(names);

    const listOfCities = supportedCities.map(city => city.name);
    const citynames = listOfCities.filter(value => validNames.includes(value));

    if(citynames.length === 0) {
        console.error({
            names,
            validNames
        })
    }

    const cityname = citynames[Math.floor(Math.random() * citynames.length)];
    var zoneInformation = supportedCities.filter(value => value.name === cityname)[0];

    var { city, country, drink, note } = { ...fallbackInfo, ...zoneInformation };
    return { 
        city,
        country,
        drink,
        note,
    }
}