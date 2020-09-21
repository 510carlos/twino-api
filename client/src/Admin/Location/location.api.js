import axios from 'axios';

const LOCATION_API = "/api/location/";

const deleteLocation = async (locationId) => {
  try {
    const response = await axios.delete(`${LOCATION_API}${locationId}`);
    return response;
  } catch (error) {
    console.log(error)
  }
}

const getLocations = async () => {
    try {
        const response = await axios.get(LOCATION_API);
        return response.data;
      } catch (error) {
        console.error(error);
      }
};

const addLocationData = async (data) => {
  try {
    const response = await axios.post(LOCATION_API, data)
    return response
  } catch(error) {
    console.log(error)
  }
};

const updateLocation = async (data) => {
  const { id } = data;
  try {
    const response = await axios.patch(`${LOCATION_API}${id}`, data);
    return response;
  } catch(error) {
    console.log(error)
  }
}

export { getLocations, addLocationData, deleteLocation, updateLocation };