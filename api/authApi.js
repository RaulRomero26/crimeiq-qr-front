import axios from 'axios';


export const authApi = axios.create({
    baseURL: 'https://api.crimeiq.org/'
});

// Todo: configurar interceptores
/*authApi.interceptors.request.use( config => {

     config.headers = {
         ...config.headers,
         'x-token': localStorage.getItem('token')
     }

    return config;
})*/
