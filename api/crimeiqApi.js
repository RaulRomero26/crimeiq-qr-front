import axios from 'axios';


export const crimiq = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/'
});

// Todo: configurar interceptores
/*authApi.interceptors.request.use( config => {

     config.headers = {
         ...config.headers,
         'x-token': localStorage.getItem('token')
     }

    return config;
})*/
