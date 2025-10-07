

import { ls, ss } from '../utils/store';

export const OptionsFetch = {

    async POST (formData) {
        try {
            const bearerToken = ls.getFormated('bearerToken');
            const options = {
                method: 'POST',
                headers: {
                    Authorization: bearerToken,
                    Accept: "multipart/form-data",
                    'Access-Control-Allow-Headers': 'origin,X-Requested-With,content-type,accept',
                    'Access-Control-Allow-Credentials': 'true',
                },
                body: formData,
            };
            return options;
        }
        catch(error){
            console.error(error);
        }
    },

    async GET () {
        try {
            const bearerToken = ls.getFormated('bearerToken');
            const options =  {
                method: 'GET',
                headers: {
                    Authorization: bearerToken,
                    'Access-Control-Allow-Credentials': 'true',
                    mode: 'cors',
                    credentials: 'include'
                },
            }
            return options;
        }
        catch(error){
            console.error(error);
        }
    }
};

export default OptionsFetch;