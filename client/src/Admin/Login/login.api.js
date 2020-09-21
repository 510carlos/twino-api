import axios from 'axios';

const USER_API = "/api/user/";

const getUser = async () => await axios.get(`${USER_API}info`);

const logoutUser = async () => await axios.get(`${USER_API}logout`);

export { getUser, logoutUser };