// axios
import axios from 'axios';

const BASE_URL = 'https://java.bocetos.co/userred-0.0.1-SNAPSHOT';

export const request = async (type, url, data) => {
	const config = {
		method: type,
		url: `${BASE_URL}/${url}`,
		headers: { 
			"content-type": "application/json",
		},
		data : data
	};

	return axios(config);
}

export const authorizedRequest = async (type, url, data) => {
	const config = {
		method: type,
		url: `${BASE_URL}/${url}`,
		headers: { 
			"content-type": "application/json",
			'Authorization': localStorage.getItem('token'),
		},
		data : data
	};

	return axios(config);
}