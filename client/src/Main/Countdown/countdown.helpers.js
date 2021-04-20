import spacetime from 'spacetime';
import StackdriverErrorReporter from 'stackdriver-errors-js';
import { getLocations } from '../../Admin/Location/location.api';

const errorHandler = new StackdriverErrorReporter();
errorHandler.start({
  key: 'AIzaSyDbLPAiDP0IOtX_7Nykt0X3PQtvEFEf00M',
  projectId: 'twino-282018',
  service: 'twino-countdown-errors',
});

/*
 * There was an issue where where its 5pm would give me zones off by 1 hour.
 * This will take out invalid city from the
 */
function validateZoneNames(names) {
  const validZones = [];

  names.forEach((element) => {
    console.log(element);
    const s = spacetime();
    const zone = s.goto(element);
    let hours = zone.hour();

    const AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    try {
      const options = {
        timeZone: element,
        hour: 'numeric',
      };
      const formatter = new Intl.DateTimeFormat([], options);

      if (formatter.format(new Date()) === `${hours} ${AmOrPm}`)
        validZones.push(element);
    } catch (err) {
      console.log('validateZoneNames', 'warning');
    }
  });

  return validZones;
}

export const getTime = () => {
  const date = new Date();
  let seconds = date.getSeconds();
  seconds = 60 - seconds;
  let minutes = date.getMinutes();
  minutes = 59 - minutes;
  return {
    minutes,
    seconds,
  };
};

export const runCountdown = (currentTime) => {
  let { minutes, seconds } = currentTime;
  if (minutes === 0 && seconds === '01') {
    minutes = 59;
    seconds = 59;
  } else {
    if (parseInt(seconds) === 0) {
      minutes -= 1;
      seconds = 59;
    } else {
      seconds -= 1;
    }
    seconds = seconds.toString();
    if (seconds.length === 1) seconds = seconds.padStart(2, '0');
  }

  return {
    minutes,
    seconds,
  };
};

export const getLocation = async () => {
  const supportedCities = await getLocations();
  const fallbackInfo = {
    city: 'N/A',
    country: 'N/A',
    drink: 'N/A',
    note: 'N/A',
  };
  if (!supportedCities) return fallbackInfo;
  const names = spacetime.whereIts('4:00pm');
  const validNames = validateZoneNames(names);

  const listOfCities = supportedCities.map((place) => place.name);
  const citynames = listOfCities.filter((value) => validNames.includes(value));

  if (citynames.length === 0) {
    // error
    errorHandler.report({
      names,
      validNames,
    });
  }

  const cityname = citynames[Math.floor(Math.random() * citynames.length)];
  const zoneInformation = supportedCities.filter(
    (value) => value.name === cityname
  )[0];

  const { city, country, drink, note } = {
    ...fallbackInfo,
    ...zoneInformation,
  };
  return {
    city,
    country,
    drink,
    note,
  };
};
