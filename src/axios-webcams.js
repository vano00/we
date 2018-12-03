import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

const instance = axios.create({
	baseURL: 'http://localhost:3000/',
	headers: {'X-Mashape-Key': API_KEY}
});

export default instance;
