// axios
import axios from 'axios';

const BASE_URL = 'https://java.bocetos.co/';
const RED_URL = {
	user: 'userred-0.0.1-SNAPSHOT',
	game: 'gamered-0.0.1-SNAPSHOT'
}

export const request = async (red, type, url, data) => {
	const config = {
		method: type,
		url: `${BASE_URL}/${RED_URL[red]}/${url}`,
		headers: { 
			"content-type": "application/json",
		},
		data : data
	};

	return axios(config);
}

export const authorizedRequest = async (red, type, url, data) => {
	const config = {
		method: type,
		url: `${BASE_URL}/${RED_URL[red]}/${url}`,
		headers: { 
			"content-type": "application/json",
			'Authorization': localStorage.getItem('token'),
		},
		data : data
	};

	return axios(config);
}