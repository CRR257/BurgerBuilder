import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderapplication.firebaseio.com/'
});

export default instance;