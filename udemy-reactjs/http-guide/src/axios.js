import axios from 'axios';

//axios instance

const instance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN from instance';

export default instance;